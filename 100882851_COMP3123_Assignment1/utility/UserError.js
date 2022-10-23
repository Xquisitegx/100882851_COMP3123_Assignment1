class UserError extends Error {
    constructor(message, user_status) {
        super(message);

        this.user_status = user_status;
        this.status = `${user_status}`.startsWith('4') ? false : true;
        
        Error.captureStackTrace(this. this.constructor)
    }
}

module.exports = UserError;