var mongoose = require('mongoose');
 
var adSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: Array,
        required: true
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Ad', adSchema);