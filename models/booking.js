const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
    date: { type: Date, required: true },
    timeslot: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    slotreq: {
        type: Schema.Types.ObjectId,
        ref: 'Slotreq'
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;