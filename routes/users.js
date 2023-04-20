const express = require('express');
const router = express.Router();
// const userController = require('../app/api/controllers/users');
const userController = require('../app/api/controllers/User.controller');

router.post('/', userController.register);
router.post('/login', userController.signIn);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser)
router.get('/:id',userController.applyForLeave)












// router.post('/authenticate', userController.authenticate);

module.exports = router;