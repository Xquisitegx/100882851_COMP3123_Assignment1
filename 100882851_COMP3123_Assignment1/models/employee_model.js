const validator = require("validator");
const mongoose = require("mongoose");

const employee_model = new mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 25,
        required: [true, "Please enter a valid first name"]
    },
    last_name: {
        type: String,
        maxlength: 25,
        required: [true, "Please enter a valid last name"]
    },
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        maxlength: 30,
        validate: [validator.isEmail, "Email is not in correct format, try again"]
    },
    gender: {
        type: String,
        maxlength: 15,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },
    salary: {
        type: Number,
        required: [true, "Please enter a valid salary"]
    }
});


module.exports = mongoose.model("employee", employee_model);


