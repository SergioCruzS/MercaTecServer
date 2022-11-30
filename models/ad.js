const { Schema, model } = require('mongoose');
 
var adSchema = Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
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

adSchema.method('toJSON', function(){
    const { __v, _id, ...register} = this.toObject();
    return register;
});
 
//Image is a model which has a schema imageSchema
 
module.exports = model('Ad', adSchema);