require('dotenv').config()

const express           = require('express')
    , session           = require('express-session')
    , bodyParser        = require('body-parser')
    , massive           = require('massive')
    , passport          = require('passport')
    , strategy          = require(`${__dirname}/strategy.js`)
    , bills_controller  = require('./controllers/bills_controller')
    , income_controller = require('./controllers/income_controller')
    , plaid             = require('plaid')

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  PLAID_CLIENT_ID,
  PLAID_PUBLIC_KEY,
  PLAID_SECRET
} = process.env
const plaidClient = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, plaid.environments.development);

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.post('/plaid_exchange', (req, res) => {
  var public_token = req.body.public_token;
 
  plaidClient.exchangePublicToken(public_token).then(res => {
    const access_token = res.access_token;
 
    plaidClient.getAccounts(access_token).then(res => {
      console.log(res.accounts);
    });
  }).catch(err => {
    // Indicates a network or runtime error.
    if (!(err instanceof plaid.PlaidError)) {
      res.sendStatus(500);
      return;
    }
 
    // Indicates plaid API error
    console.log('/exchange token returned an error', {
      error_type: err.error_type,
      error_code: res.statusCode,
      error_message: err.error_message,
      display_message: err.display_message,
      request_id: err.request_id,
      status_code: err.status_code,
    });
 
    // Inspect error_type to handle the error in your application
    switch(err.error_type) {
        case 'INVALID_REQUEST':
          // ...
          break;
        case 'INVALID_INPUT':
          // ...
          break;
        case 'RATE_LIMIT_EXCEEDED':
          // ...
          break;
        case 'API_ERROR':
          // ...
          break;
        case 'ITEM_ERROR':
          // ...
          break;
        default:
          // fallthrough
    }
 
    res.sendStatus(500);
  });
});

massive(CONNECTION_STRING).then(db => {
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
    res.redirect('http://localhost:3000/#/budget')
  }
})

app.get('/user/data', (req, res, next) => {
  if(!req.user) {
    res.redirect('/login')
  } else {
    res.status(200).send(req.user)
  }
})

app.get('/bills/month/:month', bills_controller.getMonthlyBills)
app.get('/bills/totals/month/:month', bills_controller.getMonthlyBillsTotal)
app.put('/bill/update', bills_controller.updateBill)
app.post('/bill/create', bills_controller.createBill)
app.delete('/bill/:id/delete', bills_controller.deleteBill)

app.get('/income/month/:month', income_controller.getMonthlyIncome)
app.get('/income/totals/month/:month', income_controller.getMonthlyIncomeTotal)
app.put('/income/update', income_controller.updateIncome)
app.post('/income/create', income_controller.createIncome)
app.delete('/income/:id/delete', income_controller.deleteIncome)

app.listen(8000, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
})