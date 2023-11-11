const Resource = require('../models/resource');

module.exports.getAll = async (req, res, next) => {
    try {
        const resources = await Resource.find({});
        if (!resources) {
            return res.status(400).json({ message: 'Resources not exists' });
        }
        res.status(201).json(resources);
    } catch (e) {
        res.send('error' + e.message);
    }
}

module.exports.get = async (req, res, next) => {
    try {
        const resourceId = req.params.id;
        const existingResource = await Resource.findById(resourceId);
        if (!existingResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.status(200).json(existingResource);
    } catch (e) {
        res.send('error' + e.message);
    }
}

module.exports.add = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        const resource = await Resource.findOne({ name });
        if (resource) {
            return res.status(400).json({ message: 'Already exist. update existing resource' });
        }

        const newResource = new Resource({ name, quantity });
        await newResource.save();


        res.status(200).json({ message: "Resource added successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const resourceId = req.params.id;
        const { name, quantity } = req.body;

        const existingResource = await Resource.findById(resourceId);
        if (!existingResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        existingResource.name = name || existingResource.name;
        existingResource.quantity = quantity || existingResource.quantity;

        const updatedResource = await existingResource.save();

        res.status(200).json(updatedResource);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        const resourceId = req.params.id;

        const existingResource = await Resource.findByIdAndDelete(resourceId);

        res.status(200).send("resource deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}