const hash = require("../utils/hash");
const connectionPool = require("../db/connectionPool");

const createUser = (email, username, password) => ({
  email: email,
  username: username,
  password: hash(password)
});

const saveUser = async user => {
  const client = await connectionPool.connect().catch(err => {
    throw Error(`Could not connect to db: ${err}`);
  });

  const saveUserQuery = {
    text: "INSERT INTO Users(username, email, password) VALUES($1, $2, $3)",
    values: [user.username, user.email, user.password]
  };

  await client.query(saveUserQuery);

  client.release();
};

const getUser = async username => {
  const client = await connectionPool.connect().catch(err => {
    throw Error(`Could not connect to db: ${err}`);
  });

  const getUserQuery = {
    text: "SELECT * FROM Users WHERE username = $1",
    values: [username]
  };

  const queryResponse = await connectionPool.query(getUserQuery);
  client.release();

  const userNotInDB = !queryResponse.rows[0];
  if (userNotInDB) return {};

  return queryResponse.rows[0];
};

module.exports = {
  createUser,
  saveUser,
  getUser
};
