const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const user_model = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxlength: 20,
        required: [true, "Please enter a valid username"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        maxlength: 25,
        required: [true, "Please enter a valid email"],
        validate: [validator.isEmail, "Please try again and enter a valid email"]
    },
    password: {
        type: String,
        maxlength: 25,
        required: [true, "Please enter a valid password"]
    },
    password_confirmation: {
        type: String,
        required: [true, "Please re-type your password again"],
        validate: {
            validator: function (password) {
                return this.password === password;
            },
            message: "The password you re-entered was not the same"
        }
    }
});

user_model.methods.isPasswordCorrect = async function (user_password, db_password) {
    return await bcrypt.compare(user_password, db_password);
};

user_model.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 15);
    this.password_confirmation = undefined;

    next();
});

module.exports = mongoose.model("user", user_model);