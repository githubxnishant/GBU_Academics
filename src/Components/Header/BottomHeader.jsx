import React from 'react'
import { Link } from 'react-router-dom'
// import DarkToggle from '../DarkToggle'

const BottomHeader = () => {
  return (
    <>
        <div className='flex items-center navbar-light bg-light navbar-expand-lg md:px-10 px-5 justify-between h-[13vmin] border-black-100 border-black-500'>
            <a href='https://www.gbu.ac.in/' target='_blank' >
                <img 
                className='md:h-14 h-8 w-auto md:mx-10 my-5'
                src="/Images/fulllogogbu.png" />
            </a>
            <div className='flex gap-4 md:mr-20 cursor-pointer'>
                <p className='md:text-xl text-base'><Link to={'/'}>Home</Link></p>
                {/* <p className='dropdown-menu'>E-Resources</p>
                <p>Library</p>
                <p>Directory</p>
                <p>Publications</p> */}
                {/* <p><DarkToggle /></p> */}
            </div>
        </div>
    </>
  )
}

export default BottomHeader