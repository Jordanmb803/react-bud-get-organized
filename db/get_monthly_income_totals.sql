SELECT
   SUM (income_amount) AS income_amount_total
FROM
   income
WHERE
   user_id = $1 AND extract(month FROM income_date) = $2;