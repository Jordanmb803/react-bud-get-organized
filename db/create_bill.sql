INSERT INTO bills
 (name, bill_amount, due_date, paid, recurring, paid_amount, user_id)
VALUES
  ($1, $2, $3, $4, $5, $6, $7)
RETURNING
  *;