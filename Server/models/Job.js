const mongoose=required('mongoose');
const JobSchema=new mongoose.Schema
(
    {
        jobtitle:
        {
            type:String,
            required:true,
        },
        jobType:
        {
            type:String,
            enum:["PART-TIME","FULL-TIME"],
            required:true,
        },
        salary:
        {
            type:Number,
            required:true,
        },
        location:
        {
            type:String,
            required:true,
        },
        company:
        {
            type:String,
            requred:true,
        },
        companyLogo:
        {

        },

    }
)