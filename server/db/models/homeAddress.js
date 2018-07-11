const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise


var homeAddressSchema = new mongoose.Schema({
    home_title: String,
    home_address: String,
    home_city: String,
    home_state: String,
    home_zipcode: { type: Number, min: 5, max: 5 },
    home_time: { type: Date }
});

const HomeAddress = mongoose.model('HomeAddress', homeAddressSchema)
module.exports = HomeAddress


