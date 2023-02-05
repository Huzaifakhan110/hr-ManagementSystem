const user = require('../model/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
exports.login = async (req, res) => {
    const {email, password} = req.body;
    //
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const findUser = await user.findOne({email : email});
            if(findUser){
                bcrypt.compare(password, findUser.password, (err, matched) => {
                    if(matched){
                        const token = jwt.sign(
                            {   
                                email: email,
                                userId : findUser._id
                            
                            },  'process.env.JWT_SECRET_KEY', {expiresIn : '2h'});
                            res.status(200).json({
                                token : token,
                                userData : findUser
                        })
                    }else{
                        res.status(401).json({
                            error : 'Incorrect password or email.'
                        })
                    }
                })
            }else{
                res.status(404).json({
                    error : 'User not found.'
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }else{
        res.status(400).json({
            validationError : errors.array()
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const userData = await getData(req)

        userData.save((err, result) => {
            if(result){
                res.json({
                    result : result
                })
            }else{
                res.json({
                    err : err
                })
            }
        })

    } catch (error) {
        console.log(error)
        return error;   
    }
}
exports.addUser = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const insertData = await getData(req);
        console.log(insertData);
        insertData.save((err, result) => {
            if(result){
                res.status(200).json({
                    message: 'User Added.'
                })
            }else{
                err.keyPattern.email >= 1 ? res.status(409).json({
                    error: `Email already existing ${insertData.email}.`
                }) : res.json({
                    error: err
                })
            }

        })
    }else{
        // return res.status(400).json({ errors: errors.msg });
        return res.status(400).json({ validationError: errors.array() });
    }
}


async function getData(data){
    const {name, email, password} = data.body;
    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password, salt);
        const userData =  new user({
            name: name,
            email: email,
            password : hashedPassword
        });
        // if(!password || password.length <6)
        return userData;
    } catch (error) {
        return error;   
    }
}