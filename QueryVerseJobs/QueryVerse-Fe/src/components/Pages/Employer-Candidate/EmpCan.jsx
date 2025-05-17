import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmpCan() {

  const isMobile = window.innerWidth <= 768;

  //

  const navigate = useNavigate();

  useEffect(() => {
    const checkForLogins = async () => {
      try {
        const res = await axios.get('/api/')
        //console.log(res)
        if (res.data.valid) {
          console.log("One User is already logged in....redirecting back to home page")
          navigate('/')
        }
      }
      catch (error) {
        console.log("error in the nav bar section frontend = ", error)
      }
    }

    checkForLogins()
  }, [])
  return (
    <div className={`${isMobile ? 'm-[2vw]' : 'm-[10vw]'} flex justify-center align-center ${isMobile ? 'bg-gray-200 rounded-lg' : ''} `}   >
      <Card className={`w-full ${isMobile ? 'max-w-[95vw]' : 'max-w-[60vw]'} ${isMobile ? 'my-[30vw]' : ''}  flex-row `}   >
        <CardHeader
          shadow={false}
          floated={false}
          className={`m-0 w-2/5 shrink-0 rounded-r-none `}
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className={`h-full w-full object-cover `}
          />
        </CardHeader>
        <CardBody className={` ${isMobile ? 'm-[1vw]' : 'm-[2vw]'}`}   >
          <Typography className={`mb-4 text-gray-700 ${isMobile ? 'text-[3vw]' : 'text-[2vw]'} font-serif font-semibold uppercase `}   >
            Are you an Employer/Candidate ?
          </Typography>
          <Typography color="blue-gray" className={`m-1 ${isMobile ? 'text-[3vw]' : 'text-[1.5vw]'} font-serif `}   >
            Boost Your Career Growth with our fuel support
          </Typography>

          <div className={` font-serif font-medium text-green-500 ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}`}   >Select which best suits you <ArrowForwardIosIcon style={{ fontSize: "3vw", marginLeft: "2vw" }} /></div>

          <div className={`flex gap-[1vw] mt-[2vw] `}   >
            <NavLink to="/signin/employer">
              <button className={`bg-green-500 p-[1vw] rounded-md text-white font-serif font-semibold ${isMobile ? 'text-[3vw]' : 'text-[1vw]'} hover:bg-green-400 `}    ><BusinessIcon style={{ fontSize: isMobile ? "6vw" : "1.5vw", marginRight: isMobile ? "2vw" : "0.5vw" }} />Employer</button>
            </NavLink>

            <NavLink to="/signin/candidate">
              <button className={`bg-green-500 p-[1vw] rounded-md text-white font-serif font-semibold ${isMobile ? 'text-[3vw]' : 'text-[1vw]'}  hover:bg-green-400 `}   ><PeopleIcon style={{ fontSize: isMobile ? "6vw" : "1.5vw", marginRight: isMobile ? "2vw" : "0.5vw" }} />Candidate</button>
            </NavLink>

          </div>
        </CardBody>
      </Card>
    </div>

  )
}

export default EmpCan