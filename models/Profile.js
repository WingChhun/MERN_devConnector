const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: Create Schema for Profile

// Note: user: Schema.Types.objectId will reference users collection in our
// database

const ProfileSchema = new Schema({

    user: {

        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    handle: {
        type: String,
        required: true,
        max: 40

    },

    company: {
        type: String
    },

    website: {
        type: String
    },

    location: {
        type: String
    },

    status: {
        type: String,
        required: true
    },

    //NOTE: Array of strings in mongoose
    skills: {
        type: [String],
        required: true
    },

    githubUsername: {
        type: String
    },

    social: {
        youtube: {
            type: String
        },

        twitter: {
            type: String
        },

        facebook: {
            type: String
        },

        linkedin: {
            type: String
        },

        instagram: {
            type: String
        }
    },

    experience: [
        {
            title: {
                type: String,
                required: true
            },

            company: {
                type: String,
                required: true
            },

            location: {
                type: String
            },

            from: {
                type: Date,
                required: true
            },

            to: {
                type: Date
            },

            current: {
                type: Boolean,
                default: false
            },

            description: {
                type: String

            }
        }

    ],

    education: [
        {
            school: {
                type: String,
                required: true
            },

            degree: {
                type: String,
                required: true
            },

            fieldOfStudy: {
                type: String,
                required: true
            },

            from: {
                type: Date,
                required: true
            },

            to: {
                type: Date
            },

            current: {
                type: Boolean,
                default: false
            },

            description: {
                type: String

            }
        }

    ],

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Profile = mongoose.model("Profiles", ProfileSchema);