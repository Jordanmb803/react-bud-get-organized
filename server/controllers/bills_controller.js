module.exports = {
  getAllBills: (req, res) => {
    console.log(`enpoint hit`)
    req.app.get('db').get_all_bills()
      .then(bills => {
        console.log(`promise hit`)
        res.status(200).send(bills)
      }).catch(err => {
        res.send(err)
      })
  }
}