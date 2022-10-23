const { promisify } = require("util");
const JWT = require("jsonwebtoken");

const UserError = require("../utility/UserError");
const catchAsync = require("../utility/catchAsync");
const User = require("../models/user_model");


const sign_token = id => {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const create_and_send_token = (user, status_code, res) => {
    const token = sign_token(user._id);
    const cookie_options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.cookie("jwt", token, cookie_options);

    res.status(status_code).json({
        status: true,
        token,
        user
    });
}

const get_token = (jwt, error_message, next) => {
    const token = (jwt) ? jwt : undefined;

    if (!token) { return next(new UserError(error_message, 401)); }

    return promisify(JWT.verify)(token, process.env.JWT_SECRET);
}

exports.protect = catchAsync(async (req, res, next) => {
    const decoded = await get_token(req.cookies.jwt, "Login to gain access", next);
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new UserError("The Token does not exists anymore", 401));
    }

    next();
});

exports.signup = catchAsync(async (req, res) => {
    const new_user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    });

    create_and_send_token(new_user, 201, res)
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new UserError("Please provide correct email and password"), 400);
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
        return next(new UserError("Incorrect credentials, please try again"), 401);
    }

    create_and_send_token(user, 200, res);
})