const Company = require("../../models/company");

exports.deleteCompany = async(req,res) => {
    try{

        const id = req.params.id;

        await Company.deleteOne({_id:id});

        res.json({
            success:true,
            message:"company deleted successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Failed to delete company"
        })
    }
}