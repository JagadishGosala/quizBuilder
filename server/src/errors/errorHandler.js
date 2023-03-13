const CustomAPIError = require('./custom-error');

const errorHandler = (error, req, res, next) => {
    console.log(error);
    if(error.name = "Validation Error"){
        return res.status(400).json({
            type: "VAlidation Error type",
            details: error.details,
        });
    }
    if(error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({
            errorCode: error.errorCode,
            message: "Custom Error",
        })
    }
    return res.status(500).send("Something went wrong Internally");
}

module.exports = errorHandler;