const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
  //passport was passed in the require statement, in server.js
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      //includes what's in the payload from trying to login
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); //null for error and user
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
