const { Pool } = require("pg");

const connectionPool = new Pool({
  user: "apiusername",
  // host='localhost' when running tests so they can be ran locally without exec'ing into the server container
  // host='postgres' when running in container to be able to access the postgres service on the same docker network
  host: process.env.DB_HOST,
  database: "apidatabase",
  password: "apipassword",
  port: 5432
});

module.exports = connectionPool;
