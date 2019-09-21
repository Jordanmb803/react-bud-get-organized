CREATE TABLE bills(
bill_amount INTEGER, 
due_date DATE,
paid BOOLEAN,
recurring BOOLEAN,
paid_amount INTEGER,
paid_date DATE,
user_id INTEGER
);

create table users(
id serial PRIMARY KEY
, name VARCHAR (250)
, email VARCHAR (500)
, picture VARCHAR (500)
)