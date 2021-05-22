const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller')

/* GET users listing. */
router.get('/all', PostController.apiGetAllPosts);
router.get('/new', PostController.fetchNewPostForm);
router.post('/new', PostController.apiCreatePosts);

module.exports = router;
