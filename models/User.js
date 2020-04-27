const hash = require("../utils/hash");
const { Pool } = require("pg");

const pgPool = new Pool({
  user: "apiusername",
  // host='localhost' when running tests so they can be ran locally without exec'ing into the server container
  // host='postgres' when running in container to be able to access the postgres service on the same docker network
  host: process.env.DB_HOST,
  database: "apidatabase",
  password: "apipassword",
  port: 5432
});

class User {
  constructor(email, username, password) {
    this.username = username;
    this.email = email;
    this.password = hash(password);
    Object.seal(this); // <--- TODO Use typescript...
  }

  async saveUser() {
    const client = await pgPool.connect().catch(err => {
      throw Error(`Could not connect to db: ${err}`);
    });

    const saveUserQuery = {
      text: "INSERT INTO Users(username, email, password) VALUES($1, $2, $3)",
      values: [this.username, this.email, this.password]
    };

    await client.query(saveUserQuery);
    await client.release();
  }

  static async getUser(username) {
    const client = await pgPool.connect().catch(err => {
      throw Error(`Could not connect to db: ${err}`);
    });

    const getUserQuery = {
      text: "SELECT * FROM Users WHERE username = $1",
      values: [username]
    };

    const queryResponse = await pgPool.query(getUserQuery);
    await client.release();

    const userNotInDB = !queryResponse.rows[0];
    if (userNotInDB) return {};

    return queryResponse.rows[0];
  }

  static async flushAllUsers() {
    if (process.env.NODE_ENV !== "DEV") {
      throw Error("DO NOT USE THIS METHOD IN PROD, THIS IS ONLY FOR DEV ENV");
    }

    const client = await pgPool.connect().catch(err => {
      throw Error(`Could not connect to db: ${err}`);
    });

    await pgPool.query("TRUNCATE USERS");
    await pgPool.query("DELETE FROM USERS");
    await client.release();
  }
}

module.exports = User;
