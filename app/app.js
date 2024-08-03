const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors"); 
const bodyParser = require('body-parser');
const config = require("../config/config");

const authRoutes = require("./routes/authRoutes");
const coinRoutes = require("./routes/coinRoutes");

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

mongoose
    .connect(config.databaseURL, {dbName: 'coins'})
    .then((res) => console.log("MongoDB connected..."))
    .catch((error) => console.log(error));

app.use("/api/auth", authRoutes);
app.use("/api/coin", coinRoutes);

module.exports = app;
