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
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy)

passport.serializeUser(function(user, done) {
  app.get('db').create_user_if_nil([user.emails[0].value]).then(userCreated => {
    app.get('db').find_user_by_email([user.emails[0].value]).then(currentUser => {
        console.log(`Current user ${currentUser[0].email}`)
        done(null, { id: currentUser[0].id, name: currentUser[0].name, email: currentUser[0].email });
      })
  })
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
    res.redirect('http://localhost:3000')
  }
})

app.get('/user/data', (req, res, next) => {
  if(!req.user) {
    res.redirect('/login')
  } else {
    console.log(req.user)
    res.status(200).send(req.user)
  }
})

app.get('/bills/month/:month', bills_controller.getMonthlyBills)
app.put('/bill/update', bills_controller.updateBill)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
})