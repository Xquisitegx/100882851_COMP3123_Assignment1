const dotenv = require("dotenv");

const mongoose = require("mongoose");

const app = require(`${__dirname}/app`)

dotenv.config({path: `${__dirname}/config.env`});

// Database connection
const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => console.log("DB connection has been established.."));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT, "..");
});

