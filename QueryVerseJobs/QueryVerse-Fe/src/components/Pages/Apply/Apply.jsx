import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FeedIcon from '@mui/icons-material/Feed';
import DescriptionIcon from '@mui/icons-material/Description';
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function Apply() {

  const navigate = useNavigate()

  let { jobID } = useParams();
  console.log(jobID)
  const [userID, setUserId] = useState('')

  //job data
  const [jobDetail, setJobDetail] = useState({})
  //user data
  const [userDetail, setUserDetail] = useState({})

  //Cover letter
  const [inputValue, setInputValue] = useState('');



  //availability check
  const [selectedAvailability, setSelectedAvailability] = useState('Yes');

  const applicationSubmitted = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    console.log("Cover value = ", inputValue);
    try {
      const result = await axios.post('/api/candidate/ApplicationSubmit', { jobDetail, userID });
      console.log(result.data);
      navigate('/jobs');
    } catch (error) {
      console.error("Error submitting application:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {

    const getJobData = async () => {
      try {
        const result = await axios.post('/api/getJobData', { jobID })
        setJobDetail(result.data.Data[0])
      } catch (error) {
        console.log("Error occured bringing job data in the apply.jsx section frontend =", error)
      }
    }
    getJobData()


  }, [jobID])

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const result = await axios.get('/api/')
        //console.log(result.data.valid)
        if (result.data.valid) {
          setUserId(result.data.user._id)
          const res2 = await axios.post('/api/candidate/CandidateData', { userID })
          setUserDetail(res2.data)
        }
        else {
          navigate('/')
        }
      } catch (error) {
        console.log("Error occured bringing user data in  the apply.jsx section frontend =", error)
      }
    }

    getUserDetails()
  }, [userID])

  const isMobile = window.innerWidth <= 768;

  return (
    <form post="/jobs" className={`font-serif mt-[7vw] p-[5vw] `} onSubmit={applicationSubmitted}>
      <div className={`flex justify-center font-serif font-semibold underline ${isMobile ? 'text-[8vw]' : 'text-[3vw]'} pb-[3vw] text-green-600`}  >Fill the Details<FeedIcon style={{ fontSize: isMobile ? "12vw" : "5vw", marginLeft: "1vw" }} /></div>

      <div className={`bg-gray-100 dark:bg-[#212734] dark:text-slate-200 p-[5vw] rounded-md border border-green-400 `} >

        <div className={` ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}  font-medium `} >Applying for <span className={`text-green-500 `} >{jobDetail.jobTitle}</span> </div>
        <div className={`${isMobile ? 'text-[4vw]' : 'text-[1vw]'} font-medium text-green-500 pb-[5vw] `} >{jobDetail.companyName}</div>

        <div className={`First Name font-serif `} >
          <div className={` font-semibold ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >First Name :</div>
          <input type="text" name="" id="" value={userDetail.fname} readOnly className={`m-[2vw] dark:bg-[#151821] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]  `} required pattern=".*\S+.*" placeholder='Ram' />
        </div>

        <div className={`Last Name font-serif `} >
          <div className={`font-semibold ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} `} >Last Name :</div>
          <input type="text" name="" id="" value={userDetail.lname} readOnly className={`m-[2vw] dark:bg-[#151821] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] `} required pattern=".*\S+.*" placeholder='Prasad' />
        </div>

        <div className={`Candidate Email font-serif `} >
          <div className={` font-semibold ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >Email Address :</div>
          <input type="email" name="" id="" value={userDetail.email} readOnly className={` m-[2vw] dark:bg-[#151821] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]`} required pattern=".*\S+.*" placeholder='xyz@email.com' />
        </div>

        <div className={`Cover Letter py-[5vw]  flex `} >
          <div className={`pb-[1vw] font-semibold relative bottom-[0vh] ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} `} >Cover Letter :</div><br />
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className={` p-2 ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} rounded transition-width duration-200 focus:outline-none text-wrap dark:bg-[#151821] border border-gray-600 dark:border-[#753ca3]  min-w-[40vw] min-h-[20vh] relative left-[3.5vw]`} required placeholder='Cover letter description i.e. Why should we hire you for this position ? (or) What are you fit for this role ? ,etc.' />
        </div>

        <div className={`Availability flex`} >
          <div className={`pb-[1vw] font-semibold relative bottom-[0vh] ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} `} >Availability:</div>
          <div className={`relative left-[6.5vw] p-1`} >
            {/* Yes radio button */}
            <div>
              <input
                type="radio"
                id="yes"
                name="availability"
                value="Yes"
                checked={selectedAvailability === 'Yes'}
                onChange={() => setSelectedAvailability('Yes')}

              />
              <label htmlFor="yes" className={`p-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} `} >Yes,I am available in the time range</label>
            </div>

            {/* No radio button */}
            <div>
              <input
                type="radio"
                id="no"
                name="availability"
                value="No"
                checked={selectedAvailability === 'No'}
                onChange={() => setSelectedAvailability('No')}
              />
              <label htmlFor="no" className={`p-[1vw] ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >No,I am not available <span className='text-red-500'>(Don't submit my application)</span></label>
            </div>
          </div>
        </div>

        <div className='Resume font-serif'>
          <div className={`${isMobile ? 'text-[4vw]' : 'text-[1vw]'} font-bold`}>Resume :</div>
          {
            (userDetail.resume) ? (<div className='p-[2vw]'>
              <DescriptionIcon style={{ fontSize: isMobile ? '8vw' : '3vw' }} />

              <div className={`relative ${isMobile ? 'bottom-[1vw]' : 'bottom-[3vw]'} ${isMobile ? 'ml-[5vw]' : 'ml-[3vw]'} `} >
                <div className={`${isMobile ? 'text-[3vw]' : 'text-[1vw]'} ${isMobile ? 'pl-[1vw]' : ''}`}>resume</div>
              </div>


            </div>) : (<div className={`${isMobile ? 'text-[2vw]' : 'text-[1vw]'}`}>Resume not submitted Yet <span className='text-red-500'>(Required to Proceed for submission)</span></div>)
          }
        </div>

        <div className={` flex gap-[1vw]`} >
          <NavLink to={`/JobDetail/${jobID}`}>
            <div className={` p-[1vw] relative ${isMobile ? 'left-[10vw]' : 'left-[38vw]'} top-[2vh]  rounded font-bold border border-blue-400 hover:bg-blue-300 hover:text-white ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >Back</div>
          </NavLink>

          {
            (selectedAvailability === 'Yes') ? (

              (userDetail.resume) ? (<button type="submit" className={`p-[1vw] relative ${isMobile ? 'left-[20vw]' : 'left-[40vw]'}  top-[2vh] bg-green-500 rounded font-bold text-white hover:bg-green-400 ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >Submit Application</button>) : (<>
                <NavLink to="/candidate/Dashboard/Profile">
                  <button type="submit" className={`p-[1vw] relative ${isMobile ? 'left-[20vw]' : 'left-[40vw]'}  top-[2vh] bg-green-500 rounded font-bold text-white hover:bg-green-400 ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >Go To Profile</button>
                </NavLink>
              </>)


            ) : (<>
              <NavLink to="/jobs">
                <button type="submit" className={`p-[1vw] relative ${isMobile ? 'left-[20vw]' : 'left-[40vw]'}  top-[2vh] bg-green-500 rounded font-bold text-white hover:bg-green-400 ${isMobile ? 'text-[4vw]' : 'text-[1vw]'}`} >Explore More</button>
              </NavLink>

            </>)
          }

        </div>


      </div>
    </form>
  )
}

export default Apply
