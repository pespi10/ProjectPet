var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.getAllUsers);

/* GET user create form. */
router.get('/create', userController.showCreateForm);

/* POST create new user */
router.post('/create', userController.createUser);

/* GET user details. */
router.get('/:id', userController.getUserById);

/* GET user edit form. */
router.get('/:id/edit', userController.showEditForm);

/* POST update user */
router.post('/:id/edit', userController.updateUser);

/* POST delete user */
router.post('/:id/delete', userController.deleteUser);

module.exports = router;
