const Validator = require('validator');
const isEmpty = require("./is-empty");

const validateRegisterInput = (data) => {

    let errors = {};
    let boundaries = {
        min: 2,
        max: 30
    };
    const {email, password} = data;

    //? Make sure data is a string to be tested
    data.email = !isEmpty(data.email)
        ? data.email
        : "";

    data.password = !isEmpty(data.password)
        ? data.password
        : "";

    //TODO: Check boundaries, return error

    if (Validator.isEmpty(email) || !Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(password)) {
        errors.password = "Password is invalid";
    }

    if (!Validator.isLength(data.password, {
        min: 6,
        max: 30
    })) {
        errors.password = "Pasword must be at least 6 characters";
    }

    return {errors, isValid: isEmpty(errors)}
}

module.exports = validateLoginInput;