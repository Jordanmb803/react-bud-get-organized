require('dotenv').config()

const express            = require('express')
    , session            = require('express-session')
    , bodyParser         = require('body-parser')
    , massive            = require('massive')
    , passport           = require('passport')
    , strategy           = require(`${__dirname}/strategy.js`)
    , bills_controller   = require('./controllers/bills_controller')
    , income_controller  = require('./controllers/income_controller')
    , budgets_controller = require('./controllers/budgets_controller')

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
} = process.env

const app = express()
app.use(bodyParser.json())

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

app.get('/budget/index', budgets_controller.getAllUserBudgets)
app.post('/budget/create', budgets_controller.createBudget)
app.put('/budget/update', budgets_controller.updateBudget)
app.delete('/budget/:id/delete', budgets_controller.deleteBudget)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
})