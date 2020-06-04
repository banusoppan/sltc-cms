const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const postController = require('../controllers/postController');
const extractFile = require('../middleware/file')



router.post('',checkAuth,extractFile,postController.createPost);
router.get("", postController.getAllPosts);
router.put("/:id",checkAuth,extractFile,postController.updatePost);
router.delete('/:id',checkAuth,postController.deletePost);
router.get("/:id", postController.getPost);


module.exports = router;
