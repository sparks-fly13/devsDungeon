import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CandidateProfile() {

  const isMobile = window.innerWidth <= 768;

  const navigate = useNavigate();


  const [loggedIn, setLoggedIn] = useState(false) //checking whether the user is logged in or nor
  const [user, setUser] = useState({})
  const [userID, setUserId] = useState('')
  const [category, setCategory] = useState('')

  //file value
  const [file, setFile] = useState()

  //for personal description
  const [description, setDescription] = useState('');

  //for dob
  const [dateOfBirth, setDateOfBirth] = useState('');

  //for gender change
  const [gender, setSelectedGender] = useState('');

  //for phone
  const [phone, setPhone] = useState(0);

  //social Links
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')

  //adresses and other
  const [address, setAddress] = useState('')

  const PersonalFormSubmitted = async (event) => {

    console.log("I got into Personal Form submission")
    try {
      const formData = new FormData();
      formData.append('File', file); // Assuming 'file' is the file object you want to upload
      for (const key in user) { formData.append(`user[${key}]`, user[key]); } // Assuming 'user' is an object containing user data
      formData.append('description', description);
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('linkedin', linkedin);
      formData.append('twitter', twitter);
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);
      formData.append('address', address);
      formData.append('dateOfBirth', dateOfBirth);

      console.log("File name =................................................................................................................................", file)
      const res = await axios.post('/api/candidate/Dashboard/Profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Important: Set the content type to multipart/form-data
        }
      });



      console.log("Result we got from backend in the candidate profile section frontend =", res);
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  const crossClicked = () => {
    console.log("cross got clicked")
    setFile("")
    PersonalFormSubmitted()

  }


  useEffect(() => {


    const checkForLogins = async () => {
      try {
        const res = await axios.get('/api/')
        //console.log("Result which we got from backend =",res)

        if (res.data.valid) {
          setLoggedIn(true)

          setUserId(res.data.user._id)
          //console.log("User id 1= ",userId)
          setCategory(res.data.category)
          const res2 = await axios.post('/api/candidate/CandidateData', { userID })
          //console.log("I got the data of candidate from backend using user id",res2)
          setUser(res2.data)
          //console.log("User data = ",user)
          if (user.resume) {
            setFile(user.resume)
          }
        }
        else {
          navigate('/signin')
        }
      }
      catch (error) {
        console.log("error in the candidate profile section frontend = ", error)
      }
    }

    checkForLogins()


  })



  return (

    <form className='flex flex-col dark:text-slate-200' enctype="multipart/form-data" onSubmit={PersonalFormSubmitted}>
      <div className={`flex justify-center font-serif font-semibold underline ${isMobile ? 'text-[8vw]' : 'text-[3vw]'} pb-[3vw] text-green-600`} >Profile</div>


      <div className='right-top  py-[0.5vw] bg-slate-50 dark:bg-[#212734] p-[1vw] m-[1vw] font-serif rounded-md border border-green-200 sm:text-[3vw] md:text-[1vw] '>
        <div className='sm:text-[3vw] md:text-[1.5vw] pb-[3vw] text-green-600 '><PersonIcon style={{ fontSize: "3vw", marginRight: "1vw" }} />Personal Information (All fields are required to be filled)</div>
        <div>
          <div className='sm:text-[3vw] md:text-[1.5vw] pb-[3vw] text-green-600'>Astreik * fields are non-editable</div>
          <div></div>
          <div className='First Name'>
            <div>First Name : *</div>
            <input type="text" name="" id="" value={user.fname} className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw] ' required pattern=".*\S+.*" readOnly />
          </div>

          <div className='Second Name'>
            <div>Second Name : *</div>
            <input type="text" name="" id="" value={user.lname} className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' required pattern=".*\S+.*" readOnly />
          </div>

          <div className='DOB'>
            <div>Date of Birth :</div>
            <input type="date" name="" id="" defaultValue={user.dob} className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' onChange={(event) => setDateOfBirth(event.target.value)} placeholder='' />
          </div>

          <div className='Candidate Email'>
            <div>Email Address : *</div>
            <input type="email" name="" id="" value={user.email} className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' required pattern=".*\S+.*" readOnly />
          </div>

          <div className='Phone'>
            <div>Phone : </div>

            <input type="tel" name="" id="" defaultValue={(user.phone) ? user.phone : ''} className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' placeholder='10 digit number' minLength="10" maxLength="10" pattern="[0-9]{10}" onChange={(e) => setPhone(e.target.value)} />

          </div>

          <div className='Resume font-serif'>
            <div>Resume : </div>
            {
              (user.resume) ?
              
              (<div className='p-[2vw]'>
                <DescriptionIcon style={{ fontSize: isMobile ? '10vw' : '7vw' }} />

                <div className={`relative ${isMobile ? 'bottom-[10vw]' : 'bottom-[8vw]'} ${isMobile ? 'ml-[10vw]' : 'ml-[5vw]'} `} onClick={crossClicked}>
                  <ClearIcon style={{ fontSize: isMobile ? '5vw' : '2vw' }} className='hover:bg-slate-400' />
                </div>
                <div className={`${isMobile ? 'text-[2.5vw]' : 'text-[1vw]'} ${isMobile ? 'pl-[1vw]' : ''}`}>resume</div>
              </div>)
               :
              (<div><input type='file' name="File" onChange={(e) => setFile(e.target.files[0])} className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] relative left-[2vw]' />
              </div>)
            }
          </div>

          <div className='Personal Description'>
            <div >Description :</div>
            <textarea
              defaultValue={(user.description) ? (user.description) : ''}
              onChange={(e) => setDescription(e.target.value)}
              name="" id="" className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] min-h-[20vh] relative left-[2vw]' placeholder='Personal description' />
          </div>
        </div>
      </div>

      <div className='right-middle sm:text-[3vw] md:text-[1vw] py-[0.5vw] bg-slate-50 dark:bg-[#212734] p-[1vw] m-[1vw] font-serif rounded-md border border-green-200 '>
        <div className='sm:text-[3vw] md:text-[1.5vw] pb-[3vw] text-green-600'><PublicIcon style={{ fontSize: "3vw", marginRight: "1vw" }} />Social Links</div>
        <div>
          <div className='Linked Id'>
            <div>Linkedin :</div>
            <input type="text" name="" id="" className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' defaultValue={(user.linkedin) ? user.linkedin : ''} onChange={(e) => setLinkedin(e.target.value)} placeholder='https//linkedin.com/' />
          </div>

          <div className='Twitter id'>
            <div>Twitter :</div>
            <input type="text" name="" id="" className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' defaultValue={(user.twitter) ? user.twitter : ''} onChange={(e) => setTwitter(e.target.value)} placeholder='https//twitter.com/' />
          </div>

          <div className='Facebook'>
            <div>Facebook :</div>
            <input type="text" name="" id="" className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' defaultValue={(user.facebook) ? user.facebook : ''} onChange={(e) => setFacebook(e.target.value)} placeholder='https//facebook.com/' />
          </div>

          <div className='Instagram'>
            <div>Instagram :</div>
            <input type="text" name="" id="" className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' defaultValue={(user.instagram) ? user.instagram : ''} onChange={(e) => setInstagram(e.target.value)} placeholder='hhtps//instagram.com/' />
          </div>

        </div>
      </div>

      <div className='right-lower sm:text-[3vw] md:text-[1vw] py-[0.5vw] bg-slate-50 dark:bg-[#212734] p-[1vw] m-[1vw] font-serif rounded-md border border-green-200 '>
        <div className=' sm:text-[3vw] md:text-[1.5vw] pb-[3vw] text-green-600'><HomeIcon style={{ fontSize: "3vw", marginRight: "1vw" }} />Address & Others</div>
        <div>
          <div className='Address'>
            <div>Address :</div>
            <input type="text" name="" id="" className='m-[2vw] dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] px-[1vw] py-[0.5vw] min-w-[40vw] relative left-[2vw]' defaultValue={(user.address) ? user.address : ''} onChange={(e) => setAddress(e.target.value)} placeholder='Plot no.-12,Sakshi Road,Jamshedpur,India' />
          </div>
        </div>
      </div>

      <button type="submit" className='bg-green-500 hover:bg-green-300 text-white font-serif font-medium p-[1vw] sm:text-[3vw] md:text-[1.5vw] max-w-[15vw] rounded-md m-[3vw] flex justify-center align-middle'>Save Details</button>

    </form>
  )
}

export default CandidateProfile
