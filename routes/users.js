const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const userController0 = require('../app/api/controllers/User.controller');



router.post('/register', userController.create);
router.post('/register0', userController0.register);
router.post('/authenticate', userController0.authenticateUser);
router.post('/update', userController0.updateUser);
router.post('/delete/:userId', userController0.deleteUser)
router.get('/get/:userId', userController0.userDetail)
router.get('/get-all/', userController0.all)
router.post('/send-leave',userController0.applyForLeave)
router.get('/get-leave',userController0.getAllLeave)
router.post('/leave-approve',userController0.leaveApprove)












// router.post('/authenticate', userController.authenticate);

module.exports = router;