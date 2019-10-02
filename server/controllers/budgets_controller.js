module.exports = {
  getAllUserBudgets: (req, res) => {
    req.app.get('db').get_all_user_budgets([req.user.id]).then(budget => {
      res.status(200).send(budget)
    })
  },
  createBudget: (req, res) => {
    const { category, category_amount, current_category_amount } = req.body
    req.app.get('db').create_budget([req.user.id, category, category_amount, current_category_amount])
      .then(budget => {
        res.status(200).send(budget)
      })
  },
  updateBudget: (req, res) => {
    const { category, category_amount, current_category_amount, id} = req.body
    req.app.get('db').update_budget([id, category, category_amount, current_category_amount])
      .then(budget => {
        res.status(200).send(budget)
      })
  },
  deleteBudget: (req, res) => {
    req.app.get('db').delete_budget([req.body.id]).then(budget => {
      res.status(200).send(budget)
    })
  }
}