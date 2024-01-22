const User = require("../../models/user");

exports.updateUser = async(req,res) => {
    try{

        const id = req.params.id;
        const {firstName,lastName,DOB,email,gender,contact_number} = await req.body;

        const user = await User.findOneAndUpdate(
            {_id:id},
            {
                firstName,
                lastName,
                DOB,
                gender,
                email,
                contact_number
            }
        )

        res.status(200).json({
            success:true,
            data:user,
            message:"user updated successfully"
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