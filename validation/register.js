const Validator = require('validator');
const isEmpty = require("./is-empty");

const validateRegisterInput = (data) => {

    let errors = {};
    const {name} = data;
    let boundaries = {
        min: 2,
        max: 30
    };

    //TODO: Check boundaries, return error
    if (!Validator.isLength(name, boundaries)) {

        errors.name = "Name must be between 2 and 30 characters";

    }

    return {errors, isValid: isEmpty(errors)}
}

module.exports = validateRegisterInput;