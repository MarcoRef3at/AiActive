const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth');

// router.route('/auth').post(register);
router.post('/register', register);
module.exports = router;
