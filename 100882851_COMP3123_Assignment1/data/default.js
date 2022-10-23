const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const User = require("../models/user_model");
const Employee = require("../models/employee_model");

const employees = JSON.parse(fs.readFileSync(`${__dirname}/employees.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, {
    userNewUrlParser: true
}).then(() => console.log("Database has successfully connected"));

const delete_info = async () => {
    try {
        await Employee.deleteMany();
        await User.deleteMany();

        console.log("Data deleted");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const import_info = async () => {
    try {
        await User.create(users);
        await Employee.create(employees);

        console.log("Data imported");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === "--import") {
    import_info();
}else if (process.argv[2] === "--delete") {
    delete_info();
}
