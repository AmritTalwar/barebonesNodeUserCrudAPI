const flushDB = async dbConnection => {
  const client = await dbConnection.connect();
  await client.query("TRUNCATE USERS");
  await client
    .query("DELETE FROM USERS")
    .then(() => console.log("Flushing Users table"));
  await client.release();
};

module.exports = flushDB;
