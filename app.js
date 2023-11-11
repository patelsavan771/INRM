// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
// console.log(process.env.CLOUDINARY_KEY);
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
// const reviewsRoute = require('./routes/reviews');
const usersRoute = require('./routes/users');
const resourcesRoutes = require('./routes/resources');
const slotreqRoutes = require('./routes/slotreqs');
const complaintsRoutes = require('./routes/complaints');
const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const LocalStratagy = require('passport-local');
// const User = require('./models/user');
// const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
// const MongoStore = require('connect-mongo');
//const Joi = require('joi');
//const morgan = require('morgan'); //used for logs

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
// app.engine('ejs', ejsMate);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views'));

// morgan is middleware to log info of incomming requests:
// app.use(morgan('tiny'));
// const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret
//     }
// });

// store.on("error", function (e) {
//     console.log("SESSION STORE ERROR", e)
// })

// const sessionConfig = {
//     store,
//     name: 'session',
//     secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         // secure: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// app.use(session(sessionConfig));
// Express session middleware
app.use(session({
    secret: 'session-secret-key', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
// app.use(flash());

// mongoSanitize : to prevent from mongo injection attack
// app.use(mongoSanitize({ replaceWith: '_' }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStratagy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     // console.log(req.query);
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });


app.use('/', usersRoute);
app.use('/resources', resourcesRoutes);
app.use('/slot-req', slotreqRoutes);
app.use('/complaints', complaintsRoutes);
// app.use('/campgrounds/:id/reviews', reviewsRoute);


app.get('/profile', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.all('*', (req, res, next) => {
    res.status(404).send('not found');
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) message = 'Oh No, Something Went Wrong!!!';
    res.status(statusCode).send();
});

app.listen(3000, () => {
    console.log("Serving on port 3000...");
});