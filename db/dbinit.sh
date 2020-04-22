#!/bin/zsh
# spinup postgresql container (see docker-compose.yml)
docker-compose up -d

# wait for postgres setup to complete
echo "Sleeping for 5 seconds to allow db setup"
sleep 5

# exec into running postgresql container and create Users table
# TODO: Use an ORM to automate db building because this script is a fucking pain
docker-compose exec postgresql bash -c "
  psql -d apidatabase -U apiusername -c '
  CREATE TABLE IF NOT EXISTS Users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
  );'
"
echo "Setup complete, query away!"
