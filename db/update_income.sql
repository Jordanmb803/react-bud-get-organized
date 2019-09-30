UPDATE income
SET name = $2
  , income_amount = $3
  , income_date = $4
WHERE id = $1
RETURNING *;