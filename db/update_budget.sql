UPDATE budgets
SET user_id = $1
, category = $2
, category_amount = $3
, current_category_balance = $4
WHERE id = $5
RETURNING *;