const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan')
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

mongoose
    .connect(process.env.databaseURL)
    .then((res) => console.log("MongoDB connected..."))
    .catch((error) => console.log(error));

app.use("/api/auth", authRoutes);

module.exports = app;
