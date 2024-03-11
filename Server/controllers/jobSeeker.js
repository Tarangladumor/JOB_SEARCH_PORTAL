const JobSeeker = require("../models/JobSeeker");
const User = require("../models/user");

exports.updateJobSeeker = async(req,res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            dateOfBirth,
            about,
            contactNumber = "",
            currentSalayey = "",
            degree = "",
            experiance = ""
        } = req.body;

        const userId = req.user.id;

        if(!firstName || !lastName || !contactNumber || !currentSalayey || !degree || !experiance) {
            return res.status(400).json({
                success:false,
                messgae:"all feilds are required in updatejobseeker"
            });
        }

        const userDetails = await User.findById(userId);

        const jobSeekerId = userDetails.jobSeeker;

        const jobSeekerDetails = await JobSeeker.findById(jobSeekerId);

        const user = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName
        })

        await user.save()

        jobSeekerDetails.dateOfBirth = dateOfBirth;
        jobSeekerDetails.about = about;
        jobSeekerDetails.contactNumber = contactNumber;
        jobSeekerDetails.currentSalary = currentSalayey;
        jobSeekerDetails.degree = degree;
        jobSeekerDetails.experiance = experiance;

        await jobSeekerDetails.save()

        const updatedJobSeekerDetails = await User.findById(userId).populate("jobSeeker").exec();

        return res.status(200).json({
            success:true,
            message:"jobseeker updated successfully",
            data:updatedJobSeekerDetails,
        })


      } catch (error) {
        console.log(error);
        return res.status(500).json({
            suceess:false,
            message:"error while updateing the job seeker",
            error:error.message
        })
    }
}

exports.deleteAccount = async(req,res) => {
    try{

        const id = req.user.id;

        const user = await User.findById({_id:id});

        if(!user) {
            return res.status(400).json({
                success:false,
                message:"user not found for deleting the account"
            });
        }

        await JobSeeker.findByIdAndDelete({_id:user.jobSeeker});

        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in deleting account",
            error:error.message,
        })
    }
}

exports.getAllJobSeekerDetails = async(req,res) => {
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("jobseeker").exec();

        return res.status(200).json({
            success:true,
            message:"USer Data fetched successfully",
            data:userDetails,
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while geting all  Details of job seeker",
            error:error.message
        })
    }
}

exports.getAplliedJobs = async(req,res) => {
    try {

        const id = req.user.id;

        const userDetails = await User.findById({_id:id}).populate("jobs").exec();

        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"USer not found"
            });
        }

        return res.status(200).json({
            success:true,
            data:userDetails.jobs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            mesage:"error in getting applied jobs",
            error:error.mesage,
        })
    }
}