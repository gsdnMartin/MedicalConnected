const User = require('../models/user');
const Paciente = require('../models/paciente');


module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/pacientes');
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('home');
}

module.exports.login = (req, res) => {
    res.redirect('/pacientes');
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/home');
}

module.exports.renderDashboard = async (req, res) => {
    const user = await Paciente.findById(req.params.id);
    req.session.paciente=req.params.id
    res.render('users/dashboard', {user});
}
