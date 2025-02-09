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
            <div className='w-[30%] h-[82vh] shadow overflow-y-auto'>
                <div className='h-full w-full gap-3 px-8 py-4 border-black'>
                    <div className='mb-4'>
                        <h1 className='w-full text-center text-xl font-semibold mx-auto'>Departments</h1>
                    </div>
                    <div className='h-[95%] overflow-auto'>
                        <div className="dropdown-container">
                            {departmentsData.departments.map((department, index) => (
                                <div key={index} className="dropdown-div gap-5">
                                    <div className={`dropdown ${showDropdown === index ? 'show' : ''}`}>
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
                                        <ul className={`dropdown-items overflow-hidden transition-max-height mb-2 duration-500 ease-out bg-[#d9d9d9] rounded-b ${showDropdown === index ? 'max-h-48' : 'max-h-0'}`}>
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