 docker-compose exec postgres bash -c "
  psql -d apidatabase -U apiusername -c '
  CREATE TABLE IF NOT EXISTS Users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
  );'
"
echo "Setup complete, query away!"