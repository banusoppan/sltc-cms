const express = require('express');
const router = express.Router();
const extractFile = require('../middleware/file');
const checkAuth = require('../middleware/check-auth');
const organisationController = require('../controllers/organisationController');



router.post('/social-media',checkAuth,organisationController.updateSocialMedia);
router.post('/contact-detail',checkAuth,organisationController.updateContactDetail);
router.post('/change-logo',checkAuth,extractFile,organisationController.changeLogo);
router.post('/add-branch',checkAuth,organisationController.addBranch);
router.get("/",organisationController.getOrganisation );

module.exports = router;
