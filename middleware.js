module.exports.isLoggedIn = (req, res, next) => {
    if (req.session.passport === undefined) {
        req.flash('error', 'Expiro la sesion!');
        return res.redirect('/login');
    }
    next();
}