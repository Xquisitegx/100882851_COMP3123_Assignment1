const UserError = require("../utility/UserError");

const SentError = (err, req, res, next) => {
    return res.status(err.status_code).json({
        status: err.status,
        message: err.message,
        error: err,
        error_stack: err.stack
    });
}

module.exports = (err, req, res, next) => {
    err.status_code = err.status_code || 500;
    err.status = err.status || "error";

    let error = { ...err };
    error.message = err.message;

    SentError(error, req, res, next);
}