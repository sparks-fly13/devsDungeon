import React, { useEffect, useState } from 'react'
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileItem() {

    //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

    const isMobile = window.innerWidth <= 768;

    //for company description
    const [ description, setdescription] = useState('');

    const [loggedIn,setLoggedIn]=useState(false) //checking whether the user is logged in or nor
    const [user,setUser]=useState({})
    const [userID,setUserId]=useState("")
    const [category,setCategory]=useState('')

  //for founded
  const [founded, setfounded] = useState('');

  //for gender change
  const [gender, setSelectedGender] = useState('');

  //for phone
  const [phone, setPhone] = useState(0);

  //social Links
  const [linkedin,setLinkedin] = useState('')
  const [twitter,setTwitter] = useState('')
  const [facebook,setFacebook] = useState('')
  const [instagram,setInstagram] = useState('')

  //adresses and other
  const [address,setAddress] = useState('')


  const navigate=useNavigate();

 

  const PersonalFormSubmitted= async ()=>{
    
    const res=await axios.post('/api/employer/Dashboard/Profile',{user,founded,phone,linkedin,twitter,facebook,instagram,address,description})
    //const res=await axios.post('/api/candidate/Dashboard/Profile',{phone})
    //console.log("Result we got from backend in the Employer profile section frontend =",res)
    
    navigate('/employer/Dashboard/Profile')
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
            console.log("User data = ",user)    
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
    <form className={`flex flex-col dark:text-slate-200`}   onSubmit={PersonalFormSubmitted}>
    <div className={`flex justify-center font-serif underline ${isMobile ? 'text-[8vw]' : 'text-[3vw]'} pb-[3vw] text-green-600`}  >Profile </div>
    <div className={`right-top ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} py-[0.5vw] bg-slate-50 dark:bg-[#212734] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} my-[1vw] font-serif rounded-md border border-green-200  `}  >
        <div className={` ${isMobile ? 'text-[5vw]' : 'text-[1vw]'} pb-[3vw] text-green-600`}  ><BusinessIcon style={{fontSize:isMobile ?"6vw":"3vw",marginRight:"1vw"}}/>Basic Information (All fields are required to be filled)</div>
        <div>
            <div className={` ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} pb-[3vw] text-green-600`}  >Astreik * fields are non-editable</div>
            <div className={`Company Name `}  >
                <div>Company Name : *</div>
                <input type="text" name="" id="" value={user.companyname} readOnly className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'} dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'}  py-[0.5vw] min-w-[40vw] `}    required  pattern=".*\S+.*" placeholder='ABC Company'/>
            </div>

            <div className={`Company Email `}  >
                <div>Email Address : *</div>
                <input type="email" name="" id="" value={user.email} readOnly className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}    required pattern=".*\S+.*" placeholder='xyz@email.com'/>
            </div>

            <div className={` First Name`}  >
                <div>First Name : *</div>
                <input type="text" name="" id="" value={user.fname} readOnly className={` ${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}   required pattern=".*\S+.*" placeholder='Ram'/>
            </div>

            <div className={`Last Name `}  >
                <div>Last Name : *</div>
                <input type="text" name="" id="" value={user.lname} readOnly className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}    required pattern=".*\S+.*" placeholder='Prasad'/>
            </div>
        </div>
    </div>

    <div className={`right-middle ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} py-[0.5vw] dark:bg-[#212734] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} my-[1vw] font-serif rounded-md border border-green-200 `}  >
        <div className={`${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'} pb-[3vw] text-green-600 `}  ><PublicIcon style={{fontSize:isMobile ?"6vw":"3vw",marginRight:"1vw"}}/>Social Links</div>
        <div>
            <div className={`Linked Id `} >
                <div>Linkedin :</div>
                <input type="text" name="" id="" defaultValue={(user.linkedin)? user.linkedin:''} onChange={(e)=>setLinkedin(e.target.value)} className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}     placeholder='https//linkedin.com/'/>
            </div>

            <div className={` Twitter id`}  >
                <div>Twitter :</div>
                <input type="text" name="" id="" defaultValue={(user.twitter)?user.twitter :''} onChange={(e)=>setTwitter(e.target.value)} className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}    placeholder='https//twitter.com/'/>
            </div>

            <div className={` Facebook`}  >
                <div>Facebook :</div>
                <input type="text" name="" id="" defaultValue={(user.facebook)?user.facebook :''} onChange={(e)=>setFacebook(e.target.value)} className={` ${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw]`}     placeholder='https//facebook.com/'/>
            </div>

            <div className={`Instagram `}  >
                <div>Instagram :</div>
                <input type="text" name="" id="" defaultValue={(user.instagram)?user.instagram :''}  onChange={(e)=>setInstagram(e.target.value)} className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}     placeholder='hhtps//instagram.com/'/>
            </div>

        </div>
    </div>

    <div className={`right-lower ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} py-[0.5vw] bg-slate-50 dark:bg-[#212734] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} my-[1vw] font-serif rounded-md border border-green-200  `}  >
        <div className={`${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'} pb-[3vw] text-green-600 `} ><HomeIcon style={{fontSize:isMobile ?"6vw":"3vw",marginRight:"1vw"}}/>Address & Others</div>
        <div>
            <div className={`Address `} >
                <div>Located :</div>
                <input type="text" name="" id="" defaultValue={(user.address)?user.address :''} onChange={(e)=>setAddress(e.target.value)} className={` ${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw]`}   placeholder='Plot no.-12,Sakshi Road,Jamshedpur,India'/>
            </div>

            <div className={`Founded date `}  >
                <div>Founded :</div>
                <input type="date" name="" id="" defaultValue={user.founded} onChange={(event) => setfounded(event.target.value)} className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}   placeholder=''/>
            </div>

            <div className={` Phone`}  >
                <div>Phone :</div>
                <input type="number" name="" defaultValue={(user.phone) ?(user.phone):''} onChange={(e)=>setPhone(e.target.value)} id="" className={` ${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw]`}   placeholder='10 digit number' maxLength="10" pattern="[0-9]{10}"/>
            </div>

            <div className={`Website `}  >
                <div>Website : *</div>
                <input type="string" name="" id="" value={user.website} readOnly className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] `}   placeholder='www.abc.com'/>
            </div>

            <div className={`Company Description `}  >
                <div className={` `}  >Description :</div>
                <textarea
                defaultValue={(user.description) ? user.description:''}
                onChange={(event) => setdescription(event.target.value)}
                name="" id="" className={`${isMobile ? 'm-[1vw]' : 'm-[2vw]'}  dark:bg-[#101012] border border-gray-600 dark:border-[#753ca3] ${isMobile ? 'px-[3vw]' : 'px-[1vw]'} py-[0.5vw] min-w-[40vw] min-h-[20vh] `}   placeholder='Company description'/>
            </div>

        </div>
    </div>

    <button type="submit" className={`bg-green-500 hover:bg-green-300 dark:bg-gradient-to-r from-orange-400 to-orange-600 text-white font-serif font-medium p-[1vw] ${isMobile ? 'text-[5vw]' : 'text-[1vw]'}   rounded-md m-[3vw] flex justify-center align-middle `}  >Save Details</button>

    </form>
  )
}

export default ProfileItem
