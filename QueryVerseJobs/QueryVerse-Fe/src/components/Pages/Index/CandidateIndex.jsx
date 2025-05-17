import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function CandidateIndex() {

    //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

    const isMobile = window.innerWidth <= 768;

    const [jobData, setjobData] = useState([])

    const uniqueCompanies = jobData.reduce((unique, job) => {
        if (!unique.includes(job.companyName)) {
            unique.push(job.companyName);
        }
        return unique;
    }, []);

    // Now uniqueCompanies contains an array of unique company names from jobData


    const renderedCompanies = uniqueCompanies.map((companyName, index) => {
        // Use the first character of the company name as the seed for Adorable Avatars
        const avatarSeed = companyName.charAt(0);

        // Adorable Avatars URL
        const avatarUrl = `https://ui-avatars.com/api/?name=${avatarSeed}&background=random&size=800`;

        return (
            <div key={index} className={` candidate text-orange-900 dark:text-slate-300 hover:text-white flex gap-[5vw] bg-slate-400  p-[2.5vw] items-center rounded-xl hover:shadow-2xl shadow-current hover:bg-green-700`}  >
                {/* Use the Adorable Avatars URL as the profile picture */}
                {/* <img src={avatarUrl} alt={`company${index + 1}`}  className={` `} 'max-w-[5vw] rounded-full' /> */}
                <div className={` candidate-details`}  >
                    <div className={` ${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'} font-serif font-bold  `}  >{companyName}</div>
                </div>
            </div>
        );
    });


    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get('/api/getdata')
                //console.log(result)
                setjobData(result.data)

            } catch (error) {
                console.log("Error occured in the index.jsx frontend inside getData section = ", error)
            }
        }

        getData()
    })
    return (
        <div>
            <motion.div 
            initial={{ y: '-75%', opacity: 0 }} // Start completely off screen left and invisible
            whileInView={{ x: 0, opacity: 1 }}     // Animate to its final position and fully visible
            transition={{ duration: 3 }}          // Specify the duration of the transition
            viewport={{ once: true }}               // Ensures the animation happens only once after coming into view
            className={`font-bold font-serif text-slate-700 dark:text-slate-200 flex justify-center items-center ${isMobile ? 'text-[6vw]' : 'text-[3vw]'} `}  >
                Recruiting Companies
            </motion.div>

            <Divider variant="middle" component="li" style={{ marginBottom: '10vw' }} />

            <div className={`p-[5vw] font-serif dark:text-slate-200 font-bold flex justify-center ${isMobile ? 'text-[4vw]' : 'text-[2.5vw]'} `}  >Every accomplishment starts with the decision to try.</div>
            <div className={` ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} flex text-red-500 font-serif font-semibold justify-center align-middle`}  >Our Top Recruiters</div>
            <div className={` Candidates flex p-[10vw] flex-wrap justify-evenly gap-[5vw] max-w-auto`}  >
                {renderedCompanies}
            </div>
            <div className={` Companies bg-slate-100 dark:bg-[#151821] px-12 pt-[10vw] pb-[5vw]`}  >
                <div  className={` ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} dark:text-slate-200 font-serif font-extrabold flex justify-center p-[5vw]`}  >
                    Featured Jobs Listing
                </div>


                <div className={`Jobs flex flex-col gap-[5vw] `}  >
                    {jobData.slice(0, 6).map((job, index) =>

                    (<motion.div
                        whileHover={{ scale: 1.05,duration:0.2 }} // Scale up the card on hover
                        initial={{ x: '-50%', opacity: 0 }} // Start completely off screen left and invisible
                        whileInView={{ x: 0, opacity: 1 }}     // Animate to its final position and fully visible
                        transition={{ duration: 0.5+index }}          // Specify the duration of the transition
                        viewport={{ once: true }}               // Ensures the animation happens only once after coming into view
                        
                        className={`Each job bg-white dark:bg-[#212734] p-[3vw] rounded-lg flex justify-around gap-[3vw] hover:shadow-2xl `}  >
                        <div className={`left part `}  >{/***********************left part hai *******************/}
                            <div className={` flex gap-[5vw]`}  >
                                <div className={`${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} dark:text-slate-100 font-serif font-semibold  `}  >
                                    {job.jobTitle} job
                                </div>
                                <div className={`${isMobile ? 'text-[3vw]' : 'text-[1vw]'} p-[0.5vw] rounded-sm text-white font-semibold ${job.jobType === 'Full Time' ? 'bg-green-400' :
                                        job.jobType === 'Part Time' ? 'bg-yellow-400' :
                                            job.jobType === 'Temporary' ? 'bg-blue-400' :
                                                job.jobType === 'Freelance' ? 'bg-red-400' : ''
                                    }`}>
                                    {job.jobType}
                                </div>
                            </div>
                            <div className={` flex text-slate-400 dark:text-slate-200 gap-[0.5vw] font-serif p-[1vw]`}  >
                                <div className={`${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} `}  >via </div>
                                <div className={` text-green-400 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} font-semibold`}  >{job.companyName}</div>
                                <WorkIcon style={{ fontSize: isMobile ? "6vw" : "2vw" }} />
                                <div className={` ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}  >{job.jobField}</div>
                            </div>
                        </div>
                        <div className={` right part ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}  >{/***********************right part hai *******************/}
                            <div className={` font-serif ${isMobile ? 'text-[4vw]' : 'text-[2vw]'} dark:text-slate-100 font-semibold`}  >Requirements :(min req.)</div><br />
                            <div className={` flex gap-[1vw] flex-wrap ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} text-blue-500 dark:text-red-700 font-semibold`}  >
                                {
                                    job.skills.map((skill, index) => (
                                        <div key={index}>{skill} |</div>
                                    ))
                                }

                            </div>

                        </div>

                    </motion.div>))}

                </div>
                <NavLink to="/JobList">
                    <div className={`bg-green-400 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} p-[1vw] m-[3vw] flex text-white font-semibold font-serif rounded-lg max-w-[12vw] hover:shadow-2xl hover:bg-green-700 align-middle justify-center `}  >
                        Show More
                    </div>

                </NavLink>
            </div>
        </div>
    )
}

export default CandidateIndex
