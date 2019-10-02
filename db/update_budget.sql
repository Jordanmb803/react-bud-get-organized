UPDATE budgets
SET category = $2
, category_amount = $3
, current_category_balance = $4
WHERE id = $1
RETURNING *;