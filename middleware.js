module.exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.session.user.admin) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
