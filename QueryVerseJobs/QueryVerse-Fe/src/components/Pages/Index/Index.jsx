import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import axios from 'axios';
import CandidateIndex from './CandidateIndex';
import JobTypes from './JobTypes';
import SearchSection from './SearchSection';
import SiteIntro from './SiteIntro';
import { motion } from "framer-motion"

function Index() {

  //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

  const isMobile = window.innerWidth <= 768;

  const [loggedIn, setLoggedIn] = useState(false) //checking whether the user is logged in or nor
  const [user, setUser] = useState({})
  const [category, setCategory] = useState()

  const navigate = useNavigate();



  const [jobselected, setJobselected] = useState(0);
  const [candidateselected, setCandidateselected] = useState(0);



  const jobClick = () => {
    if (!jobselected) {
      setJobselected(1);
      setCandidateselected(0);
    }
  };

  const candidateClick = () => {
    if (!candidateselected) {
      setJobselected(0);
      setCandidateselected(1);
    }
  };



  useEffect(() => {

    const checkForLogins = async () => {
      try {
        const res = await axios.get('/api/')
        //console.log(res)
        if (res.data.valid) {
          setLoggedIn(true)
          setUser(res.data.user)
          setCategory(res.data.category)
        }

      }
      catch (error) {
        console.log("error in the index section frontend = ", error)
      }
    }

    checkForLogins()
  }, [loggedIn])



  return (
    <>
      <div className={`bg-gray-100 dark:bg-[#151821] max-w-100vw ${isMobile ? 'text-[7vw]' : 'text-[1vw]'} `}  >
        <div

        style={{ backgroundImage: `url(https://plus.unsplash.com/premium_photo-1661373719922-c104ddbf6d87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}
         className={`bg-cover bg-no-repeat h-full `}   >

          <motion.div 
          initial={{ y: "25%" ,opacity: 0}}
          animate={{ y: 0 ,opacity: 1}}
          exit={{ y: "-25%" ,opacity: 0}}
          transition={{duration: 2,delay: 0.4 }}
          className={` text-indigo-50 font-serif font-semibold ${isMobile ? 'text-[5vw]' : 'text-[3vw]'} px-12 py-[10vw]`}    >
            Forge Your Future: Where Talent Meets Opportunity, and Careers Take Flight !!!
            <br /><br />
            <div className={` text-indigo-50 py-5 font-serif font-semibold ${isMobile ? 'text-[4vw]' : 'text-[2vw]'}`}   > Connecting Skilled Professionals with Dynamic Job Opportunities</div>
          </motion.div>

          {
            (category === 'candidate') ?

              (<SearchSection />) : (<></>)}
        </div>

        <JobTypes />

        {
          (category === 'candidate') ? 
          (
            <CandidateIndex />
          ) : (<></>)
        }

        <div className={` Are_you_a_employer/employee p-[5vw]`}   >
          <div className={` left flex max-w-[60vw] bg-gray-300 dark:bg-[#212734] border-green-400 border-2 m-[5vw] p-[5vw] rounded-xl justify-start`}   >
            <div className={` left`}   >
              <PersonSearchIcon style={{ fontSize: 100, color: '#43a047' }} />
            </div>
            <div className={`right `}   >
              <div className={` font-semibold  dark:text-slate-200 font-serif ${isMobile ? 'text-[4vw]' : 'text-[2vw]'} p-[1vw]`}   >Looking For a Job ?</div>
              <div className={`text-gray-700 dark:text-slate-300 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} `}   >Great Opportunities of your field by your dream Companies are waiting for you.</div>
              {(category === "candidate") ? (<div>
                <NavLink to='/JobList'>
                  <div className={`text-green-500 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} `}   >Apply Now</div>
                </NavLink>
              </div>) : (<></>)}
            </div>
          </div>
          <div className={` right ml-[30vw] bg-gray-300 text-gray-700 dark:bg-[#212734] border-green-400 flex max-w-[60vw] m-[5vw] p-[5vw]  border-2 rounded-xl justify-start`}   >
            <div className={`left `}>
              <ConnectWithoutContactIcon style={{ fontSize: 100, color: '#43a047' }} />
            </div>
            <div className={`right `}   >
              <div className={` font-semibold text-gray-700 dark:text-slate-200 font-serif ${isMobile ? 'text-[4vw]' : 'text-[2vw]'} ${isMobile ? 'p-[0vw]' : 'text-[1vw]'}`}   >Are You Recruiting ?</div>
              <div className={`text-gray-700 dark:text-slate-300  ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} `}   >Five million searchable CVs in one place with our linked CV database.</div>
              {(category === "employer") ? (<div>
                <NavLink to='/PostaJob'>
                  <div className={`text-green-500  ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} `}   >Post Now</div>
                </NavLink>
              </div>) : (<></>)}
            </div>
          </div>
        </div>
        <SiteIntro />
      </div>

    </>
  )
}

export default Index
