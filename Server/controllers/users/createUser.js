const User = require("../../models/user");

exports.createUser = async(req,res) => {
    try{
        const{firstName,lastName,email,DOB,gender,contact_number} = req.body;

        const response = await User.create({
            firstName,lastName,email,DOB,gender,contact_number
        });

        res.status(200).json({
            success:true,
            date:response,
            message:"user created successfully"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Error in creating user",
            message:err.message
        })
    }
}