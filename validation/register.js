const Validator = require('validator');
const isEmpty = require("./is-empty");

const validateRegisterInput = (data) => {

    let errors = {};
    let boundaries = {
        min: 2,
        max: 30
    };
    const {name, email, password, password2} = data;

    //? Make sure data is a string to be tested
    data.name = !isEmpty(name)
        ? name
        : " ";

    data.email = !isEmpty(email)
        ? email
            .toString()
            .trim()
        : " ";

    data.password = !isEmpty(password)
        ? password
        : " ";

    data.password2 = !isEmpty(password2)
        ? password2
        : " ";

    //TODO: Check boundaries, return error
    if (!Validator.isLength(data.name, boundaries)) {
        errors.name = "Name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.email) || !Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is invalid";
    }

    if (!Validator.isLength(data.password, {
        min: 6,
        max: 30
    })) {
        errors.password = "Pasword must be at least 6 characters";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {errors, isValid: isEmpty(errors)}
}

module.exports = validateRegisterInput;