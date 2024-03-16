const express = require('express');

const router = express.Router();

const {createJob,getAllJobs,getOneJobDetails,editJob,deleteJob} = require("../controllers/Job");

const {createCategoty,showAllCategories,categoryPageDetails} = require("../controllers/Category");

const { auth, isEmployer, isAdmin } = require('../middlewares/Auth');

//JOBS routers

router.post("/createjob",auth,isEmployer,createJob);
router.get("/getAllJobs",getAllJobs);
router.get("/getJobDetails",getOneJobDetails);

router.post("/editJob",auth,isEmployer,editJob);
router.post("/deleteJob",auth,isEmployer,deleteJob);

// category routes
router.post("/createCategory",auth,isAdmin,createCategoty);
router.get("/showAllCategories",showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

module.exports = router;