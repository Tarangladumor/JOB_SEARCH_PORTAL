const express = require('express');

const router = express.Router();

const {updateJobSeeker,deleteAccount,getAllJobSeekerDetails,getAplliedJobs} = require("../controllers/jobSeeker");
const { auth, isJobSeeker } = require('../middlewares/Auth');

router.post("/updateJobseeker",auth,isJobSeeker,updateJobSeeker);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getJobseekerdetails",auth,isJobSeeker,getAllJobSeekerDetails);


router.get('/getAppliedjobs',auth,isJobSeeker,getAplliedJobs);

module.exports = router;