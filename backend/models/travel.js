const mongoose = require('mongoose');

const Travel = mongoose.Schema({
    name: {type:String},
    address:{type: String},
    destination:{type: String},
    numberOfTraveler:{type:Number}
})

module.exports = mongoose.model("travel", Travel)