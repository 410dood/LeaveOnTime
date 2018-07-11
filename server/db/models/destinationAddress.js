const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

var destinationAddressSchema = new mongoose.Schema({
    dest_title: String,
    dest_address: String,
    dest_city: String,
    dest_state: String,
    dest_zipcode: { type: Number, min: 5, max: 5 },
    dest_time: { type: Date }
});

const DestinationAddress = mongoose.model('DestinationAddress', destinationAddressSchema)
module.exports = DestinationAddress


