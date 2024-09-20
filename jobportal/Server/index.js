const express = require('express');

const app = express();

const userRoutes = require("./routers/User");
const jobSeekerRoutes = require("./routers/JobSeeker");
const jobRoutes = require("./routers/Job");
const applyRoutes = require("./routers/Apply");
const employerRoutes = require("./routers/Employer");

const database = require("./config/databaseConnection");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8001
;

database.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true,
//     })
// )

// List of allowed origins for CORS
const allowedOrigins = [
    "https://job-search-portal-tarangladumors-projects.vercel.app",
    "https://job-search-portal-git-main-tarangladumors-projects.vercel.app",
    "https://job-search-portal-rho.vercel.app",
    "http://localhost:3000"
  ];
  
  // CORS configuration to handle multiple origins
  app.use(
    cors({
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "headers"],
    })
  );

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/employer", employerRoutes);
app.use("/api/v1/jobseeker", jobSeekerRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/apply", applyRoutes);

app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is started"
    })
})

app.listen(PORT, () => {
    console.log(`your server started at ${PORT}`);
})