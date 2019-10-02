UPDATE transactions
SET description = $1
  , transaction_amount = $2
  , budget_id = $3
WHERE id = $4
RETURNING *;