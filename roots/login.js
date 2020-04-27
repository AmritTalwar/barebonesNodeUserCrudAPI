const LoginSessionHandler = require("../utils/loginSessionHandler");
const fetch = require("node-fetch");

const loginRootHandler = (req, res) => {
  try {
    const loginSessionHandler = new LoginSessionHandler(req, res);

    switch (req.method) {
      case "GET":
        loginSessionHandler.isLoginSessionValid()
          ? res.writeHead(200, "Already logged in").end()
          : res.writeHead(401, "Please post your username and password").end();
        break;
      case "POST":
        const postDataChunks = [];
        req.on("data", chunk => {
          postDataChunks.push(chunk);
        });

        req.on("end", async () => {
          const parsedPostData = JSON.parse(
            Buffer.concat(postDataChunks).toString()
          );
          // Attempt user authentication via /authenticate-user endpoint
          await fetch(`${process.env.BASE_SERVER_URL}/authenticate-user`, {
            method: "POST",
            body: JSON.stringify(parsedPostData)
          }).then(response => {
            switch (response.status) {
              case 200:
                loginSessionHandler.setLoginSessionCookie();
                res.writeHead(200, "Login successful").end();
                break;
              case 401:
                res.writeHead(401, "Invalid credentials").end();
            }
          });
        });
        break;
    }
  } catch (err) {
    console.log(`Error in login handler: ${err}`);
    res.writeHead(500, "Internal server error").end();
  }
};

module.exports = loginRootHandler;
