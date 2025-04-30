const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    row:{
        type: Number,
        required: true
    },
    seatNumber:{
        type: Number,
        required: true
    },
    isBooked:{
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Seat", seatSchema)