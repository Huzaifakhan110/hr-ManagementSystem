var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport")
// const mongoose = require("mongoose");
// const User = require('../model/user');
passport.use(new GoogleStrategy({
    clientID:"434596975532-25a9ht8bdphvqmetqvl10kk4q28huelu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    scope:["profile","email"],
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, callback) {
    
    callback(null , profile);
  
  }
));
passport.serializeUser((user,done)=>{
    done(null,user)
});
passport.deserializeUser((user,done)=>{
    done(null,user)
});