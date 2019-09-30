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
        res.status(200).send(bills)
      }).catch( err => {
        res.status(500).send(err)
      })
  },
  updateBill: (req, res) => {
    const { id, name, bill_amount, due_date, paid_amount, paid} = req.body
    req.app.get('db').update_bill([id, name, bill_amount, due_date, paid_amount, paid])
      .then(bill => {
        res.status(200).send(bill)
      })
  },
  createBill: (req, res) => {
    const { name, bill_amount, due_date, paid, recurring, paid_amount } = req.body
    req.app.get('db').create_bill([name, bill_amount, due_date, paid, recurring, paid_amount, req.user.id])
      .then(bill => {
        res.status(200).send(bill)
      })
  },
  deleteBill: (req, res) => {
    req.app.get('db').delete_bill([req.params.id]).then(ok => {
      res.sendStatus(200)
    })
  },
  getMonthlyBillsTotal: (req, res) => {
    req.app.get('db').get_monthly_bills_totals([req.user.id, req.params.month])
      .then(totals => {
        res.status(200).send(totals)
      })
  }
} 