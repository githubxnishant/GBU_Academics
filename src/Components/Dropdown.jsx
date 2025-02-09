import React, { useState, useEffect } from 'react';
import departmentsData from './departments.json';

const Dropdown = () => {
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

  return (
    <div className="dropdown-container">
      {departmentsData.departments.map((department, index) => (
        <div key={index} className="dropdown-div">
          <div className={`dropdown ${showDropdown === index ? 'show' : ''}`}>
            <button
              className="dropdown-toggle flex items-center justify-between w-full bg-gray-300 text-black p-2 text-lg border-none cursor-pointer rounded-tl-md shadow-md"
              onClick={() => handleToggleDropdown(index)}
            >
              <p className="m-1 font-normal">{department.name}</p>
              <svg
                className={`triangle ml-2 transition-transform ${showDropdown === index ? 'rotate-180' : ''}`}
                viewBox="0 0 10 10"
                width="10"
                height="10"
              >
                <polygon points="0,0 10,0 5,5" fill="black" />
              </svg>
            </button>
            <ul
              className={`dropdown-items overflow-hidden transition-max-height duration-300 ease-out bg-gray-300 rounded-bl-md ${
                showDropdown === index ? 'max-h-48' : 'max-h-0'
              }`}
            >
              {department.branches.map((branch, branchIndex) => (
                <li key={branchIndex} className="py-1">
                  <a href={branch.link} className="ml-5 text-black no-underline block">
                    - {branch.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
