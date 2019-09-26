module.exports = {
  getAllBills: (req, res) => {
    req.app.get('db').get_all_bills()
      .then(bills => {
        res.status(200).send(bills)
      }).catch(err => {
        res.send(err)
      })
  },
  getMonthlyBills: (req, res) => {
    req.app.get('db').get_monthly_bills([req.user.id, req.params.month])
      .then(bills => {
        console.log(`request for bills for user: ${req.user.id} for month: ${req.params.month} recieved`)
        res.status(200).send(bills)
      }).catch( err => {
        console.log(`error trying to get monthly bills`)
        res.status(500).send(err)
      })
  },
  updateBill: (req, res) => {
    const { id, name, bill_amount, due_date, paid_amount, paid} = req.body
    req.app.get('db').update_bill([id, name, bill_amount, due_date, paid_amount, paid])
      .then(bill => {
        res.status(200).send(bill)
      }).catch(err => {
        res.status(500).send(err)
      })
  },
  createBill: (req, res) => {
    const { name, bill_amount, due_date, paid_amount, paid } = req.body
    req.app.get('db').create_bill([name, bill_amount, due_date, paid_amount, paid, req.user.id])
      .then(bill => {
        res.status(200).send(bill)
      }).catch(err => {
        res.status(500).send(err)
      })
  }
} 