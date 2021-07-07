const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        name: String,
        category: {
            type: String,
            enum: ['books', 'clothes', 'home', 'technology', 'sports', 'other' ]
        },
        color: String,
        status: {
            type: String,
            enum:[ 'like new', 'little used', 'used' ]
        },
        description: String,
        owner: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        imagen: String,
    },
    {
        timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product