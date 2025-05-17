import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import PublicIcon from '@mui/icons-material/Public';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashboardItem() {

    //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

    const isMobile = window.innerWidth <= 768;

    const navigate = useNavigate()

    const [userID, setUserId] = useState('')
    const [userDetail, setUserDetail] = useState({})
    const [company, setCompany] = useState('')
    const [jobData, setjobData] = useState([])

    const accountancyCount = Array.isArray(jobData) ? jobData.filter(job => job.category === "Accountancy").length : 0;
    const purchasingCount = Array.isArray(jobData) ? jobData.filter(job => job.category === "Purchasing").length : 0;
    const sandMCount = Array.isArray(jobData) ? jobData.filter(job => job.category === "Sales & Marketing").length : 0;
    const engineeringCount = Array.isArray(jobData) ? jobData.filter(job => job.category === "Engineering").length : 0;
    const handCCount = Array.isArray(jobData) ? jobData.filter(job => job.category === "Health & Care").length : 0;

    //for pagination in display(start)
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 3;

    const lastItemIndex = PageSize * currentPage;
    const firstItemIndex = lastItemIndex - PageSize;

    const currentJobs = jobData && jobData.slice(firstItemIndex, lastItemIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //for pagination in display(end)


    useEffect(() => {
        const getEmployerData = async (req, res) => {
            try {
                const result = await axios.get('/api/')
                //console.log("Validation = ",result.data.user._id)
                if (result.data.valid) {

                    setUserId(result.data.user._id)
                    //console.log("UserID = ",userID)
                    const res2 = await axios.post('/api/employer/EmployerData', { userID })
                    //console.log("Result printing =",res2)

                    //setUserDetail(res2)
                    //console.log("got the data as a result of fetch from getEmployerData =",res2)
                    setCompany(result.data.user.companyname)
                    //console.log("Result printing =",result.data.user.companyname)
                    const result1 = await axios.post('/api/getJobData/companyName', { company })
                    //console.log("got the data from the backend in getData section in dashboardItem employer =",result1.data.Data)
                    setjobData(result1.data.Data)
                }
                else {
                    navigate('/')
                }
            } catch (error) {
                console.log("Error occured in the dashboard frontend inside getEmployerData section = ", error)
            }
        }
        getEmployerData()
    })

    return (
        <div className={`Right mb-[10vw] flex flex-col justify-center align-middle dark:bg-[#101012]`}  >
            <div className={`flex justify-center font-serif font-semibold underline ${isMobile ? 'text-[8vw]' : 'text-[3vw]'} pb-[3vw] text-green-600`}  >DashBoard </div>
            <div className={`Right-top ${isMobile ? 'text-[5vw]' : 'text-[1vw]'} py-[1vw] bg-slate-50 dark:bg-[#212734] dark:text-slate-200 p-[1vw] m-[1vw] font-serif rounded-md border border-green-200 min-w-[55vw] `}  >
                <div className={` ${isMobile ? 'text-[4vw]' : 'text-[2vw]'} flex justify-center underline text-green-500 font-medium`}  ><PublicIcon style={{ fontSize: "3vw", marginRight: "1vw" }} />Jobs Offered in different Categories</div>
                <div className={`py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} `}  >Engineering : <span className={`${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} text-red-600 `}  >{engineeringCount} Jobs Posted</span></div>
                <div className={` py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Health & Care : <span className={`${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} text-red-600 `}  >{handCCount} Jobs Posted</span></div>
                <div className={` py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Purchasing : <span className={`${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} text-red-600 `}  >{purchasingCount} Jobs Posted</span></div>
                <div className={` py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Accountancy : <span className={`${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} text-red-600 `}  >{accountancyCount} Jobs Posted</span></div>
                <div className={` py-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}  >Sales & Marketing : <span className={`${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} text-red-600 `}  >{sandMCount} Jobs Posted</span></div>
            </div>
            <div className={`Right-bottom ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} py-[1vw] bg-slate-50 dark:bg-[#212734] dark:text-slate-200 p-[1vw]  font-serif rounded-md border border-green-200 `}  >
                <div className={`${isMobile ? 'text-[4vw]' : 'text-[2vw]'}  flex justify-center underline text-green-500 font-medium `}  ><ReceiptLongIcon style={{ fontSize: "3vw", marginRight: "1vw" }} />Openings Offered</div>

                {
                    currentJobs && currentJobs.map((job, index) => (
                        <div id='index' className={`Each job bg-white p-5 my-[1vw] rounded-lg flex justify-around gap-5 hover:shadow-2xl `}  >
                            <div className={`left part `}  >{/***********************left part hai *******************/}
                                <div className={`flex gap-10 `}>
                                    <div className={`${isMobile ? 'text-[3vw]' : 'text-[1.25vw]'} font-serif font-semibold  `}  >
                                        {job.jobTitle}
                                    </div>
                                    <div className={`${isMobile ? 'text-[3vw]' : 'text-[1vw]'} p-1 rounded-md text-white flex justify-center align-middle font-semibold ${ //job.jobType ka quotes se hata dena jb kaam krna ho toh
                                        job.jobType === 'Full Time' ? 'bg-green-400' :
                                            job.jobType === 'Part Time' ? 'bg-yellow-400' :
                                                job.jobType === 'Temporary' ? 'bg-blue-400' :
                                                    job.jobType === 'Freelance' ? 'bg-red-400' : 'bg-blue-400'
                                        }`}>
                                        {job.jobType}
                                    </div>
                                </div>
                                <div className={` flex text-slate-400 gap-2 font-serif p-2`}  >
                                    <div className={` ${isMobile ? 'text-[3vw]' : 'text-[1vw]'}`}  >via </div>
                                    <div className={`text-green-400 ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} font-semibold `}  >{job.companyName}</div>
                                    <WorkIcon />
                                    <div className={`${isMobile ? 'text-[3vw]' : 'text-[1vw]'} `}  >{job.jobField}</div>
                                </div>
                            </div>
                            <div className={`right part ${isMobile ? 'text-[2.4vw]' : 'text-[1.5vw] '} `}  >{/***********************right part hai *******************/}
                                <div className={`font-serif font-semibold ${isMobile ? 'text-[2.5vw]' : 'text-[1.2vw]'} `}  >Requirements :</div><br />
                                <div className={`flex gap-1 flex-wrap  `}  >
                                    {
                                        job.skills.map((skill, index) => (
                                            <div className={`${isMobile ? 'text-[5vw]' : 'text-[1vw]'}text-blue-500 font-semibold`}>{skill} |</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
                {Array.isArray(jobData) && jobData.length > 0 && (
                    <div className={`flex justify-center `}  >
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

export default DashboardItem
