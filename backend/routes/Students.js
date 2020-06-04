const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/register',checkAuth,studentController.registerStudent);
router.get("/list", studentController.getAllStudents);
router.get("/:id", studentController.getStudent);

module.exports = router;



