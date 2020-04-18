const User = require("../models/user");
const lodash = require("lodash");

const postNewUserRootHandler = (req, res) => {
  const parsedPostDataChunks = [];
  req.on("data", chunk => {
    parsedPostDataChunks.push(chunk);
  });

  req.on("end", () => {
    const parsedPostData = JSON.parse(
      Buffer.concat(parsedPostDataChunks).toString()
    );
    const userDoesNotExist = lodash.isEmpty(
      User.getUser(parsedPostData.username)
    );
    if (userDoesNotExist) {
      const newUser = new User(
        parsedPostData.email,
        parsedPostData.username,
        parsedPostData.password
      );
      newUser.saveUser();
      res.writeHead(201, "User creation successful").end();
    } else {
      res.writeHead(409, "Username already taken").end();
    }
  });
};

module.exports = postNewUserRootHandler;
