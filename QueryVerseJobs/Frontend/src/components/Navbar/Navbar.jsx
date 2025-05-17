import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FullLogo from '../../assets/Logos/FullLogo.png';
import RectangleLogo from '../../assets/Logos/rectangle.png';
import axios from 'axios';
import Employer from '../Pages/Signin/Employer';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {

  //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

  const isMobile = window.innerWidth <= 768;

  const [loggedIn, setLoggedIn] = useState(false) //checking whether the user is logged in or nor
  const [user, setUser] = useState({})
  const [category, setCategory] = useState('')

  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navigate = useNavigate();

  const [isDropdownVisible, setDropdownVisible] = useState(false);//this is for section in login on image which opens when clicked
  const [isMenubarVisible, setMenubarVisible] = useState(false)

  const handleImageClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const Menuboxclicked = () => {
    setMenubarVisible(!isMenubarVisible)
  }

  const logOut = async () => {
    try {
      await axios.post('/api/logout')
      setLoggedIn(false)
      setUser({})
      setCategory('')
      navigate('/')

    } catch (error) {
      console.error('Logout failed', error);
    }
  }



  useEffect(() => {


    const checkForLogins = async () => {
      try {
        const res = await axios.get('/api/')
        //console.log("Printing the data which came from backend in navbar= ", res)
        if (res.data.valid) {
          // console.log("Hi i m in the if section of navbar check")
          setLoggedIn(true)
          setUser(res.data.user)
          setCategory(res.data.category)
        }
      }
      catch (error) {
        console.log("error in the navbar section frontend = ", error)
      }
    }

    if(!loggedIn) checkForLogins()

  }, [setLoggedIn,logOut])

  return (
    <div className={`mb-[5vw]  bg-gray-100 text-black dark:text-gray-200 dark:bg-[#101012]`}   >

      {/** mobile mode */}
      <div className={` bg-gray-100 dark:bg-[#101012] flex md:hidden justify-between items-center relative top-[2vw]`}   >
        <NavLink to='/'>
          {/* <img src={RectangleLogo} alt="Logo" className={`w-[30vw] ml-[1vw] rounded-md `} /> */}
          <div class="bg-gray-900 p-6 rounded-lg w-full max-w-4xl mx-auto">
                <h2 class=" font-bold text-center">
                  <span class="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">QueryVerse:</span>
                  <span class="text-gray-300">Careers and Jobs</span>
                </h2>
              </div>
        </NavLink>
        <div className='flex gap-[1vw] items-center'   >
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-2 py-2 text-[5vw] rounded-full transition duration-300"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div className={`mr-[4vw] `} onClick={Menuboxclicked}>
            <MenuIcon style={{ fontSize: "6vw", color: isDarkMode ?"white":"black" }} />
          </div>
        </div>        
      </div>

      {/* Dropdown menu for mobile*/}
      {isMenubarVisible && (
        <div className={`bg-gray-600 text-white absolute top-16 right-0 z-50 rounded-lg `}   >
          <div className={` p-4 text-[3vw] font-serif font-semibold `}   >
            <NavLink to="/">
              <div className={`py-[0.5vw] hover:text-green-500 hover:underline `} >Home</div>
            </NavLink>
            {
              loggedIn ? (
                <>
                  {
                    (category === 'candidate') ? (
                      <div className={`Profile `}   >
                        <NavLink to="/candidate/Dashboard/Profile" activeClassName={` text-green-500`} className={`py-[0.5vw] hover:text-green-500 hover:underline `}   >
                          Profile
                        </NavLink>
                      </div>
                    ) : (
                      <div className={`Profile`}   >
                        <NavLink to="/employer/Dashboard/Profile" activeClassName={`text-green-500 `} className={`py-[0.5vw] hover:text-green-500 hover:underline `}   >
                          Profile
                        </NavLink>
                      </div>
                    )}
                  {
                    (category === 'candidate') ? (
                      <NavLink to="/candidate/Dashboard">
                        <button className={`py-[0.5vw] hover:text-green-500 hover:underline `} activeClassName={`text-green-500 `}  >DashBoard</button>
                      </NavLink>
                    ) : (
                      <NavLink to="/employer/Dashboard">
                        <button className={`py-[0.5vw] hover:text-green-500 hover:underline `} activeClassName={`text-green-500 `}   >DashBoard</button>
                      </NavLink>
                    )

                  }
                  {
                    (category === 'candidate') ? (
                      <div className={` Job-list`}  >
                        <NavLink to="/jobs" activeclassName={`text-green-500 `} className={` py-[0.5vw] hover:text-green-500 hover:underline`}   >
                          Jobs
                        </NavLink>
                      </div>
                    ) : (<div className={`Job-list `}   >
                      <NavLink to="/PostaJob" activeclassName={` text-green-500`} className={`py-[0.5vw] hover:text-green-500 hover:underline `}   >
                        Post Job
                      </NavLink>
                    </div>)
                  }
                  <div className={` py-[0.5vw] hover:text-green-500 hover:underline`} onClick={logOut}>Log-Out</div>
                </>
              ) : (
                <>
                  <NavLink to='/Signin'>
                    <div className={`py-[0.5vw] hover:text-green-500 hover:underline `}   >
                      <PermIdentityIcon style={{ fontSize: '3.5vw', color: '#43a047' }} />
                      <button>Log In</button>
                    </div>
                  </NavLink>

                </>
              )
            }

          </div>
        </div>
      )}

      {/** tablet and desktop mode */}
      <div className={` hidden md:flex lg:flex `}   >
        <div className={`bg-gray-100 dark:bg-[#101012] flex p-5 justify-between items-center shadow-md fixed  w-full z-10`}   >
          <div className={` Logo`}   >
            <NavLink to='/'>
              {/* <img src={RectangleLogo} alt="Logo" className={`w-[15vw] rounded-md `} /> */}
              <div class="bg-gray-900 p-6 rounded-lg w-full max-w-4xl mx-auto">
                <h2 class=" font-bold text-center">
                  <span class="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">QueryVerse:</span>
                  <span class="text-gray-300">Careers and Jobs</span>
                </h2>
              </div>
            </NavLink>
          </div>

          <div className={` Middle`}   >
            <div className={`flex gap-[1.5vw] justify-center items-center font-semibold text-[1.5vw]  `}   >
              <div className={` Home`}   >
                <NavLink to="/" activeClassName={` text-green-500`} className={` hover:text-green-500 `}    >
                  Home
                </NavLink>
              </div>



              {
                (category === 'candidate') ? (
                  <div className={`Job-list `}  >
                    <NavLink to="/jobs" activeClassName={`text-green-500 `} className={` hover:text-green-500 `}   >
                      Jobs
                    </NavLink>
                  </div>
                ) : (<div>

                </div>)

              }





              {
                loggedIn ? (
                  (category === 'candidate') ? (
                    <div className={`Profile `}   >
                      <NavLink to="/candidate/Dashboard/Profile" activeClassName={`text-green-500 `} className={` hover:text-green-500 `}   >
                        Profile
                      </NavLink>
                    </div>
                  ) : (
                    <div className={`Profile `}   >
                      <NavLink to="/employer/Dashboard/Profile" activeClassName={` text-green-500`} className={` hover:text-green-500 `}   >
                        Profile
                      </NavLink>
                    </div>
                  )
                ) : (
                  <div></div>
                )
              }


            </div>
          </div>{/* middle */}

          <div className={`side Logins flex gap-[1.5vw] justify-end text-[1.5vw] `}   >
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-2 py-2 text-[2vw] rounded-full transition duration-300"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            {
              
              //${user.name.charAt(0)}
              loggedIn ? (
                <div className={`relative `}   >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.fname.charAt(0)}&background=random&size=800`}
                    alt="image"
                    className={` max-w-[4vw] rounded-full cursor-pointer border-2 border-green-500`}
                    onClick={handleImageClick}
                  />

                  {isDropdownVisible && (
                    <div className={`absolute top-[100%] mx-0 left-0 mt-1 p-[1vw] rounded-md bg-gray-100 shadow-md border border-green-300 `}   >
                      <div className={` font-serif font-medium min-w-[15vw] text-slate-600 text-[1.25vw]`}   >


                        <div>
                          {
                            (category === 'candidate') ? (
                              <NavLink to="/candidate/Dashboard">
                                <button className={`hover:underline hover:text-green-400 pb-[1vw] `}   onClick={handleImageClick}>DashBoard</button>
                              </NavLink>
                            ) : ""

                          }
                          {
                            (category === 'employer') ? (
                              <NavLink to="/employer/Dashboard">
                                <button className={`hover:underline hover:text-green-400 pb-[1vw] `}   onClick={handleImageClick}>DashBoard</button>
                              </NavLink>
                            ) : ""
                          }


                        </div>


                        <div>
                          <button className={`hover:underline hover:text-green-400 pb-[1vw] `} onClick={logOut}>
                            Log Out
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink to="/Signin">
                    <div className={` Signin p-[0.75vw] rounded-md font-bold`}   >
                      <PermIdentityIcon style={{ fontSize: '3.5vw', color: '#43a047' }} />
                      <button>Log In</button>
                    </div>
                  </NavLink>

                  {/* {//ismei hmko abhi redirect krke employer ho ya employee uske liye ek login type banayenge 
                navigate("/")
              } */}
                </>

              )}

            {
              (category === 'employer') ? (
                <NavLink to="/PostaJob">
                  <div className={`Post_a_Job bg-green-700 dark:bg-gradient-to-r from-orange-400 to-orange-600 p-[0.75vw] rounded-md text-white font-bold hover:bg-green-600 text-[1.5vw] `}   >
                    <WorkOutlineIcon style={{ fontSize: '2vw' }} />
                    Post a Job
                  </div>
                </NavLink>
              ) : (
                <div></div>
              )
            }
            {
              (category === 'candidate') ? (
                <NavLink to="/jobs">
                  <div className={` Apply_a_Job bg-green-700 dark:bg-gradient-to-r from-orange-400 to-orange-600 p-[0.75vw] rounded-md text-white font-bold hover:bg-green-600 text-[1.5vw]`}   >
                    <WorkOutlineIcon style={{ fontSize: '2vw' }} />
                    Apply a Job
                  </div>
                </NavLink>
              ) : (
                <div></div>
              )
            }



          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
