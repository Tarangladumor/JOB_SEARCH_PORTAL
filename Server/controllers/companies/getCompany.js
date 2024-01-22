const Company = require("../../models/company");

exports.getCompany = async(req,res) => {
    try{

        const company = await Company.find({});

        res.status(200).json({
            success:true,
            data:company
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"failed to get the data"
        });
    }
}

exports.getCompanyById = async(req,res) => {
    try{
        const id = req.params.id;
        const company = await Company.findById({_id:id});

        if(!company){
            return res.status(404).json({
                success:false,
                message:"enter valid id"
            });
        }

        return res.status(200).json({
            success:true,
            data:company,
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Server error"
        });
    }
}