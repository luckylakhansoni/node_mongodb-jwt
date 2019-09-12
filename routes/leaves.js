const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/User.controller');
router.post('/send-leave',userController.applyForLeave)
router.get('/get-leave',userController.getAllLeave)
router.post('/leave-approve',userController.leaveApprove)












// router.post('/authenticate', userController.authenticate);

module.exports = router;