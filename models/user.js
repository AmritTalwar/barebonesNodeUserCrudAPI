const fs = require("fs");
const hash = require("../utils/hash");

class User {
  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = hash(password);
    Object.seal(this); // <--- TODO Use typescript...
  }

  saveUser() {
    const users = User._getAllUsers();
    users[this.username] = {
      email: this.email,
      password: this.password
    };
    fs.writeFileSync(process.env.DB, JSON.stringify(users));
  }

  static getUser(username) {
    const users = this._getAllUsers();
    if (users[username]) {
      return users[username];
    }
    return {};
  }

  static _getAllUsers() {
    return JSON.parse(fs.readFileSync(__dirname + `/../${process.env.DB}`));
  }
}

module.exports = User;
