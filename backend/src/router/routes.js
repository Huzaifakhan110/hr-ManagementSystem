const routes = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth = require('../authentication/userAuth');
//
const passport = require("passport")
const userController = require('../controllers/userController');
// const weatherController = require('../controllers/weatherController');
//

let userAray = [
    body('name','name should have char length >=5').isLength({ min: 5 }), 
    body('email',"please type correct email").isEmail(),
    body('password','password length should be >=5 char').isLength({ min: 5 })
]

let loginArray = [
    body('email',"Email not provided.").notEmpty(),
    body('email',"please type correct email").isEmail(),
    body('password',"Password not provided.").notEmpty(),
    body('password','password length should be >=5 char').isLength({ min: 5 })
]

routes.get('/', auth ,userController.getUsers);
routes.post('/add', userAray, userController.addUser);
routes.post('/login', loginArray, userController.login);

routes.get('/auth/google/callback',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] ,
    
      successRedirect: process.env.CLIENT_URL,}
));
// routes.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));
routes.get("/login/success",(req,res)=>{
    if(req.user){
    res.status(200).json({
        error:false,
        message:"Successfully Loged In",
        user:req.user
    })
    }else{
        res.status(403).json({error:true,message:"Not Authorized"});
    }
})
routes.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message: "Log in failed"
    })
})


routes.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failure'
}));


routes.get("/google",passport.authenticate("google",["profile","email"]));
routes.get("/logout",(req,res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

module.exports = routes;



