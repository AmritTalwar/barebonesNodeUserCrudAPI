const User = require("./models/User");

const user = User.createUser("email", "username", "password");
User.saveUser(user);
