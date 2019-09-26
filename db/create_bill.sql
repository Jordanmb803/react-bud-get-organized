INSERT INTO bills
 (name, bill_amount, due_date, paid, recurring, paid_amount, paid_date, user_id)
VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING
  *;