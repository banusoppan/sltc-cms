const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup',checkAuth,userController.createUser);
router.post("/login",userController.userLogin);
router.get("/list", userController.listUser);

module.exports = router;
