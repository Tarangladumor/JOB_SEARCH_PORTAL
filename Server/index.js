const express = require("express");
const connectDB = require("./databaseConnection");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

const companyRoutes = require("./routes/company");
app.use("/api", companyRoutes);

app.listen(PORT , () => console.log("Server started"));

connectDB();