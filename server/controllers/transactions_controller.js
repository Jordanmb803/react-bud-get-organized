module.exports = {
  getAllTransactions: (req, res) => {
    req.app.get('db').get_all_transactions([req.params.budget_id])
      .then(transactions => {
        res.status(200).send(transactions)
      })
  },
  createTransaction:(req, res) => {
    const { description, transaction_amount, budget_id } = req.body
    req.app.get('db').create_transaction([description, transaction_amount, budget_id])
      .then(transaction => {
        res.status(200).send(transaction)
      })
  },
  updateTransaction: (req, res) => {
    const { description, transaction_amount, budget_id, id } = req.body
    req.app.get('db').update_transaction([description, transaction_amount, budget_id, id])
      .then(transaction => {
        res.status(200).send(transaction)
      })
  },
  deleteTransaction: (req, res) => {
    req.app.get('db').delete_transaction([req.params.id]).then(ok => {
      res.sendStatus(200)
    })
  }
}