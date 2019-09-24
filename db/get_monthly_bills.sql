SELECT *
FROM bills
WHERE extract(month FROM due_date) = $2 AND user_id = $1;
