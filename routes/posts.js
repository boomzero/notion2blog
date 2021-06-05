const express = require('express');
const router = express.Router();

const authService = require('../services/AuthService');
const PostController = require('../controllers/post.controller');

/* GET users listing. */
router.get('/', PostController.apiGetAllPosts);
router.get('/new', authService.ensureAuthenticated(), PostController.fetchNewPostForm);
router.post('/', authService.ensureAuthenticated(), PostController.apiCreatePosts);

module.exports = router;
