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
        res.status(500).send(bills)
      })
  }
}