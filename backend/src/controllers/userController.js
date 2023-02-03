const user = require('../model/user');
const { validationResult } = require('express-validator');
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

// exports.loginUser = async (res,req) =>{
//     try{

//         const dataUser = new user ({
//             name : "Huzaifa",
//             email : "huzaifa@gmail.com",
//             password : "huzaifa123"
//         })
//         dataUser.save((err, result)=>{
//             if(!err){
//                 res.json({
//                     result : result
//                 })
//             }else{
//                 res.json({
//                     err : err
//                 })
//             }
//         })
//     }
//         catch (error) {
//             console.log(error)
//             return error;   
//         }
    
// }
async function getData(data){
    const {name, email, password} = data.body;
    try {
        
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword =  await bcrypt.hash(password, salt);
        const userData =  new user({
            name: name,
            email: email,
            password : password
        });
        if(!password || password.length <6)
        return userData;
    } catch (error) {
        return error;   
    }
}