import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { NavLink } from 'react-router-dom';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopIcon from '@mui/icons-material/Laptop';



const Footer = () => {
    //${isMobile ? 'text-[5vw]' : 'text-[1.5vw]'}

    const isMobile = window.innerWidth <= 768;

    return (
        <>
            <div className={`bg-green-700 text-white py-[2vw] ${isMobile ? 'max-w-[80vw]' : 'max-w-[70vw]'}  mx-auto text-center rounded-2xl relative top-[7vw] font-serif `}  >{/** Download wala section */}
                <div className={` container mx-auto text-center`}  >
                    <h2 className={`${isMobile ? 'text-[5vw]' : 'text-[2vw]'} font-extrabold mb-[2vw] leading-tight justify-center align-middle `}  >Download Our App</h2>
                    <p className={`${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} text-gray-300 mb-[3vw] justify-center align-middle `}  >Supercharge your experience with our mobile app.</p>
                    <div className={` flex items-center justify-center space-x-[2vw]`}  >
                        <div className={` flex flex-col items-center gap-[1vw]`}  >
                            <LaptopIcon style={{ fontSize: "3vw" }} />
                            <div className={` ${isMobile ? 'text-[3vw]' : 'text-[1vw]'}`}  >(For PC)</div>
                            <button className={` bg-white ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'}] text-gray-800 px-[2vw] py-[1vw] rounded-full font-semibold hover:bg-gray-600 hover:text-white transition duration-300`}  >
                                Download Now
                            </button>
                        </div>

                        <div className={` flex flex-col items-center gap-[1vw]`}  >
                            <SmartphoneIcon style={{ fontSize: "3vw" }} />
                            <div className={` ${isMobile ? 'text-[3vw]' : 'text-[1vw]'}`}  >(For Smartphones)</div>
                            <div className={`flex items-center ${isMobile ? 'text-[4vw]' : 'text-[1.5vw]'} `}  >

                                <NavLink to="#" className={` text-white hover:text-gray-300`}  >
                                    <i className={`fab fa-apple fa-2x `}  ></i>
                                </NavLink>
                                <NavLink to="#" className={` text-white hover:text-gray-300 ml-4`}  >
                                    <i className={`fab fa-android fa-2x `}  ></i>
                                </NavLink>
                            </div>
                        </div>


                    </div>
                </div>
            </div>{/** Download wala section */}

            <footer className={`bg-gray-800 text-white pt-[10vw] pb-[2.5vw] px-[1vw]  `}  >
                <div className={`container mx-auto flex flex-wrap justify-around `}  >
                    <div className={`w-full md:w-1/2 lg:w-1/4 mb-[5vw] md:mb-0 `}  >
                        <h2 className={` ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} font-extrabold mb-[1vw] text-green-500`}  >About Us</h2>
                        <p className={`text-gray-400  `}  >We are dedicated to connecting talented individuals with exciting opportunities. Our platform strives to empower job seekers and employers alike, fostering growth and success in every interaction.</p>
                    </div>
                    <div className={`w-full md:w-1/2 lg:w-1/4 mb-[5vw] md:mb-0 `}  >
                        <h2 className={`${isMobile ? 'text-[5vw]' : 'text-[2vw]'} font-extrabold mb-[1vw] text-green-500 `}  >Contact Us</h2>
                        <p className={`text-gray-400 `}  >Email: <a href="mailto:info@example.com" className={` text-white hover:underline`}  >info@example.com</a></p>
                        <p className={`text-gray-400 `}  >Phone: <a href="tel:+11234567890" className={`text-white hover:underline `}  >+1 123-456-7890</a></p>
                    </div>
                    <div className={` w-full md:w-1/2 lg:w-1/4 mb-[5vw] md:mb-0`}  >
                        <h2 className={` ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} font-extrabold mb-[1vw] text-green-500`}  >Follow Us</h2>
                        <div className={` flex space-x-4`} >
                            <NavLink to="#">
                                <div className={` text-white ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} hover:text-gray-500 transition duration-300`}  >
                                    <i className={`fab fa-facebook `}  ></i>
                                </div>
                            </NavLink>

                            <NavLink to="#">
                                <div className={` text-white ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} hover:text-gray-500 transition duration-300`}  >
                                    <i className={`fab fa-twitter `}  ></i>
                                </div>
                            </NavLink>

                            <NavLink to="#">
                                <div className={`text-white ${isMobile ? 'text-[5vw]' : 'text-[2vw]'} hover:text-gray-500 transition duration-300 `}  >
                                    <i className={`fab fa-instagram `}  ></i>
                                </div>
                            </NavLink>

                        </div>
                    </div>
                </div>
                <div className={`mt-[5vw] justify-center align-middle text-center `}  >
                    <p className={`text-gray-400 `}  >&copy; 2024 Job Board. All rights reserved.</p>
                </div>
            </footer>
        </>

    );
};

export default Footer;
