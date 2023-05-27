const express = require('express');
const router = express.Router();
const { checkAPIKey } = require('../utils/api_key');
const { getUsers } = require('../controllers/users_controller');

// GET /users
router.get('/users', checkAPIKey, getUsers);

module.exports = router;