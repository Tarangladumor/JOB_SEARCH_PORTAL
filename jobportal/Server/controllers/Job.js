const Employer = require("../models/Employer");
const Category = require("../models/Category");
const Job = require("../models/Job")
const User = require("../models/user");

exports.createJob = async(req,res) => {
    try {

        let {
            jobTitle,
            jobDescription,
            jobType,
            category,
            tag,
            location,
        } = req.body

        if(!jobType || jobType === "Part-Time"){
            jobType = "Full-Time"
        }

        if(!jobTitle || !jobDescription  || !category || !location){
            return res.status(400).json({
                success:false,
                message:"All feilds are required in creating the job"
            });
        }

        // if(!jobType || jobType === "Part-Time"){
        //     jobType = "Full-Time"
        // }

        const userId = req.user.id;
        console.log(userId);

        const employerDetails = await User.findById(userId, {
            AccountType : "Employer"
        })

        console.log(employerDetails);

        if(!employerDetails) {
            return res.status(400).json({
                success:false,
                message:"Employer not found"
            });
        }

        const categoryDetails = await Category.find({name:category});

        if (!categoryDetails) {
            return res.staus(404).json({
                success: false,
                message: "Category Details not found"
            });
        };

        const newJob = await Job.create({
            jobTitle,
            jobDescription,
            employer:employerDetails._id,
            jobType,
            category:categoryDetails._id,
            tag,
            location,
        })

        await User.findByIdAndUpdate({_id : employerDetails._id},{
            $push:{
                jobs: newJob._id
            }
        });

        return res.status(200).json({
            success:true,
            message:"Job Created successfully",
            data:newJob,
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in cretaing the job",
            error:error.message
        })
    }
}

exports.getAllJobs = async(req,res) => {
    try {
        const allJobs = await Job.find().populate("employer").exec();

        return res.status(200).json({
            success:true,
            message:"All job fetched successgully",
            data:allJobs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching all jobs"
        })
    }
}

exports.getOneJobDetails = async(req,res) => {
    try{

        const {jobId} = req.body;

        const jobDetail = await Job.findById(jobId);

        if(!jobDetail) {
            return res.status(400).json({
                success:false,
                message:"Could not find the job"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Job fetched successfully",
            Data:jobDetail
        })
    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            success:false,
            message:"error in get one job details",
            error:error.message
        })
    }
}

exports.editJob = async(req,res) => {
    try{
        const {jobId} = req.body;
        const updates = req.body;
        
        const job = await Job.findById(jobId)

        if(!job) {
            return res.status(400).json({
                success:false,
                message:"Job not found"
            })
        };

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                job[key] = updates[key]
            }
        }

        await job.save();

        const updatedJob = await Job.findOne({_id:jobId}).populate("employer").populate("category").populate("jobApplications").exec();

        return res.status(200).json({
            success:true,
            message:"Job updated successfully",
            data:updatedJob
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"job not edited",
            error:error.message
        })
    }
}

exports.deleteJob = async(req,res) => {
    try {
        const {jobId} = req.body ;
        
        const job = await Job.findByIdAndDelete({_id:jobId});

        return res.status(200).json({
            success:true,
            message:"job deleted successfully"
        });
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"JOb not Deleted"
        })
    }
}