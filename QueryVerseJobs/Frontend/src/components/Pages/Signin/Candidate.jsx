import React, { useState } from "react";
import FullLogo from "../../../assets/Logos/FullLogo.png"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Candidate() {

  //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

  const isMobile = window.innerWidth <= 768;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginClicked = async (e) => {
    e.preventDefault();

    try {
      console.log("Going inside backend of Candidate login to check credentials.....");
      //console.log(username, password);

      const res = await axios.post('/api/candidate/Login', { username, password });

      console.log("Results which came from backend into candidate candidate signin section frontend =", res.data);

      if (res.data.status === 422 || res.data.status === 500 || res.data.status === 407) {
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

      else if (res.data.status === 201) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate('/');

      }

      else {
        console.log("Error in Login of the Candidate account frontend ");
      }
    } catch (error) {
      console.error("Error occured in Login section of candidate in frontend :", error);
    }
  };


  return (
    <>
      <div className={`flex justify-center align-middle bg-gray-300`} >
        <div class="right flex flex-col justify-center items-center  max-h-[100rem] min-w-[100vw] sm:min-w-0">

          <div className={`my-[5vw] mx-[5vw] rounded-lg bg-white border-[0.2vw] border-green-400 max-h-[80vh] p-[1vw] shadow-2xl shadow-black `} >
            <div className={`flex justify-center items-center ${isMobile ? 'text-[6vw]' : 'text-[3vw]'} font-serif font-bold text-green-500 m-[2vw]`} >
              Login
            </div>

            <div className={` justify-center items-center  ${isMobile ? 'text-[4vw]' : 'text-[1.3vw]'} font-serif font-bold m-8 `}>
              Providing opportunities you are searching for
            </div>

            <div className={`ml-[2vw] ${isMobile ? 'text-[3.5vw]' : 'text-[1vw]'} font-serif font-semibold relative top-[2vw] text-green-600 `} >Please Login to your account<ArrowForwardIcon style={{ fontSize: isMobile ? "5vw" : "2vw", marginLeft: "1vw" }} /></div>

            <form onSubmit={LoginClicked}>
              <div className={` User Name`} >
                <input type="text" name="" id="" className={` m-[2vw]  ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} rounded-md border border-gray-600 px-[1vw] py-[0.5vw] min-w-[30vw] relative left-[0.55vw] top-[2vw]`} onChange={(e) => setUsername(e.target.value)} required pattern=".*\S+.*" placeholder='Username' />
              </div>

              <div className={`password `} >
                <input type="password" name="" id="" className={`m-[2vw] ${isMobile ? 'text-[4vw]' : 'text-[1.1vw]'} rounded-md border border-gray-600 px-[1vw] py-[0.5vw] min-w-[30vw] relative left-[0.55vw] `}
                  onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
              </div>

              <button type="submit" className={`m-[1vw] rounded-lg flex text-white font-semibold ${isMobile ? 'text-[4vw]' : 'text-[1vw]'} bg-green-500 p-[1vw] px-[13.5vw] max-w-[30vw] justify-center align-middle relative left-[1.5vw] hover:bg-green-400 `} >Login</button>
            </form>


          </div>
          <div className={`flex font-serif gap-3 ${isMobile ? 'p-[5vw]' : 'p-[1.5vw]'} justify-evenly align-middle text-gray-700 `} >
            <div className={`  ${isMobile ? 'text-[3.5vw]' : 'text-[1.5vw]'} font-semibold`} >Don't have an account ?</div>
            <NavLink to="/signup/candidate">
              <button className={` ${isMobile ? 'text-[3.5vw]' : 'text-[1vw]'} rounded-lg font-semibold border-2 text-pink-600 border-pink-600 p-[1vw] hover:bg-gray-300 `} >Register Now</button>
            </NavLink>

          </div>
        </div>
      </div>
    </>
  )
}

export default Candidate