UPDATE bills
SET name = $2,
    bill_amount = $3,
    due_date = $4,
    paid_amount = $5,
    paid = $6
WHERE id = $1
RETURNING *;