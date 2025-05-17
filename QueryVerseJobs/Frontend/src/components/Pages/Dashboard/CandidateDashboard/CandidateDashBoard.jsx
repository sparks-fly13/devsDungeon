import React, { useEffect, useState } from 'react'
import CandidateDashItem from './CandidateDashItem';
import CandidateProfile from './CandidateProfile';
import Apply from '../../Apply/Apply'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CandidateDashBoard() {

    const isMobile = window.innerWidth <= 768;

    const [loggedIn, setLoggedIn] = useState(false) //checking whether the user is logged in or nor
    const [user, setUser] = useState({})
    const [category, setCategory] = useState('')
    const navigate = useNavigate()


    const location = useLocation();
    const isCandidateDashboard = location.pathname === '/candidate/Dashboard';
    const isCandidateProfile = location.pathname === '/candidate/Dashboard/Profile';

    const logout = async () => {
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
        const rf = async () => {
            const result = await axios.get('/api/')
            if (result.data.valid) {
                console.log("result =", result.data.user)
                setUser(result.data.user)
            }
            else {
                navigate('/')
            }
        }
        rf()

    }, [])


    return (
        <div className='bg-gray-100 dark:bg-[#101012]'>
            <div className={`${isMobile ? 'm-[2vw]' : 'm-[10vw]'} flex`}>
                <div className='Left relative top-[8vw] hidden md:block sm:text-[3vw] md:text-[1.5vw] bg-slate-50 dark:bg-[#212734] dark:text-slate-200 p-[1vw] m-[1vw] rounded-md max-h-[25vw] border border-green-200 '>
                    <div className='User-name text-green-600 font-serif font-bold text-[1.5vw] flex justify-center align-middle'>
                        {user.fname}
                    </div>
                    <div className='section p-[1vw] text-[1.1vw] font-serif font-medium'>
                        <NavLink to="/candidate/Dashboard" >
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md'>
                                DashBoard
                            </div>
                        </NavLink>

                        <NavLink to="/candidate/Dashboard/Profile">
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md'>
                                Profile
                            </div>
                        </NavLink>

                        <NavLink to="/JobList">
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md'>
                                Apply New Job
                            </div>

                        </NavLink>
                        <NavLink to="">
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md' onClick={logout}>
                                Log Out
                            </div>

                        </NavLink>
                    </div>
                </div>

                {
                    isCandidateDashboard && (<CandidateDashItem />)
                }
                {
                    isCandidateProfile && (<CandidateProfile />)
                }

            </div>
        </div>
    )
}

export default CandidateDashBoard
