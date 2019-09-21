module.exports = {
  getAllBills: (req, res) => {
    req.app.get('db').get_all_bills()
      .then(bills => {
        res.status(200).send(bills)
      }).catch(err => {
        res.send(err)
      })
  }
}