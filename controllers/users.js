const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { email, firstname, lastname, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, firstname, lastname, password: hashedPassword });
        console.log(newUser);
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        res.send('error in registration process' + e.message);
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.user = {
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            admin: user.admin
        };
        const msg = user.admin ? 'Admin login successful' : 'Login successful';

        res.status(200).json({ message: msg });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Logout successful' });
        }
    });
}