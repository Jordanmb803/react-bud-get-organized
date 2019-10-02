CREATE TABLE bills(
bill_amount INTEGER, 
due_date DATE,
paid BOOLEAN,
recurring BOOLEAN,
paid_amount INTEGER,
paid_date DATE,
user_id INTEGER
);

CREATE TABLE users(
id serial PRIMARY KEY
, name VARCHAR (250)
, email VARCHAR (500)
, picture VARCHAR (500)
)

CREATE TABLE income(
  id serial PRIMARY KEY
, name VARCHAR (250)
, income_amount INTEGER
, income_date DATE NOT NULL
, user_id INTEGER NOT NULL
)

CREATE TABLE budgets(
id serial PRIMARY KEY
, user_id INTEGER
, category VARCHAR (400)
, category_amount INTEGER
, current_category_balance INTEGER)

CREATE TABLE transactions(
id serial PRIMARY KEY
, description VARCHAR (500)
, transaction_amount INTEGER
, budget_id INTEGER
)