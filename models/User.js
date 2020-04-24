const hash = require("../utils/hash");
const { Pool } = require("pg");

const pgPool = new Pool({
  user: "apiusername",
  host: "localhost",
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
    await pgPool.connect().catch(err => {
      throw Error(`Could not connect to db: ${err}`);
    });

    const saveUserQuery = {
      text: "INSERT INTO Users(username, email, password) VALUES($1, $2, $3)",
      values: [this.username, this.email, this.password]
    };

    await pgPool.query(saveUserQuery);
  }

  static async getUser(username) {
    await pgPool.connect().catch(err => {
      throw Error(`Could not connect to db: ${err}`);
    });

    const getUserQuery = {
      text: "SELECT * FROM Users WHERE username = $1",
      values: [username]
    };

    const queryResponse = await pgPool.query(getUserQuery);

    const userNotInDB = !queryResponse.rows[0];
    if (userNotInDB) return {};

    return queryResponse.rows[0];
  }

  static async flushAllUsers() {
    if (process.env.NODE_ENV === "PROD") {
      throw Error("DO NOT USE THIS METHOD IN PROD, THIS IS ONLY FOR DEV ENV");
    }

    await pgPool.connect().catch(err => {
      throw Error(`Could not connect to db: ${err}`);
    });

    await pgPool.query("TRUNCATE USERS");
    await pgPool.query("DELETE FROM USERS");
  }
}

module.exports = User;
