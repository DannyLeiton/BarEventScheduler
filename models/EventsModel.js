var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EventsSchema = new Schema({
	"id" : String,
	"title" : String,
	"start" : Date
});

module.exports = mongoose.model('Events', EventsSchema);