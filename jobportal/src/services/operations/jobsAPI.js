import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL

const { jobendpoints } = require("../apis");

const {
    GETALLJOBS_API,
    GETJOB_DETAILS_API
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

// export const getOneJobDetails = async (jobId) => {
//     console.log("JOB ID>>>>>>>>>>",jobId);
//     const toastId = toast.loading("Loading...");
//     let result = null;
//     try {
//         const response = await apiConnector("GET", GETJOB_DETAILS_API, {
//             jobId
//         })
//         console.log("RESPONSE>>>>>>>>",response)
//         console.log("GETJOB_DETAILS_API RESPONSE...",response);

//         if(!response?.data?.success){
//             throw new Error(response.data.message);
//         }

//         result = response.data
//     } catch (error){
//         console.log("GETJOB_DETAILS_API ERROR......",error);
//         result = error.response.data
//     }
//     toast.dismiss(toastId);
//     return result
// }

// export const getOneJobDetails = async(jobId) => {
//     const toastId = toast.loading("Loading....")
//     console.log("JOBIDDDD......",jobId);
//     let result = null;
//     console.log(`${BASE_URL}/getJobDetails/${jobId}`)
//     try {
//         const res = axios.get(`${BASE_URL}/getJobDetails`,{params:{
//             id:jobId
//         }})
//         console.log("GETJOB_DETAILS_API RSPONSE........",res);

//         // if(!res?.data?.success){
//         //     throw new Error(res.data.message)
//         // }

//         result = res?.data?.data
//     } catch (error) {
//         console.log("GETJOB_DETAILS_API ERROR....",error)
//     }
//     toast.dismiss(toastId);
//     return result
// }

export const getOneJobDetails = async (jobId) => {
    const toastId = toast.loading("Loading....");
    console.log("JOBIDDDD......", jobId);
    let result = null;
    const url = `${BASE_URL}/job/getJobDetails` 
    try {
        const res = await axios.get(`${url}/${jobId}`);
        console.log("GETJOB_DETAILS_API RESPONSE........", res);

        if (!res || !res.data || !res.data.success) {
            throw new Error("Failed to get job details");
        }

        result = res.data.data;
    } catch (error) {
        console.log("GETJOB_DETAILS_API ERROR....", error);
        // Handle error gracefully, perhaps log it or show an error message
    }
    toast.dismiss(toastId);
    return result;
}
