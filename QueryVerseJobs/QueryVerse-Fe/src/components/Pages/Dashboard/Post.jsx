import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Post() {

  const navigate=useNavigate();

  //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

  const isMobile = window.innerWidth <= 768;

    const [loggedIn,setLoggedIn]=useState(false) //checking whether the user is logged in or nor
    const [user,setUser]=useState({})
    const [userID,setUserId]=useState("")
    const [category,setCategory]=useState('')

  //company-name
  const [company,setCompany]=useState('')

  //job title
  const [jobtitle,setJobtitle]=useState('')

  //job details
  const [jobdescription,setJobdescription]=useState('')

  //job fields
  const [field,setField]=useState('')
 
  //category selection
  const [selectedCategory, setSelectedCategory] = useState('');

  //experience
  const [experience,setExperience]=useState(0);

  const [post,setPost]=useState(1);

  //salary
  const [salary,setSalary]=useState(0)

  //job type selection
  const [selectedType, setSelectedType] = useState('');

  //locations addition
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value);
  };

  const handleAddLocation = () => {
    if (newLocation.trim() !== '') {
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (index) => {
    setLocations((prevLocations) => [...prevLocations.slice(0, index), ...prevLocations.slice(index + 1)]);
  };

  //skills addition
  const [skills, setSkills] = useState([]);
  const [newSkills, setNewSkills] = useState('');

  const handleSkillChange = (event) => {
    setNewSkills(event.target.value);
  };

  const handleAddSkill = () => {
    if (newSkills.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, newSkills]);
      setNewSkills('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => [...prevSkills.slice(0, index), ...prevSkills.slice(index + 1)]);
  };




  const formSubmitted=async ()=>{

    const res=await axios.post('/api/employer/postingjob',{company,jobtitle,jobdescription,field,selectedCategory,experience,salary,selectedType,locations,skills,post})

    console.log("The result we got from backend in post section in frontend =",res)

    if(res.data.status === 500 || res.data.status === 422){
      toast.warn(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } 
    else if(res.data.status === 201){
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/")
    }
    else{
      console.log("Error in creating the employer account in signup section of employer")
    }
  }


  useEffect(()=>{
    const checkForLogins =async ()=>{
      try {
        const res=await axios.get('/api/')
        //console.log("Result which we got from backend =",res)

        if(res.data.valid){
            setLoggedIn(true)
            setUserId(res.data.user._id)
            //console.log("User id 1= ",userId)
            setCategory(res.data.category)
            const res2=await axios.post('/api/employer/EmployerData',{userID})
            //console.log("I got the data of employer from backend using user id",res2)
            setUser(res2.data)
            setCompany(user.companyname)
            //console.log("User data = ",user)    
        }
        else{
            navigate('/signin')
        }
      }
      catch (error) {
        console.log("error in the employer profile section frontend = ",error)
      }
    }

    checkForLogins()
  },[loggedIn,user])

  return (
    <form onSubmit={formSubmitted}>
      <div className={`flex justify-center font-serif font-semibold underline ${isMobile ? 'text-[8vw]' : 'text-[3vw]'} pb-[3vw] text-green-600`} >Post a Job</div>
      <div  className={`right-top  ${isMobile ? 'text-[5vw]' : 'text-[1vw]'} py-[0.5vw] bg-slate-50 dark:bg-[#212734] dark:text-slate-200 p-[1vw] m-[1vw] font-serif rounded-md border border-green-200  `}  >
        <div  className={`${isMobile ? 'text-[7vw]' : 'text-[1.5vw]'} pb-[3vw] text-green-600 `}  >Job Details</div>
        <div>
            <div  className={` Company Name`}  >
                <div>Company Name :</div>
                <input type="text" name="" id="" value={user.companyname}  className={`m-[2vw] border-gray-600 dark:bg-[#101012] border  dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] `}    required  pattern=".*\S+.*" placeholder='ABC Company'/>
            </div>

            <div  className={`Job Title `}  >
                <div>Job Title :</div>
                <input type="text" name="" id="" defaultValue={jobtitle} onChange={(e)=>setJobtitle(e.target.value)}  className={`m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] `}    required pattern=".*\S+.*" placeholder='Software Engineer'/>
            </div>

            <div  className={`Job Detail `}  >
                <div>Details :</div>
                <textarea  defaultValue={jobdescription} onChange={(e)=>setJobdescription(e.target.value)}  className={` m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] min-h-[20vh] relative left-[2vw]`}    required pattern=".*\S+.*" placeholder='Job related Details'/>
            </div>

            <div  className={`Job Field `}  >
                <div>Job Field :</div>
                <input type="text" name="" id="" defaultValue={field} onChange={(e)=>setField(e.target.value)}  className={` m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] `}   required pattern=".*\S+.*" placeholder='Development, Marketing, etc'/>
            </div>

            <div  className={` JobCategory `}  >
              <div>Job Category:</div>
              <div  className={`relative ${isMobile ? 'left-[7vw]' : 'left-[5vw]'} `} >
                            {/* Accountancy radio button */}
                            <div>
                            <input
                              type="radio"
                              id="accountancy"
                              name="jobCategory"
                              value="Accountancy"
                              checked={selectedCategory === 'Accountancy'}
                              onChange={() => setSelectedCategory('Accountancy')} />
                            <label htmlFor="accountancy"  className={` p-[1vw]`}  >Accountancy</label>
                          </div>

                          {/* Engineering radio button */}
                          <div>
                            <input
                              type="radio"
                              id="engineering"
                              name="jobCategory"
                              value="Engineering"
                              checked={selectedCategory === 'Engineering'}
                              onChange={() => setSelectedCategory('Engineering')}
                            />
                            <label htmlFor="engineering"  className={` p-[1vw]`}  >Engineering</label>
                          </div>

                          {/* Health and care radio button */}
                          <div>
                            <input
                              type="radio"
                              id="healthCare"
                              name="jobCategory"
                              value="Health & Care"
                              checked={selectedCategory === 'Health & Care'}
                              onChange={() => setSelectedCategory('Health & Care')}
                            />
                            <label htmlFor="healthCare"  className={`p-[1vw] `}  >Health & Care</label>
                          </div>

                          {/* Purchasing radio button */}
                          <div>
                            <input
                              type="radio"
                              id="purchasing"
                              name="jobCategory"
                              value="Purchasing"
                              checked={selectedCategory === 'Purchasing'}
                              onChange={() => setSelectedCategory('Purchasing')}
                            />
                            <label htmlFor="purchasing"  className={`p-[1vw] `}  >Purchasing</label>
                          </div>

                          {/* Purchasing radio button */}
                          <div>
                            <input
                              type="radio"
                              id="Salesmarketing"
                              name="jobCategory"
                              value="Sales & Marketing"
                              checked={selectedCategory === 'Sales & Marketing'}
                              onChange={() => setSelectedCategory('Sales & Marketing')}
                            />
                            <label htmlFor="Salesmarketing"  className={`p-[1vw] `}  >Sales & Marketing</label>
                          </div>

              </div>
            </div>

          <div  className={` Experience`} >
                <div>Experience Req. :</div>
                <input type="number" name="" id=""  onChange={(e)=>setExperience(e.target.value)}  className={`m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]  `}   required placeholder='5'/>
            </div>

          <div  className={`Posts `} >
                <div>Total positions :</div>
                <input type="number" name="" id="" onChange={(e)=>setPost(e.target.value)}  className={`m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]  `}   required placeholder='5'/>
          </div>

            <div  className={`Salary Offered `}  >
                <div>Salary :</div>
                <input type="number" name="" id="" onChange={(e)=>setSalary(e.target.value)}   className={`m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] `}   required placeholder='400000'/>
            </div>


            <div  className={`JobType flex `}  >
              <div>Job Type:</div>
              <div  className={`relative left-[6.5vw] `}  >
                            {/* Full time radio button */}
                            <div>
                            <input
                              type="radio"
                              id="fulltime"
                              name="jobType"
                              value="Full Time"
                              checked={selectedType === 'Full Time'}
                              onChange={() => setSelectedType('Full Time')}
                              
                            />
                            <label htmlFor="fulltime"  className={`p-[1vw] `}  >Full Time</label>
                          </div>

                          {/* Part Time radio button */}
                          <div>
                            <input
                              type="radio"
                              id="parttime"
                              name="jobType"
                              value="Part Time"
                              checked={selectedType === 'Part Time'}
                              onChange={() => setSelectedType('Part Time')}
                            />
                            <label htmlFor="parttime"  className={`p-[1vw] `}  >Part Time</label>
                          </div>

                          {/* Temporary radio button */}
                          <div>
                            <input
                              type="radio"
                              id="temporary"
                              name="jobType"
                              value="Temporary"
                              checked={selectedType === 'Temporary'}
                              onChange={() => setSelectedType('Temporary')}
                            />
                            <label htmlFor="temporary"  className={`p-[1vw] `}  >Temporary</label>
                          </div>

                          {/* Freelance radio button */}
                          <div>
                            <input
                              type="radio"
                              id="freelance"
                              name="jobType"
                              value="Freelance"
                              checked={selectedType === 'Freelance'}
                              onChange={() => setSelectedType('Freelance')}
                            />
                            <label htmlFor="freelance"  className={`p-[1vw] `}  >Freelance</label>
                          </div>
              </div>
            </div>

            <div  className={`Location `}  >
              <div>Locations:</div>

              {/* Input for adding locations */}
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                   className={` m-[2vw]  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]`}  
                  pattern=".*\S+.*"
                  placeholder='Enter location'
                  value={newLocation}
                  onChange={handleLocationChange}
                />
                <button type="button" onClick={handleAddLocation}  className={`p-[1vw] text-white m-2 bg-green-400 font-extrabold rounded-full relative left-[1vw] `}  >+</button>
              </div>

              {/* Display selected locations */}
              <div className={`p-1`}>
                {locations.map((location, index) => (
                  <div key={index}  className={` flex gap-2 ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} font-serif font-semibold relative left-[4vw] `}  >
                    {location}{' '}
                    <button type="button" onClick={() => handleRemoveLocation(index)}  className={`p-[0.5vw] mb-1 bg-red-500 text-white font-extrabold rounded-md `}  >
                      Remove
                    </button>
                  </div>
        ))}
      </div>
            </div>

            <div  className={` Skills`}  >
              <div>Skills:</div>

              {/* Input for adding Skills */}
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                   className={`m-[2vw] border-gray-600 dark:bg-[#101012] border dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] `}  
                  pattern=".*\S+.*"
                  placeholder='Enter Skill'
                  value={newSkills}
                  onChange={handleSkillChange}
                />
                <button type="button" onClick={handleAddSkill}  className={`p-[1vw] text-white m-2 bg-green-400 font-extrabold rounded-full relative left-[1vw] `}  >+</button>
              </div>

              {/* Display selected locations */}
              <div>
                {skills.map((skill, index) => (
                  <div key={index}  className={`${isMobile ? 'text-[4vw]' : 'text-[1vw]'} font-serif font-semibold relative left-[4vw] `}  >
                    {skill}{' '}
                    <button type="button" onClick={() => handleRemoveSkill(index)}  className={`p-[0.5vw] mb-1 bg-red-500 text-white font-extrabold rounded-md `}  >
                      Remove
                    </button>
                  </div>
        ))}
      </div>
            </div>

        </div>
    </div>

    <div>
      <button type="submit"  className={` bg-green-500 text-white ${isMobile ? 'text-[4vw]' : 'text-[1.vw]'} font-serif font-semibold hover:bg-green-300 p-[1vw] rounded-md flex justify-center mb-[10vw] mt-[2vw]`}  >Post the Job</button>
    </div>
    </form>
  )
}

export default Post
