const Validator = require('validator');
const isEmpty = require("./is-empty");

const validateProfile = (data) => {

    let errors = {};
    let boundaries = {
        min: 2,
        max: 30
    };
    const {handle, status, skills} = data;

    //? Make sure data is a string to be tested
    data.handle = !isEmpty(data.handle)
        ? data.handle
        : "";

    data.status = !isEmpty(data.status)
        ? data.status
        : "";

    data.skills = !isEmpty(data.skills)
        ? data.skills
        : "";

    //TODO: Check boundaries, return error

    if (!Validator.isLength(data.handle, {
        min: 2,
        max: 40
    })) {
        errors.handle = "Handle has to be between 2 and 4 characters";
    }

    //! Empty Validators
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle is required";
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Status Field  is required";
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Skills Field  is required";
    }

    //@desc If website exists, validate the URL
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "Not a valid URL";
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = "Not a valid URL";
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = "Not a valid URL";
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = "Not a valid URL";
        }

    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = "Not a valid URL";
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = "Not a valid URL";
        }
    }

    return {errors, isValid: isEmpty(errors)}

}

module.exports = validateProfile;