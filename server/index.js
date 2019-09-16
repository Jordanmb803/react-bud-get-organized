require('dotenv').config()

const express    = require('express')
    , bodyParser = require('body-parser')
    , massive    = require('massive')
    , bills_controller = require('./controllers/bills_controller')

const {
  SERVER_PORT,
  CONNECTION_STRING
} = process.env

const app = express()
app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
  console.log('db connected')
  app.set('db', db)
})

app.get("/bills", bills_controller.getAllBills)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
})