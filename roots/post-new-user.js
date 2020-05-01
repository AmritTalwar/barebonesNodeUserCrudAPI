const User = require("../models/User");
const lodash = require("lodash");

const postNewUserRootHandler = (req, res) => {
  const parsedPostDataChunks = [];
  req.on("data", chunk => {
    parsedPostDataChunks.push(chunk);
  });

  req.on("end", async () => {
    try {
      const parsedPostData = JSON.parse(
        Buffer.concat(parsedPostDataChunks).toString()
      );

      const userDoesNotExist = lodash.isEmpty(
        await User.getUser(parsedPostData.username)
      );

      if (userDoesNotExist) {
        const newUser = User.createUser(
          parsedPostData.email,
          parsedPostData.username,
          parsedPostData.password
        );

        await User.saveUser(newUser);
        res.writeHead(201, "User creation successful").end();
      } else {
        res.writeHead(409, "Username already taken").end();
      }
    } catch (err) {
      console.log(`Error in post new user handler: ${err}`);
      res.writeHead(500, "Internal server error :(").end();
    }
  });
};

module.exports = postNewUserRootHandler;
