require('dotenv').config()

const express    = require('express')
    , session    = require('express-session')
    , bodyParser = require('body-parser')
    , massive    = require('massive')
    , passport   = require('passport')
    , strategy   = require(`${__dirname}/strategy.js`)
    , bills_controller = require('./controllers/bills_controller')

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
} = process.env

const app = express()
app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
  console.log('db connected')
  app.set('db', db)
})

app.use(express.static(`${__dirname}/../build`));

app.use(session({
  secret: 'sup dude',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy)

passport.serializeUser(function(user, done) {
  console.log(user.id)
  done(null, { id: user.id, display: user.displayName, nickname: user.nickname, email: user.emails[0].value });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get( '/login',
  passport.authenticate('auth0',
    { successRedirect: '/me', failureRedirect: '/login', failureFlash: true }
  )
);

app.get('/me', ( req, res, next) => {
  if ( !req.user ) {
    res.redirect('/login');
  } else {
    // req.user === req.session.passport.user
    // console.log( req.user )
    // console.log( req.session.passport.user );
    // res.status(200).send( JSON.stringify( req.user, null, 10 ) );
    res.redirect('http://localhost:3000')
  }
});

app.get("/bills", bills_controller.getAllBills)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
})