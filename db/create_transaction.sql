INSERT INTO transactions
(description, transaction_amount, budget_id)
VALUES
($1, $2, $3)
RETURNING *;
