import React, { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CategoryIcon from '@mui/icons-material/Category';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetail() {
  const isMobile = window.innerWidth <= 768;

  const [jobProfile, setJobProfile] = useState({});
  const [unsplashImageUrl, setUnsplashImageUrl] = useState('');
  const { jobID } = useParams();

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const queries = ['office', 'corporate', 'business', 'workplace', 'company building', 'job interview'];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  useEffect(() => {
    const getJobData = async () => {
      try {
        const result = await axios.post('/api/getJobData', { jobID });
        setJobProfile(result.data.Data[0]);
      } catch (err) {
        console.error('Error fetching job data:', err);
      }
    };

    getJobData();
  }, [jobID]);

  useEffect(() => {
    const fetchUnsplashImage = async () => {
      try {
        const res = await axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${randomQuery}`);
        setUnsplashImageUrl(res.data.urls.small);
      } catch (err) {
        console.error('Error fetching Unsplash image:', err);
      }
    };

    fetchUnsplashImage();
  }, []);

  return (
    <div className={`max-w-screen-2xl mx-auto`}>
      <div className={`flex justify-center font-serif underline ${isMobile ? 'text-[8vw]' : 'text-[3vw]'} pb-[3vw] text-green-600 relative top-[3vw]`}>
        <WorkIcon style={{ fontSize: isMobile ? "10vw" : '5vw' }} />
        Description of Job
      </div>

      <div className={`Detail-box-Upper-Part bg-gray-100 dark:bg-[#212734] border dark:border-green-600 ${isMobile ? 'm-[0vw]' : 'm-[10vw]'} ${isMobile ? 'p-[0vw]' : 'p-[5vw]'}  rounded-md`}>
        <div className={`flex gap-[2vw]`}>
          <div className={`left`}>
            {unsplashImageUrl && (
              <img src={unsplashImageUrl} alt="Job visual" className={`object-cover w-auto ${isMobile ? 'h-[15vw]' : 'md:h-64'} rounded-full sm:rounded-none lg:rounded-md xl:rounded-lg`} />
            )}
          </div>
          <div className={`right flex flex-col gap-[5vw]`}>
            <div className={`uppercase text-green-500 dark:text-gray-300 flex justify-center align-middle ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} font-serif font-bold`}>
              {jobProfile.companyName}
            </div>
            <div className={`flex flex-col gap-[1vw]`}>
              <div className={`font-serif font-semibold ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} dark:text-gray-400`}>
                Job Role <EngineeringIcon style={{ fontSize: '2.5vw' }} /> : <span className="text-green-500">{jobProfile.jobTitle}</span>
              </div>
              <div className={`font-serif font-semibold dark:text-gray-400 flex gap-[1vw] ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}>
                Experience <WorkIcon style={{ fontSize: '2vw' }} />:<span className="text-green-500">{jobProfile.experienceRequired}</span><span className="text-green-500"> years</span>
              </div>
              <div className={`font-serif font-semibold dark:text-gray-400 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}>
                Category <CategoryIcon style={{ fontSize: '2.5vw' }} /> : <span className="text-green-500">{jobProfile.category}</span>
              </div>
              <div className={`font-serif font-semibold dark:text-gray-400 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}>
                Salary <CurrencyRupeeIcon style={{ fontSize: '2vw' }} />:<span className="text-green-500">{jobProfile.salaryOffered}</span>
              </div>
              <div className={`flex flex-col sm:flex-row md:flex-row gap-[1vw] align-middle`}>
                <LocationCityIcon style={{ fontSize: '2.5vw', color: '#4caf50' }} />
                <div>
                  {jobProfile.location && jobProfile.location.map((city, index) => (
                    <div key={index} className={`bg-gray-50 border border-green-400 dark:bg-gray-500 rounded-xl p-[0.5vw] dark:text-gray-200 ${isMobile ? 'text-[3vw]' : 'text-[1vw]'}`}>
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`Detail-box-Upper-Part flex flex-col max-w-screen-2xl mx-auto bg-gray-100 dark:bg-slate-900 ${isMobile ? 'm-[0vw]' : 'm-[10vw]'} ${isMobile ? 'py-[5vw]' : 'py-[10vw]'} ${isMobile ? 'pl-[5vw]' : 'pl-[10vw]'} rounded-md`}>
        <div className={`text-green-400 font-serif font-bold ${isMobile ? 'text-[4vw]' : 'text-[2vw]'}`}>Job Description :</div>
        <div className={`font-serif dark:text-slate-200 ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}>{jobProfile.jobDetail}</div>

        <div className={`text-green-400 font-serif font-bold ${isMobile ? 'text-[4vw]' : 'text-[2vw]'}`}>Total Posts :</div>
        <div className={`font-serif dark:text-slate-200 ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}>{jobProfile.posts}</div>

        <div className={`text-green-400 font-serif font-bold ${isMobile ? 'text-[4vw]' : 'text-[2vw]'} py-[0.5vw]`}>Responsibilities :</div>
        <div className={`font-serif`}>
          <ul className={`dark:text-slate-200 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}>
            {[
              'Effectively communicate with team members, clients, and other stakeholders.',
              'Collaborate with team members to achieve common goals.',
              'Learn new skills and technologies as needed.',
              'Adapt to changes in the work environment or industry.',
              'Maintain a high level of professionalism in all interactions.',
              'Uphold company values and adhere to workplace policies.',
              'Keep workspaces organized and maintain accurate records.',
              'Seek opportunities for professional development.',
              'Prioritize customer satisfaction and provide excellent service.',
              'Uphold ethical standards and conduct business with integrity.',
              'Ensure compliance with company policies and relevant regulations.',
              'Take initiative in identifying and addressing challenges.',
              'Proactively contribute to the achievement of team and organizational goals.',
              'Strive for excellence in the quality of work produced.',
              'Pay attention to detail and deliver high-quality outcomes.'
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`text-green-400 font-serif font-bold ${isMobile ? 'text-[4vw]' : 'text-[2vw]'} ${isMobile ? 'py-[3vw]' : 'py-[0.5vw]'}`}>Key Skills :</div>
        <div className={`flex flex-col sm:flex-row md:flex-row gap-[1vw] align-middle font-serif`}>
          <div className={`flex ${isMobile ? 'gap-[3vw]' : 'gap-[0.2vw]'}`}>
            {jobProfile.skills && jobProfile.skills.map((skill, idx) => (
              <div key={idx} className={`bg-gray-50 border border-green-400 dark:bg-gray-500 dark:text-gray-200 rounded-xl ${isMobile ? 'p-[3vw]' : 'p-[0.5vw]'} ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'}`}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`flex align-middle justify-center`}>
        <NavLink to={`/Apply/${jobID}`}>
          <div className={`bg-green-400 dark:bg-gradient-to-r from-orange-400 to-orange-600 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} p-[1vw] m-[3vw] flex text-white font-semibold font-serif rounded-lg max-w-[12vw] hover:shadow-2xl hover:bg-green-700 align-middle justify-center`}>
            Apply Now
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default JobDetail;
