import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CandidateDashItem() {

    const isMobile = window.innerWidth <= 768;

    const navigate = useNavigate();
    const [userID, setUserId] = useState('');
    const [userDetail, setUserDetail] = useState({});
    const [jobID, setJobId] = useState([]);
    const [jobData, setjobData] = useState([]);

    const [eachJob, setEachJob] = useState({})

    const [account, setAccount] = useState(0)
    const [engg, setEngg] = useState(0)
    const [purchase, setPurchase] = useState(0)
    const [HC, setHC] = useState(0)
    const [SM, setSM] = useState(0)

    //for pagination in display(start)
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 3;

    const lastItemIndex = PageSize * currentPage;
    const firstItemIndex = lastItemIndex - PageSize;

    const currentJobs = jobData && jobData.slice(firstItemIndex, lastItemIndex);
    console.log("current jobs :", currentJobs)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //for pagination in display(end)


    //finding user id.....
    useEffect(() => {
        console.log("Executing useEffect for getCandidateData");
        const getCandidateData = async () => {
            try {
                const result = await axios.get('/api/');
                console.log("Validation =", result.data);
                if (result.data.valid) {
                    console.log("User from session ==", result.data.user._id)
                    setUserId(result.data.user._id.toString());
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.log("Error occurred in getCandidateData section:", error);
            }
        };
        getCandidateData();
    });


    const getUserDetails = async () => {
        try {
            console.log("Fetching user details for UserID =", userID);
            const result = await axios.post("/api/candidate/CandidateData", { userID });
            console.log("User details response:", result.data);
            return result.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            throw error; // Propagate the error
        }
    }

    // Fetch user details when userID changes
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log("Getting user details for UserID =", userID);
                const userDetails = await getUserDetails();
                console.log("User details:", userDetails);
                setUserDetail(userDetails);
                if (userDetails && userDetails.applications && Array.isArray(userDetails.applications)) {

                    for (let i = 0; i < userDetails.applications.length; i++) {
                        console.log(userDetails.applications[i]);
                        setJobId((prev) => [...prev, userDetails.applications[i]])
                    }
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (userID !== '') {
            fetchUserDetails();
        }
    }, [userID]);






    const getJobs = async () => {
        try {
            console.log("Fetching job datas =", jobID);
            const result = await axios.post("/api/getJobData/jobId", { jobID });
            console.log("Response from server:", result.data);
            if (result.data.status === 201) {
                //console.log("Job data received:", result.data.Data);
                return result.data.Data;
            } else {
                console.log("Error: ", result.data.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching job details:", error);
            return null; // Return null to handle errors
        }
    }

    //console.log("User ka detail",userDetail)
    //console.log("Ids mil gya ",jobID)
    const jobDatas = getJobs();


    // Fetch job data when jobID changes
    useEffect(() => {
        const fetchJobData = async () => {
            const jobDatas = await getJobs();
            //console.log("Kaam ki cheez yeh hai =", jobDatas);
            if (jobDatas !== null) {
                setjobData(jobDatas);
            }
        };

        fetchJobData(); // Call the function to fetch job data
    }, [jobID]);

    console.log("Kaam ki cheez yeh hai =", jobData)

    useEffect(() => {
        console.log("I am here to count the data");
        // Add a condition to check if jobData is not empty
        if (jobData.length > 0) {
            for (let i = 0; i < jobData.length; i++) {
                console.log("Category printing =", jobData[i][0].category);
                if (jobData[i][0].category === "Engineering") {
                    setEngg(p => p + 1);
                    console.log("Engineering")
                } else if (jobData[i][0].category === "Accountancy") {
                    setAccount(p => p + 1);
                    console.log("Accountancy")
                } else if (jobData[i][0].category === "Purchasing") {
                    setPurchase(p => p + 1);
                    console.log("Purchasing")
                } else if (jobData[i][0].category === "Health & Care") {
                    setHC(p => p + 1);
                    console.log("Health")
                } else if (jobData[i][0].category === "Sales & Marketing") { // Corrected condition
                    setSM(p => p + 1); // Increment SM count
                    console.log("Sales")
                }
            }
        }
    }, [jobData]); // Include jobData as a dependency


    const JobType = (Job) => {
        console.log("Job ka value yahan hai", Job)
        setEachJob(Job)
        console.log("Each job ka value mil gya = ", eachJob)
        return Job.jobType
    }






    return (
        <div className={` Right dark:bg-[#101012] dark:text-slate-200 mb-[5vw] w-full`}  >
            <div className={`font-serif font-semibold underline flex justify-center align-middle ${isMobile ? 'text-[7vw]' : 'text-[3vw]'} pb-[3vw] text-green-600 `}  >DashBoard</div>
            <div className={`Right-top bg-slate-50 dark:bg-[#212734] ${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'} py-[1vw]  ${isMobile ? 'p-[5vw]' : 'p-[1.5vw]'} ${isMobile ? 'my-[5vw]' : 'my-[1.5vw]'} font-serif rounded-md border border-green-200 w-full`}>

                <div className={` ${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'} ${isMobile ? '' : 'm-[1.5vw]'} flex justify-center underline text-green-500 font-medium`}  ><PublicIcon style={{ fontSize: isMobile ? '6vw' : '3vw', marginRight: '1vw' }} />Applications in different Categories</div>
                <div className={`py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} `}  >Engineering : {engg}</div>
                <div className={`py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} `}  >Health & Care : {HC}</div>
                <div className={`py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Purchasing : {purchase}</div>
                <div className={`py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Accountancy : {account}</div>
                <div className={` py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Sales & Marketing : {SM}</div>
            </div>
            <div className={`Right-bottom ${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'} py-[1vw] bg-slate-50 dark:bg-[#212734]  p-[1vw] font-serif rounded-md border border-green-200 w-full`}>

                <div className={`${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}  flex justify-center underline text-green-500 font-medium `}  ><ReceiptLongIcon style={{ fontSize: isMobile ? '6vw' : '3vw', marginRight: '1vw' }} />Job Applications</div>

                {/* {
                    console.log("JobData : ",jobData)
                } */}

                {

                    currentJobs && currentJobs.map((job, index) => (
                        <div key={index} className={` Each job bg-white p-5 my-[1vw] rounded-lg flex justify-around gap-5 hover:shadow-2xl`}  >
                            <div className={`left part `}  >
                                <div className={`flex gap-10 `}  >
                                    <div className={`${isMobile ? 'text-[4vw]' : 'text-[1.25vw]'} font-serif font-semibold  `}  >
                                        {/* Assuming jobType is a property of each job object */}
                                        {job[0].jobTitle}
                                    </div>
                                    <div className={` flex justify-center align-middle ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} p-1 rounded-md text-white font-semibold ${job[0].jobType === 'Full Time' ? 'bg-green-400' :
                                            job[0].jobType === 'Part Time' ? 'bg-yellow-400' :
                                                job[0].jobType === 'Temporary' ? 'bg-blue-400' :
                                                    job[0].jobType === 'Freelance' ? 'bg-red-400' : 'bg-blue-400'
                                        }`}>
                                        {job[0].jobType} {/* Assuming jobType is a property of each job object */}
                                    </div>
                                </div>
                                <div className={` flex text-slate-400 gap-2 font-serif p-2`}  >
                                    <div className={`${isMobile ? 'text-[3.5vw]' : 'text-[1vw]'} `}  >via </div>
                                    <div className={`text-green-400 ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} font-semibold `}  >{job[0].companyName}</div> {/* Assuming companyName is a property of each job object */}
                                    <WorkIcon />
                                    <div className={`${isMobile ? 'text-[3vw]' : 'text-[1vw]'} `}  >{job[0].jobField}</div>
                                </div>
                            </div>
                            <div className={`right part ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} `}  >
                                <div className={` font-serif font-semibold`}  >Requirements :(min req.)</div><br />

                                {

                                    job[0].skills && job[0].skills.map((skill) => (
                                        <div className={`flex gap-1 flex-wrap text-blue-500 font-semibold `}  >
                                            {skill}
                                        </div>
                                    ))
                                }


                            </div>
                        </div>
                    ))
                }



                {/* {Job 1 completed} */}

            </div>

            <div className={`mt-[3vw] w-full`}>
                {Array.isArray(jobData) && jobData.length > 0 && (
                    <div className={` flex justify-center`}  >
                        {/* Previous Button */}
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`mx-2 px-3 py-1 rounded bg-gray-200 text-gray-700 `}
                        >
                            Previous
                        </button>

                        {/* Page Buttons */}
                        {Array.from({ length: Math.ceil(jobData.length / PageSize) }).map((_, index) => {
                            const pageNumber = index + 1;
                            const isWithinRange = Math.abs(pageNumber - currentPage) < 2;
                            if (pageNumber === 1 || pageNumber === Math.ceil(jobData.length / PageSize) || isWithinRange) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => paginate(pageNumber)}
                                        className={`mx-2 px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            }
                            return null;
                        })}

                        {/* Next Button */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(jobData.length / PageSize)}
                            className={`mx-2 px-3 py-1 rounded bg-gray-200 text-gray-700 `}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>


        </div>
    )
}

export default CandidateDashItem
