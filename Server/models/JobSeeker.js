const { default: mongoose } = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    location : {
        type : String,
    },
    appliedJobs : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Job"
    },
    

})

module.exports = mongoose.model("JobSeeker", jobSeekerSchema);