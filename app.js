const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const resourcesRoutes = require('./routes/resources');
const slotreqRoutes = require('./routes/slotreqs');
const complaintsRoutes = require('./routes/complaints');
const session = require('express-session');

//connect to mongoose:
const dbUrl = "mongodb://localhost:27017/INRM";
mongoose.connect(dbUrl)
    .then(() => {
        console.log("connected to mongoDB.");
    })
    .catch(err => {
        console.log('Error in mongoDB connection');
        console.log(err);
    })

const app = express();

// Express session middleware
app.use(session({
    secret: 'session-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));

app.use(express.urlencoded({ extended: true }));

app.use('/', usersRoute);
app.use('/resources', resourcesRoutes);
app.use('/slot-req', slotreqRoutes);
app.use('/complaints', complaintsRoutes);

app.get('/profile', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.all('*', (req, res) => {
    res.status(404).send('not found');
});

app.listen(3000, () => {
    console.log("Serving on port 3000...");
});