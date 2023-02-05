const express = require('express');
const app = express();
// const passport = require('passport-microsoft');
 //
require('dotenv').config();
auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    else{
        return res.status(404).json({
            err: `You are unauthorized ${err}.`
        })
    }


}
module.exports = auth
//     app.get('/auth/microsoft',
// passport.authenticate('microsoft', {
//   // Optionally define any authentication parameters here
//   // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 
//   prompt: 'select_account',
  
// }));
// app.get('/auth/microsoft', passport.authenticate('microsoft', {
//     successRedirect: '/Welcome',
//     failureRedirect: '/SignUp', // see text
//     failureFlash: true // optional, see text as well
//   }));

// app.get('/auth/microsoft/callback', 
// passport.authenticate('microsoft', { failureRedirect: '/SignUp' }),
// function(req, res) {
//   // Successful authentication, redirect home.
//   res.redirect('/');
// });


// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// auth = async (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(403).send("A token is required for authentication");
//     }
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
//         if(result){
//             req.userInfo = result
//             return next();
//         }else{
//             return res.status(404).json({
//                 err: `You are unauthorized ${err}.`
//             })
//         }
//     });
// }
// module.exports = auth