const Booking = require('../models/booking');
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

        const existingBooking = await Booking.findOne({
            resource,
            date
        });
        if (existingBooking) {
            return res.status(400).send('resource is aleady booked for given time.')
        }

        const newSlotreq = new Slotreq({ resource, date, timeslot, purpose });
        newSlotreq.user = req.session.user._id;
        await newSlotreq.save();

        res.status(200).json({ message: "Slot req added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error to save slot req.' });
    }
}

module.exports.update = async (req, res) => {
    try {
        const slotreqId = req.params.id;
        const { status } = req.body; // accepted, rejected

        const slotreq = await Slotreq.findById(slotreqId);
        if (!slotreq) {
            return res.status(404).json({ message: 'Slotreq not found' });
        }

        console.log(req.session.user)
        if (req.session.user.admin) {
            if (status === "accepted") {
                // save in booking
                const booking = new Booking({ resource: slotreq.resource, date: slotreq.date, timeslot: slotreq.timeslot, user: slotreq.user, slotreq: slotreqId });
                const existingBooking = await Booking.findOne({
                    resource: slotreq.resource,
                    date: slotreq.date,
                });
                if (existingBooking) {
                    return res.status(400).send('resource is aleady booked for given time.')
                }
                booking.save();
            }
            slotreq.status = status || slotreq.status;
            const updatedSlotreq = await slotreq.save();
            return res.status(200).json(updatedSlotreq);
        }
        return res.status(401).send("unauthorized");
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