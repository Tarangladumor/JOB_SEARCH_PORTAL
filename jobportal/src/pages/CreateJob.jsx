import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchJobCategories } from '../services/operations/jobsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { editJobDetails } from '../services/operations/jobsAPI'
import { addJob } from '../services/operations/jobsAPI'
import toast from 'react-hot-toast'
import { setJob } from '../slices/jobSlice'

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm()

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { job, editJob } = useSelector((state) => state.job);

  const [loading, setLoading] = useState(false);
  const [jobCategories, setjobCategories] = useState([])


  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchJobCategories();
      if (categories.length > 0) {
        setjobCategories(categories)
      }
      setLoading(false)
    }

    if (editJob) {
      setValue("jobTitle", job.jobTitle);
      setValue("jobDescription", job.jobDescription);
      setValue("Salary", job.Salary);
      setValue("location", job.loaction);
      setValue("jobType", job.jobType);
      setValue("category", job.category);
    }

    getCategories();
  }, [])

  const isJobUpdated = () => {
    const currentValues = getValues();
    if (currentValues.jobTitle !== job.jobTitle ||
      currentValues.jobDescription !== job.jobDescription ||
      currentValues.Salary !== job.Salary ||
      currentValues.location !== job.loaction ||
      currentValues.jobType !== job.jobType ||
      currentValues.category._id !== job.category._id)
      return true
    else {
      return false
    }
  }

  const onSubmit = async (data) => {

    if (editJob) {
      if (isJobUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("jobId", job._id);
        if (currentValues.jobTitle !== job.jobTitle) {
          formData.append("jobTitle", data.jobTitle)
        }

        if (currentValues.jobDescription !== job.jobDescription) {
          formData.append("jobDescription", data.jobDescription)
        }

        if (currentValues.Salary !== job.Salary) {
          formData.append("Salary", data.Salary)
        }

        if (currentValues.location !== job.location) {
          formData.append("location", data.location)
        }

        if (currentValues.jobType !== job.jobType) {
          formData.append("jobType", data.jobType)
        }

        if (currentValues.category._id !== job.category._id) {
          formData.append("category", data.category)
        }

        setLoading(true);

        const result = await editJobDetails(data, token);
        setLoading(false);
        if (result) {
          dispatch(setJob(result))
        }
      } else {
        toast.error("No cahnges made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("jobTitle", data.jobTitle)
    formData.append("jobDescription", data.jobDescription)
    formData.append("Salary", data.Salary)
    formData.append("location", data.location)
    formData.append("jobType", data.jobType)
    formData.append("category", data.category)

    setLoading(true);
    const result = await addJob(formData, token);
    if (result) {
      dispatch(setJob(result));
    }
    setLoading(false);
  }
  return (
    <div>

      <div className='bg-[#7BBFF3] h-[500px] w-[500px] mt-10 ml-10 relative'>
        <div className='z-1000 backdrop-blur-lg absolute border-2 border-[#13317E] rounded-xl top-14 left-16 w-[calc(100vw-15rem)]'>
          <p className='font-jura font-bold text-5xl text-center p-5'>Job Create</p>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className='flex gap-10'>
                <div className='flex flex-col gap-10'>
                  <div>
                    <label>
                      <p>
                        Job Title<sup className='text-red-400'>*</sup>
                      </p>
                      <input
                        type='text'
                        name='jobTitle'
                        id='jobTitle'
                        placeholder='Enter Job Title'
                        {...register("jobTitle", { required: true })} />
                    </label>{
                      errors.jobTitle && (
                        <span>Job Title Required</span>
                      )
                    }
                  </div>


                  <div>
                    <label>
                      <p>
                        Job Description<sup className='text-red-400'>*</sup>
                      </p>
                      <input
                        type='text'
                        name='jobDescription'
                        id='jobDescription'
                        placeholder='Enter Job Description'
                        {...register("jobDescription", { required: true })} />
                    </label>{
                      errors.jobDescription && (
                        <span>Job Description Required</span>
                      )
                    }
                  </div>

                  <div>
                    <label>
                      <p>
                        Salary<sup className='text-red-400'>*</sup>
                      </p>
                      <input
                        type='text'
                        name='Salary'
                        id='Salary'
                        placeholder='Enter Salary'
                        {...register("Salary", { required: true })} />
                    </label>{
                      errors.Salary && (
                        <span>Salary Required</span>
                      )
                    }
                  </div>
                </div>


                <div>
                  <div>
                    <label>
                      <p>
                        Location<sup className='text-red-400'>*</sup>
                      </p>
                      <input
                        type='text'
                        name='location'
                        id='location'
                        placeholder='Enter Job Location'
                        {...register("location", { required: true })} />
                    </label>{
                      errors.location && (
                        <span>Job Location Required</span>
                      )
                    }
                  </div>

                  <div>
                    <label>
                      <p>
                        Job Type<sup className='text-red-400'>*</sup>
                      </p>
                      <select
                        id='jobType'
                        defaultValue=""
                        {...register("jobType", { required: true })}>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Full-Time">Full-Time</option>
                      </select>
                    </label>{
                      errors.jobType && (
                        <span>Job Location Required</span>
                      )
                    }
                  </div>

                  <div>
                    <label>
                      <p>
                        Category<sup className='text-red-400'>*</sup>
                      </p>
                      <select
                        id='category'
                        defaultValue=""
                        {...register("category", { required: true })}>
                        <option value="" disabled>Choose a Category</option>
                        {
                          !loading && jobCategories.map((ct, index) => (
                            <option key={index} value={ct._id}>{ct?.name}</option>
                          ))
                        }
                      </select>
                    </label>{
                      errors.jobType && (
                        <span>Job Category Required</span>
                      )
                    }
                  </div>
                </div>
              </div>


              <button className='flex justify-end w-[60%] '>
                Create Job
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateJob
