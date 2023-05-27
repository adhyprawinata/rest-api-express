const db = require('../config/db');

// Controller untuk GET /users
const getUsers = (req, res) => {
  db.query('SELECT username, password FROM user', (err, results) => {
      if (err) {
        res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
      } else {
        res.status(200).json({ status: 200, message: 'Successfully', data: results });
      }
    });
};

module.exports = {
  getUsers,
};