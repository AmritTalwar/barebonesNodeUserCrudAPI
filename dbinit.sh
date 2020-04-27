 docker-compose exec postgres bash -c "
  echo '***BUILDING DATABASE TABLES***'

  until pg_isready
  do
    echo 'Waiting for postgres db to be ready to accept connections'
    sleep 2;
  done

  psql -d apidatabase -U apiusername -c '
  CREATE TABLE IF NOT EXISTS Users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
  );'
"