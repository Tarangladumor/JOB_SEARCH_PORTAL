const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = () => {
    mongoose.connect(process.env.MONGODBURL, { 
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB connected"))
    .catch((error) => {
        console.log("Error in coonect database");
        console.log(error);
    })
}

module.exports = connectDB;