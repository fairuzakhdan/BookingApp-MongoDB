const mongoose = require('mongoose');
const { Schema } = mongoose

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }],
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    }
})

const Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = Hotel