const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');

// lib
const sendMail = require('../lib/emailGateway');

// config
const config = require('../config');

const jwtSecretKey = config.SECRET_KEY;


const createUser = async (req, res) => {
    let checkEmail = await User.findOne({ 'email': req.body.email }).lean();
    if (!isEmpty(checkEmail)) {
        return res.status(400).json({ 'status': false, 'errors': { 'email': 'Email already exist' } })
    }

    let checkPhone = await User.findOne({ 'phoneNo': req.body.phoneNo }, { 'phoneNo': 1 }).lean();
    if (!isEmpty(checkPhone)) {
        return res.status(400).json({ 'status': false, 'errors': { 'phoneNo': 'Phone No already exist' } })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let newDoc = new User({
        'name': req.body.name,
        'age': req.body.age,
        'email': req.body.email,
        'phoneNo': req.body.phoneNo,
        'password': hash,
    })

    await newDoc.save();
    sendMail({
        to: req.body.email,
        content: '<h1>Register Successfully!.</h1>'
    })
    // console.log(newDoc);
    return res.status(200).json({ 'status': true, 'message': "Register successfully" })
}

const userLogin = async (req, res) => {
    let login = await User.findOne({ 'email': req.body.email }).lean();
    if (isEmpty(login)) {
        return res.status(400).json({ 'status': false, 'errors': { 'email': 'email not found' } })
    }
    const comparePassword = await bcrypt.compare(req.body.password, login.password);
    if (!comparePassword) {
        return res.status(400).json({ 'status': false, 'errors': { 'password': 'Wrong password' } });
    }

    let payload = { name: login.name, _id: login._id }
    let token = jwtSign(payload)
    console.log(token, '----token')
    return res.status(200).json({ 'status': true, 'message': "Login successfully", token })
}

const jwtSign = (payload) => {
    let token = jwt.sign(payload, jwtSecretKey);
    return token;
}

const jwtVerify = (token) => {
    try {
        token = token.replace('Bearer ', '');
        let decoded = jwt.verify(token, jwtSecretKey);
        if (decoded) {
            return {
                'status': true,
                decoded
            }
        }

    } catch (err) {
        return {
            'status': false
        }
    }
}

const exportFunc = {
    createUser,
    userLogin,
    jwtVerify,
    jwtSign
}
module.exports = exportFunc;