import React, { useEffect, useState } from 'react'
import DashboardItem from './DashboardItem';
import ProfileItem from './ProfileItem';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Post from './Post';
import axios from 'axios';

function EmployerDashBoard() {

    const isMobile = window.innerWidth <= 768;

    const navigate = useNavigate();

    const [company, setCompany] = useState('')

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

    const location = useLocation();
    const isEmployerDashboard = location.pathname === '/employer/Dashboard';
    const isEmployerProfile = location.pathname === '/employer/Dashboard/Profile';
    const isEmployerPostJob = location.pathname === '/PostaJob';

    useEffect(() => {
        const getUser = async () => {
            const result = await axios.get('/api/')
            //console.log(result.data.user.companyname)
            setCompany(result.data.user.companyname)
        }
        getUser()
    })

    return (
        <div className='bg-gray-100 dark:bg-[#101012] text-[1vw]'>
            <div className='m-[10vw] flex '>
                <div className='Left bg-slate-50 dark:bg-[#212734] dark:text-slate-200 p-[1vw] m-[1vw] rounded-md max-w-auto max-h-[25vw] border border-green-200 hidden md:block relative top-[12.5vw]'>
                    <div className='Company-name flex justify-center align-middle text-green-500 font-serif font-bold text-[1.5vw]'>
                        {company}
                    </div>
                    <div className='section p-[1vw] text-[1.1vw] font-serif font-medium'>
                        <NavLink to="/employer/Dashboard" >
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md'>
                                DashBoard
                            </div>
                        </NavLink>

                        <NavLink to="/employer/Dashboard/Profile">
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md'>
                                Profile
                            </div>
                        </NavLink>

                        <NavLink to="/PostaJob">
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md'>
                                Post New Job
                            </div>

                        </NavLink>
                        <NavLink to="">
                            <div className='p-[1vw] hover:bg-green-500 hover:text-white hover:rounded-md' onClick={logout}>
                                Log Out
                            </div>

                        </NavLink>
                    </div>
                </div>
                <div className={`flex justify-center align-middle ${isMobile ? 'm-[2vw]' : 'm-[5vw]'} `}>
                    {
                        isEmployerDashboard && (<DashboardItem />)
                    }
                    {
                        isEmployerProfile && (<ProfileItem />)
                    }
                    {
                        isEmployerPostJob && (<Post />)
                    }
                </div>


            </div>
        </div>
    )
}

export default EmployerDashBoard
