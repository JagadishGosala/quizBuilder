const jwt = require('jsonwebtoken');

const customError = require('../errors/custom-error');

const isAuth = (req, res, next) =>{
    try{
        const authHeader = req.headers.authorization;
        console.log(req.body);
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            throw new customError(401, "Unauthenticated error", 500);
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {userName: payload.name, user_id: payload.user_id};
        console.log("user = " + req.user);
        next();
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            internalCode: error.errorCode,
            message: error.message,
        });
    }

}

module.exports = isAuth;