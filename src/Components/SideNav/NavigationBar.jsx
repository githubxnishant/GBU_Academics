import React, { useState, useEffect } from 'react';
import departmentsData from './departments.json';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    
    const [showDropdown, setShowDropdown] = useState(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setShowDropdown(null);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
            const handleToggleDropdown = (index) => {
            setShowDropdown((prevState) => (prevState === index ? null : index));
        };
            
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (!event.target.closest('.dropdown')) {
                setShowDropdown(false);
                }
            };
            window.addEventListener('click', handleClickOutside);
            return () => {
                window.removeEventListener('click', handleClickOutside);
            };
        }, []);

    return (
        <>
            <div className='md:w-[30%] w-screen md:h-[82vh] h-auto shadow overflow-y-auto'>
                <div className='h-full w-full gap-3 md:px-8 px-5 py-4'>
                    <div className='mb-4'>
                        <h1 className='w-full text-center text-xl font-semibold mx-auto'>Departments</h1>
                    </div>
                    <div className='md:h-[95%] overflow-auto md:block flex justify-center flex-row items-center'>
                        <div className={`md:h-[90%] h-auto w-full dropdown-container md:flex-col flex overflow-scroll flex-nowrap gap-3`}>
                            {departmentsData.departments.map((department, index) => (
                                <div key={index} className="dropdown-div">
                                    <div className={`dropdown md:w-auto w-[89.3vw] ${showDropdown === index ? 'show' : ''}`}>
                                        <button className={`dropdown-toggle flex items-center justify-between w-full bg-[#d9d9d9] text-black p-2 text-start border-none cursor-pointer rounded-t rounnded-r ${showDropdown === index ? 'rounded-t' : 'rounded '}`}
                                        onClick={() => handleToggleDropdown(index)} >
                                            <p className="m-1 font-normal">{department.name}</p>
                                            <svg
                                                className={`triangle ml-2 transition-transform ${showDropdown === index ? 'rotate-180' : ''}`}
                                                viewBox="0 0 10 10"
                                                width="10"
                                                height="10">
                                                <polygon points="0,0 10,0 5,5" fill="black" />
                                            </svg>
                                        </button>
                                        <ul className={`dropdown-items overflow-hidden transition-max-height duration-500 ease-out bg-[#d9d9d9] rounded-b ${showDropdown === index ? 'max-h-48' : 'max-h-0'}`}>
                                        {department.branches.map((branch, branchIndex) => (
                                            <li key={branchIndex} className="py-1">
                                                <Link to={branch.link} className="ml-5 text-black no-underline block">
                                                    <p>- {branch.name}</p>
                                                </Link>
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationBar