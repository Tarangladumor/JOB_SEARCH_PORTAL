const Category = require("../models/Category");

exports.createCategoty = async(req,res) => {
    try{
        const {name , description} = req.body;

        if(!name) {
            return res.status(400).json({
                success:false,
                message:"Name is required in creatioon of category"
            });
        }

        const categoryDetails = await Category.create({
            name:name,
            description:description
        });

        return res.status(200).json({
            success:true,
            message:"category created successfully",
            data:categoryDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"category not created",
            error:error.message
        })
    }
}

exports.showAllCategories = async (req,res) => {
    try{

        const allCategories = await Category.find({});

        return res.staus(200).json({
            success:true,
            messag:"all categoru fetched succsfully",
            data:allCategories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "something went wrong in crating categories",
            error:error.message,
        })
    }
}

exports.categoryPageDetails = async(req,res) => {
    try{

        
    } catch(error) {

    }
}