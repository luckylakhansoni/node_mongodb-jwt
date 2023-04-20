const userModel = require('../models/users');
const userLeave = require('../models/user_leaves.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { to, ReE, ReS } = require('../services/util.service');


const register = async function (req, res) {
    try {
        const body = req.body
        let userData = await userModel.create(body);
        let user = JSON.parse(JSON.stringify(userData))
        delete user.password
        res.send(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports.register = register

const signIn = async function (req, res) {  // auth
    const body = req.body
    let [err, auth] = await to(userModel.findOne({ email: body.email }))
    if (err) return ReE(res, 'user not found')
    if (auth != null && bcrypt.compareSync(body.password, auth.password)) {
        const token = jwt.sign({ id: auth._id }, req.app.get('secretKey'), { expiresIn: '1h' });
        auth = JSON.parse(JSON.stringify(auth))
        delete auth.password
        return ReS(res, { message: 'user details', user: auth, token: token })
    } else {
        return ReE(res, 'invalid emailId/Password')
    }
}
module.exports.signIn = signIn

const updateUser = async function (req, res) {
    const body0 = req.body
    let [err, update] = await to(userModel.findByIdAndUpdate(body0.userId, { name: body0.name }
    ))
    if (err == false) {
        return ReE(res, 'not update')
    } else {
        return ReS(res, 'update success')
    }
}
module.exports.updateUser = updateUser

const deleteUser = async function (req, res) {
    const body = req.params
    let [err, data] = await to(userModel.findByIdAndRemove(body.userId))
    if (err) return ReE(res, 'user is not deleted')
    return ReS(res, 'user is deleted')
}
module.exports.deleteUser = deleteUser

const userDetail = async function (req, res) {
    const body = req.params
    let [err, data] = await to(userModel.findById(body.userId))
    if (err) return ReE(res, 'user is not found')
    return ReS(res, data)
}
module.exports.userDetail = userDetail

const all = async function (req, res) {
    const body = req.params
    let [err, data] = await to(userModel.find().select('-password'))

    if (err) return ReE(res, 'user list is not found')
    return ReS(res, data)
}
module.exports.all = all


const applyForLeave = async function (req, res) {
    const body = req.body
    let [err, create] = await to(userLeave.create(body))
    if (err) return ReE(res, 'some thing went wrongs')
    return ReS(res, 'leave send successfully')

}
module.exports.applyForLeave = applyForLeave

const getAllLeave = async function (req, res) {
    const body = req.body
    if (body.isManager == 1) {
        let [err, emp] = await to(userLeave.find({ user_type: 1 }))
        if (err) return ReE(res, 'leaves not found')
        return ReS(res, emp)
    } else {
        let [err0, emp2] = await to(userLeave.find())
        if (err0) return ReE(res, 'leaves not found')
        return ReS(res, emp2)
    }
}
module.exports.getAllLeave = getAllLeave

const leaveApprove = async function (req, res) {
    const body = req.body
    let [err, appro] = await to(userLeave.findByIdAndUpdate(body.userLeaveId, { isApproved: body.isApproved }))
    if (err == false) return ReE(res, 'some thing is wrong')
    return ReS(res, 'leave Approved')
}
module.exports.leaveApprove = leaveApprove





