INSERT INTO users
(name, email, picture)
VALUES
($1, $2, $3)
RETURNING
*;