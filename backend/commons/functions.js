const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

function makeHashedPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

module.exports = { makeHashedPassword };
