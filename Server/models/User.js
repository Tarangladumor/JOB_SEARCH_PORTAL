const {mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required : true
    },
    lastName : {
        type:String,
        required : true
    }
    ,
    email : {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true
    },
    accountType : {
        type : String,
        enum : ["Job Seeker","Employer"],
        required:true,
    },
    token : {
        type : String
    },
    jobs : {
        type : mongoose.Schema.Types.Objectid,
        ref : "Job"
    },
    jobSeeker : {
        type : mongoose.Schema.Types.Objectid,
        ref : "JobSeeker"
    },
    employer : {
        type : mongoose.Schema.Types.Objectid,
        ref : "Employer"
    }

})

module.exports = mongoose.model("User", userSchema)