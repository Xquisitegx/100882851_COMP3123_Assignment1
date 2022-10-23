const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user_controller");
const employee_controller = require("../controllers/emp_controller");

router.use(user_controller.protect);

router.route("/employees")
    .get(employee_controller.getAll_emp)
    .post(employee_controller.create_emp)
    .delete(employee_controller.delete_emp);

router.route("/employees/:eid")
    .get(employee_controller.get_emp)
    .put(employee_controller.update_emp);

module.exports = router;