const Company = require("../../models/company");

exports.updateCompany = async(req,res) => {
    try{

        const id = req.params.id;
        const {company_name,profile_description,business_stream,company_web_url} = await req.body;

        const company = await Company.findOneAndUpdate(
            {_id:id},
            {
                company_name,
                profile_description,
                business_stream,
                company_web_url
            }
        )

        res.status(200).json({
            success:true,
            data:company,
            message:"company updated successfully"
        })
    }catch(err){
        console.log(err);
        return res.statu(500).json({
            success:false,
            error:err.message,
            message:"Failed to update user"
        })
    }
}