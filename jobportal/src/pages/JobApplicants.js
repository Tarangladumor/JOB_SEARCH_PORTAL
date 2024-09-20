import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getJobApplicants } from '../services/operations/jobsAPI';
import { useLocation } from 'react-router-dom';

const JobApplicants = () => {
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const pathArray = location.pathname.split("/");
    const jobId = pathArray[pathArray.length - 1];
    
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getJobApplicants(token, jobId);
            setApplicants(data);
        };

        fetchData();
    }, [token, jobId]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Job Applicants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {applicants?.jobApplications?.map((applicant, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 shadow-md rounded-lg transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
                    >
                        <img
                            src={applicant.image}
                            alt={`${applicant.firstName} ${applicant.lastName}`}
                            className="w-20 h-20 rounded-full mb-4 object-cover"
                        />
                        <h3 className="text-xl font-medium text-gray-900 mb-1">
                            {`${applicant.firstName} ${applicant.lastName}`}
                        </h3>
                        <p className="text-gray-600 mb-1">
                            <strong>Email:</strong> {applicant.email}
                        </p>
                        {/* <p className="text-gray-600 mb-1">
                            <strong>Account Type:</strong> {applicant.AccountType}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Job Seeker ID:</strong> {applicant.jobSeeker}
                        </p>
                        <p className="text-gray-600">
                            <strong>Employer ID:</strong> {applicant.employer}
                        </p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobApplicants;
