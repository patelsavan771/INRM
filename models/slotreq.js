const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotreqSchema = new mongoose.Schema({
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
    date: { type: Date, required: true },
    timeslot: { type: String, required: true },
    purpose: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Slotreq = mongoose.model('Slotreq', slotreqSchema);

module.exports = Slotreq;