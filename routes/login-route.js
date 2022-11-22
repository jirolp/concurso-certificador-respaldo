const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/registro', LoginController.register);
router.post('/registro', LoginController.storeUser);
router.get('/logout', LoginController.logout);

module.exports = router;