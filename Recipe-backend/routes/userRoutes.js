const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authenticateToken');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/alluser',userController.getAllUsers);
router.delete('/:id',userController.deleteUser);
router.put('/:id',userController.updateUser);
router.get('/:id',userController.getUserById);
module.exports = router;
