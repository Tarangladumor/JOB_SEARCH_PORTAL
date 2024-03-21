import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const { jobendpoints } = require("../apis");

const {
    GETALLJOBS_API,
} = jobendpoints

export const getAllJobs = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GETALLJOBS_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch all jobs")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GETALLJOBS_API ERROR...."  ,error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}