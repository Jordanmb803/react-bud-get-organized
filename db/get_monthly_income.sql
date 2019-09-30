SELECT *
FROM income
WHERE extract(month FROM income_date) = $2 AND user_id = $1
ORDER BY income_date;
