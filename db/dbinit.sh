#!/bin/zsh
# spinup postgresql container (see docker-compose.yml)
docker-compose up -d

# wait for postgres setup to complete
sleep 5

# exec into running postgresql container and create Users table
# TODO: Use an ORM to automate db building because this script is a fucking pain
docker-compose exec postgresql bash -c "
  psql -d apidatabase -U apiusername -c '
  CREATE TABLE Users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
  );'
"
