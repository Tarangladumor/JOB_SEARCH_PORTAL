const mongoose=require('mongoose');

const employerSchema=new mongoose.Schema(
    {
        user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        jobtitle:
        {
            type:String,
            required:true,
        },
        location:
        {
            type:String,
        },
        description:
        {
            type:string,
            required:true,
        }


    }
)
module.exports = mongoose.model("Employer", employerSchema)