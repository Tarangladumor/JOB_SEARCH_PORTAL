const mongoose=require('mongoose');

const employerSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        about:{
            type:String
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        location:{
            type:String,
        },
        contactNumber:{
            type:Number,
            trim:true
        },
        location:{
            type:String
        }
    }
)
module.exports = mongoose.model("Employer", employerSchema)