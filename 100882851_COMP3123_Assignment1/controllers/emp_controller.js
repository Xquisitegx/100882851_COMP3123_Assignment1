const UserError = require("../utility/UserError");
const catchAsync = require("../utility/catchAsync");
const Employee = require("../models/employee_model");

// Grabs information of all employees in the database
exports.getAll_emp = catchAsync(async (req, res, next) => {
    const employees = await Employee.find();
    
    res.status(200).json({
        status: true,
        results: employees.length,
        employees
    });
});

// Creates a new employee in the database
exports.create_emp = catchAsync(async (req, res, next) => {
    // Grabs the information and stores it in DB
    const new_emp = await Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary,
    });

    res.status(201).json({
        status: true,
        employee: new_emp
    });
});

// Grabs the employee by their ID and update 
exports.update_emp = catchAsync(async (req, res, next) => {
    const updated_emp = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true, runValidators: true});

    res.status(200).json({
        status: true,
        // Message for when the employee has been updated successfully
        message: `The employee ${req.params.eid} has been updated`,
        employee: updated_emp
    });
});

// Deletes employee by grabbing employee by their ID
exports.delete_emp = catchAsync(async (req, res, next) => {
    const employee = await Employee.findByIdAndDelete(req.query.eid);

    if (!employee) {
        // Returns an error stating that theere is no employee with user inputted ID
        return next(new UserError(`There is no employee with id ${req.query.eid}`, 404));
    }

    res.status(204).json({
        status: true,
    });
});

// Grabs the employee information by their ID
exports.get_emp = catchAsync(async (req, res, next) => {
    const employee = await Employee.findById(req.params.eid);

    res.status(200).json({
        status: true,
        employee
    });
});
