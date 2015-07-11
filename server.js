// server.js
// Setup
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var geolib     = require('geolib');

var port = process.env.PORT || 8080;      
// Start Server
// =============================================================================
app.listen(port);
console.log('Server booted on ' + port);

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/car-api'); 

var Location   = require('./app/location.js');
  
// API Routing
// =============================================================================
var router = express.Router();              

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Server queried');
    next(); // Don't hold up traffic
});

//CAR get route
router.get('/cars', function(req, res) {

    var loc = require('url').parse(req.url,true).query.location;  // Parse out location in form location=51.521707,-0.166881 
    var lat_and_long = loc ? require('latlng')(loc) : "none"; //Convert to lat/long obj

    if (loc && lat_and_long) { 
      
      //Find all cars and remap them into JSON that the Geolib wants
      Location.find({}, "description latitude longitude -_id", function(err, locations) {
        if (err)
          res.send(err);

        var mixedCoords = {};
        locations.forEach(function(coord) {
          mixedCoords[coord.description] = { "latitude" : coord.latitude, "longitude" : coord.longitude };
        });

        var distances = geolib.orderByDistance(lat_and_long, mixedCoords);

        //Shorten and reformat
        var shortened_distances = []
        for (i = 0; i < 10; i++) { 
          shortened_distances.push({ "description" : distances[i].key, 
                                     "latitude" : distances[i].latitude,
                                     "longitude" : distances[i].longitude} );
        };

        //Output cars!!
        res.json({ "cars" : shortened_distances });   
        });
        
     }

     else {
        res.json({ error: "No location or bad input" });   
     };
});

app.use('/', router)