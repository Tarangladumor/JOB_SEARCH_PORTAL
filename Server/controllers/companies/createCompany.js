const Company = require("../../models/company");

exports.createCompany = async(req,res) => {
    try{

        const{company_name,profile_description,business_stream,company_web_url} = req.body;

        const response = await Company.create({
            company_name,profile_description,business_stream,company_web_url
        });

        res.status(200).json({
            success:true,
            date:response,
            message:"company created successfully"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Error in creating company",
            message:err.message
        })
    }
}