const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');
// const express = require('express');

// const errorHandler = require('../errors/errorHandler');
const customError = require('../errors/custom-error');
// const {tryCatch} = require('../utils/tryCatch');
const User = require('../models/user');
// const {Request, Response} = require('express');
// const app = express();
// app.use(errorHandler);
const loginUser = async (req, res, next) => {
    try{
        if(!await isExists(req.body.email)){
            throw new customError(300, "Validation Error custom", 400);
        }
        const user = await User.findOne({email: req.body.email});
        const status = bcrypt.compare(req.body.password, user.password, function(err,data){
            if(err){
                throw new CustomAPIError(500, "Something went wrong internally", 500);
            }
            if(data){
                const token = jwt.sign({
                                            name: user.name,
                                        user_id: user.user_id,
                                        },
                                            process.env.SECRET_KEY, {expiresIn: '1hr'});
                return res.status(200).send(token);
            }
            else{
                return res.status(401).json({
                    message: "Passwords do not match"
                });
            }
        });
    }
    catch(error){
        // next(error);
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}
const registerUser = async (req, res) => {
    try {
        const email = req.body.email;
        if (await isExists(email)) {
            console.log("USer Already exists");
            throw new customError(401, "User email already exists", 401);
        }
        let hashPass = await bcrypt.hash(req.body.password, 12);
        let user_id = await createNewUserId();
        const user = new User({ name: req.body.name, user_id: user_id, email: req.body.email, password: hashPass });
        // console.log(user);
        const result = await user.save();
        console.log(result);
        if (!result) {
            console.log("Registration Unsuccesful");
            throw new customError(500, "Registration Uncuccessful", 500);
        }
        else {
            console.log("Registration successful");
        }
        return res.status(200).json({
            "message": "REgistration successful"
        });
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }   
}

const isExists = async (email) => {
    const user = await User.findOne({ email });
    console.log(user);
    if (!!user) {
        return true;
    }
    return false;
}
const createNewUserId = async() => {
    completeStr = '1234567890abcdefghijklmnopqrstuvwxyz';
    ans = '';
    for(let i = 8; i > 0; i--){
        ans += completeStr[Math.floor(Math.random() * completeStr.length)];
    }
    if(! await userContainsId(ans)){
        // console.log("random true");
        return ans;
    }
    else{
        // console.log("random true");
        return await randomString();
    }
}

const userContainsId = async(user_id) => {
    const user = await User.findOne({user_id});
    // console.log("user = " + user);
    if(!!user){
        // console.log("true");
        return true;
    }
    // console.log("false");
    return false;
}
module.exports = { loginUser, registerUser, isExists };