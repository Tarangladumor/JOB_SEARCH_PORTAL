const { default: mongoose } = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({


    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    appliedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job"
        }
    ],
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:true,
        required:true,
    },
    currentSalary:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true,
    },
    experiance:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model("JobSeeker", jobSeekerSchema);