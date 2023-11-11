const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new mongoose.Schema({
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
    description: { type: String, required: true },
    date: { type: Date, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;