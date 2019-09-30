module.exports = {
  getMonthlyIncome: (req, res) => {
    req.app.get('db').get_monthly_income([req.user.id, req.params.month])
      .then(income => {
        res.status(200).send(income)
      })
  },
  updateIncome: (req, res) => {
    const { id, name, income_amount, income_date } = req.body
    req.app.get('db').update_income([id, name, income_amount, income_date])
      .then(income => {
        res.status(200).send(income)
      })
  },
  createIncome: (req, res) => {
    const { name, income_amount, income_date } = req.body
    req.app.get('db').create_income([name, income_amount, income_date, req.user.id])
      .then(income => {
        res.status(200).send(income)
      })
  },
  deleteIncome: (req, res) => {
    console.log(req.params.id)
    req.app.get('db').delete_income([req.params.id])
      .then(ok => {
        res.sendStatus(200)
      })
  },
  getMonthlyIncomeTotal: (req, res) => {
    req.app.get('db').get_monthly_income_totals([req.user.id, req.params.month])
      .then(totals => {
        res.status(200).send(totals)
      })
  }
}