import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getJobPost } from '../../services/operations/jobsAPI';

const JobPost = () => {

    const {token} = useSelector((state) => state.auth);

    const [jobposts,setJobPosts] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            const data = await getJobPost(token);
            console.log("Data...",data)
            setJobPosts(data)
        }

        fetchData();
    },[])

    console.log(jobposts);
  return (
    <div>
        <div></div>
    </div>
  )
}

export default JobPost
