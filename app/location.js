var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LocationSchema = new Schema({
  vehicleCount : Number,
  latitude : Number, 
  restrictedP : String,
  description : String,
  marketId : Number,
  locationId : Number,
  hasVans : Number,
  longitude : Number, 
  zipfleetId : Number
});

module.exports = mongoose.model('Location', LocationSchema);