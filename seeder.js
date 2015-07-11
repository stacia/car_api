var seeder = require('mongoose-seed');
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/car-api', function() {
    // Load Mongoose models 

    seeder.loadModels([
        'app/location.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Location'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data);
 
    });
});

// Data array containing seed data
 
var seed_data = require('./data.json');

var data = [
    { 
        'model': 'Location',
        'documents': seed_data.locations 
    }
];  