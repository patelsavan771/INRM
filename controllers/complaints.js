const Complaint = require('../models/complaint');

module.exports.getAll = async (req, res, next) => {
    try {
        const complaints = await Complaint.find({}).populate('resource').populate('user');
        res.status(201).json(complaints);
    } catch (e) {
        res.send('error' + e.message);
    }
}

module.exports.get = async (req, res, next) => {
    try {
        const complaintId = req.params.id;
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(complaint);
    } catch (e) {
        res.send('error' + e.message);
    }
}

module.exports.add = async (req, res) => {
    try {
        const { resource, description } = req.body;

        const newComplaint = new Complaint({ resource, description });
        newComplaint.user = req.session.user._id;
        newComplaint.date = Date.now();

        await newComplaint.save();

        res.status(200).json({ message: "Complaint added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error to save slot req.' });
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const complaintId = req.params.id;
        const { resource, description, isResolved } = req.body;

        const oldComplaint = await Complaint.findById(complaintId);
        if (!oldComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        oldComplaint.resource = resource || oldComplaint.resource;
        oldComplaint.description = description || oldComplaint.description;
        if (req.session.user.admin) {
            oldComplaint.isResolved = isResolved || oldComplaint.isResolved;
        }

        const newComplaint = await oldComplaint.save();

        res.status(200).json(newComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        const slotreqId = req.params.id;

        await Complaint.findByIdAndDelete(slotreqId);

        res.status(200).json("Complaint deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}