var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

/* GET posts listing. */
router.get('/', postController.getAllPosts);

/* GET post create form. */
router.get('/create', postController.showCreateForm);

/* POST create new post */
router.post('/create', postController.createPost);

/* GET post details. */
router.get('/:id', postController.getPostById);

/* GET post edit form. */
router.get('/:id/edit', postController.showEditForm);

/* POST update post */
router.post('/:id/edit', postController.updatePost);

/* POST delete post */
router.post('/:id/delete', postController.deletePost);

module.exports = router;