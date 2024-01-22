const User = require("../../models/user");

exports.deleteUser = async(req,res) => {
    try{

        const id = req.params.body;

        await User.deleteOne({_id:id});

        res.json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Failed to delete user"
        })
    }
}