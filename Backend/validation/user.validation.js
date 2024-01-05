const isEmpty = require('is-empty');

const registerValid = (req, res, next) => {
    let errors = {};
    let passwordRegax = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    let emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (isEmpty(req.body.name)) {
        errors.name = 'Please enter name';
    }

    if (isEmpty(req.body.age)) {
        errors.age = 'Please enter age';
    } else if (isNaN(req.body.age)) {
        errors.age = 'age only allowed numeric';
    } else if (req.body.age > 100 || req.body.age <= 0) {
        errors.age = 'Please enter a valid age';
    }

    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter email';
    } else if (!(emailRegax).test(req.body.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (isEmpty(req.body.phoneNo)) {
        errors.phoneNo = 'Please enter Phone Number';
    } else if (isNaN(req.body.phoneNo)) {
        errors.phoneNo = 'phone No only allowed numeric';
    } else if (req.body.phoneNo.toString().length != 10) {
        errors.age = 'Please enter a valid phone number';
    }

    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter password';
    } else if (!passwordRegax.test(req.body.password)) {
        errors.password = 'Password should be atleast One Uppercase, Lowercase, numbers and special characters, Minimum 8 to Maxximum 16 letters alloewd only';
    }

    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next()
};

const loginValid = (req, res, next) => {
    let errors = {};
    if (isEmpty(req.body.email)) {
        errors.email = 'Please enter your email'
    }
    if (isEmpty(req.body.password)) {
        errors.password = 'Please enter your password'
    }
    if (isEmpty(errors) == false) {
        return res.status(400).json({ 'status': false, 'errors': errors })
    }

    return next();
}


module.exports = { registerValid, loginValid }