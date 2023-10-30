const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    categories:{
        type: String
    }
});

module.exports = mongoose.model('Product',productSchema);