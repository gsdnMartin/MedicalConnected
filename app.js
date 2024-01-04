const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const cors = require('cors') 
const bodyParser = require('body-parser') 
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize')
const temperaturaRoutes = require('./routes/temperatura');
const spo2Routes = require('./routes/spo2');
const cardiacoRoutes = require('./routes/cardiaco');
const airRoutes = require('./routes/air');
const ambienteRoutes = require('./routes/ambiente');
const humedadRoutes = require('./routes/humedad');
const touchRoutes = require('./routes/touch');
require('./utils/broker')
require('./utils/mqttHandler')

//const MongoDBStore = require('connect-mongo')(session)

//mongoose.connect('mongodb://localhost:27017/medicalconnected');
mongoose.connect('mongodb+srv://gusdanmx:S100RinLBurpPyX9@cluster0.6fzwzeu.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error1:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(cors()); 

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())

const secret = 'thisshouldbeabettersecret!';

/*const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on("error", function(e){
    console.log("SESSION STORE ERROR", express)
})
*/
const sessionConfig = {
    //store: store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/temperatura', temperaturaRoutes)
app.use('/spo2', spo2Routes)
app.use('/cardiaco', cardiacoRoutes)
app.use('/air', airRoutes)
app.use('/ambiente', ambienteRoutes)
app.use('/humedad', humedadRoutes)
app.use('/touch', touchRoutes)

app.get('/', (req, res) => {res.render('home')});

app.get('/dashboard', (req, res) => {res.render('dashboard')});

app.get('/logout', (req, res) => {res.redirect('/')});

app.all('*', (req, res, next) => {next(new ExpressError('Page Not Found', 404))})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {console.log('Serving on port 3000')})


