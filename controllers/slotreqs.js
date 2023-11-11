const Slotreq = require('../models/slotreq');

module.exports.getAll = async (req, res, next) => {
    try {
        const slotreq = await Slotreq.find({}).populate('resource').populate('user');
        if (!slotreq) {
            return res.status(400).json({ message: 'slotreqs not exists' });
        }
        res.status(201).json(slotreq);
    } catch (e) {
        res.send('error' + e.message);
    }
}

module.exports.get = async (req, res, next) => {
    try {
        const slotreqId = req.params.id;
        const slotreq = await Slotreq.findById(slotreqId);
        if (!slotreq) {
            return res.status(404).json({ message: 'Slotreq not found' });
        }

        res.status(200).json(slotreq);
    } catch (e) {
        res.send('error' + e.message);
    }
}

module.exports.add = async (req, res) => {
    try {
        const { resource, date, timeslot, purpose } = req.body;

        const newSlotreq = new Slotreq({ resource, date, timeslot, purpose });
        newSlotreq.user = req.session.user._id;
        await newSlotreq.save();

        res.status(200).json({ message: "Slot req added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error to save slot req.' });
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        const slotreqId = req.params.id;

        await Slotreq.findByIdAndDelete(slotreqId);

        res.status(200).json("Slotreq deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}