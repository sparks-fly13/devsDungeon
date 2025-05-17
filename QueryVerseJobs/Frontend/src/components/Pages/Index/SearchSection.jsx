import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function SearchSection() {
    const isMobile = window.innerWidth <= 768;

    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [job, setJob] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post('/api/find', { input });
                console.log(result.data.status);
                if (result.data.status === 200) {
                    setData(result.data.result);
                    console.log(data);
                    setDropDown(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (input) {
            fetchData();
        }
        else {
            setDropDown(false);
        }
    }, [input]);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSelectItem = (item) => {
        setInput(item.jobTitle);
        setJob(item);
        setDropDown(false); // Close the dropdown after selecting an item
    };

    return (
        <form className={`form-inline px-[5vw] py-[2vw] pb-[5vw] text-[2vw] relative bottom-[5vw] ${isMobile ? 'text-[4.5vw]' : 'text-[2vw]'}`}>

            <div className={`flex flex-wrap w-full gap-[3vw] justify-center align-middle `}>
                <div className={`flex-1 mb-[2vw] ${isMobile ? 'max-w-[70vw]' : 'max-w-[30vw]'}  `}>
                    <div className={`relative`}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleChange}
                            className={`w-full bg-white border border-gray-300 px-[1vw] py-[0.5vw] rounded-md focus:outline-none focus:border-green-500 focus:border-2`}
                            placeholder="Job name"
                        />
                    </div>
                </div>

                <NavLink to={job ? `/JobDetail/${job._id}` : `/`} className="inline-block">
                    <div className={`flex-1 `}>
                        <button
                            type="button" // Prevent form submission
                            className={`w-full bg-green-500 text-white px-[1vw] py-[0.6vw] rounded-md focus:outline-none hover:bg-green-600`}
                        >
                            <SearchIcon style={{ fontSize: isMobile ? "6vw" : "3vw" }} />

                        </button>
                    </div>
                </NavLink>

            </div>

            {dropDown && (
                <div className=" max-h-[30vh] w-full mt-2 flex justify-center align-middle">
                    <select
                        className="max-w-auto  bg-white border border-gray-300 px-[1vw] py-[0.5vw] rounded focus:outline-none focus:border-green-500 focus:border-2"
                        size={data.length}
                        onChange={(e) => console.log(e.target.value)}
                    >
                        {data.map((item) => (
                            <option key={item._id} value={item.jobTitle} style={{ backgroundColor: 'white' }} onClick={() => handleSelectItem(item)}>
                                {item.jobTitle} by {item.companyName && (
                                    <span style={{ color: '#00FF00' }}>{item.companyName}</span>
                                )}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </form>
    );
}

export default SearchSection;
