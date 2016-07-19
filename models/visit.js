var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Visit = new Schema ({
    numVisits: Number
})

module.exports = mongoose.model('Visit', Visit);