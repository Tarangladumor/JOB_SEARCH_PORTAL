const User = require("../../models/user");

exports.getUsers = async(req,res) => {
    try{

        const users = await User.find({});

        res.status(200).json({
            success:true,
            data:users,
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

exports.getUserById = async(req,res) => {
    try{

        const id = req.params.id;
        const user = await User.findById({_id: id});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"enter valid id"
            });
        }

        return res.status(200).json({
            success:true,
            data:user,
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