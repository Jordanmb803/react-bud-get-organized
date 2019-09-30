INSERT INTO income
 (name, income_amount, income_date, user_id)
VALUES
  ($1, $2, $3, $4)
RETURNING
  *;