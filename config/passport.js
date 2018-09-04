const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("Users");

const KEYS = require("./keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = KEYS.SECRET;

/*
TODO: Middleware passport-jwt Strategy,
@params take in JWT payload
@desc 
@access Private
*/

module.exports = passport => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        //*DEBUG
        console.log('jwt_payload', jwt_payload);

        User
            .findById(jwt_payload.id)
            .then(user => {

                return user
                    ? done(null, user)
                    : done(null, false)

            })
            .catch(err => console.log(err))

    }));

}