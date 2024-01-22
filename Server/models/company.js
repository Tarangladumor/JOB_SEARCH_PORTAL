const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
    {
        company_name: {
            type:String,
            required: true
        },
        profile_description: {
            type:String,
            required: true
        },
        business_stream: {
            type:String,
            required:true
        },
        company_web_url: {
            type:String
        }
    }
)

module.exports = mongoose.model("Company", companySchema);