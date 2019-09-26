SELECT
   SUM (bill_amount) AS bill_amount_total,
   SUM (paid_amount) AS paid_amount_total,
   SUM (bill_amount - paid_amount) AS bills_remaining_total
FROM
   bills
WHERE
   user_id = $1 AND extract(month FROM due_date) = $2;