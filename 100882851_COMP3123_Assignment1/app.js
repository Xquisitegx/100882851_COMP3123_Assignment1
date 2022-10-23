const express = require("express");
const cookies = require("cookie-parser");
const app = express();

app.use(cookies());
app.use(express.json());

const errorController = require("./controllers/errorController");
app.use(errorController);

const employee_router = require("./routers/employee_router");
const user_router = require("./routers/user_router");
app.use("/api/emp", employee_router);
app.use("/api/user", user_router);

module.exports = app;
