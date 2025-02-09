import React from 'react'
import { Link } from 'react-router-dom'
// import DarkToggle from '../DarkToggle'

const BottomHeader = () => {
  return (
    <>
        <div className='flex items-center navbar-light bg-light navbar-expand-lg px-10 justify-between h-[13vmin] border-black-100 border-black-500'>
            <a href='https://www.gbu.ac.in/' target='_blank' >
                <img 
                className='h-14 w-auto mx-10 my-5'
                src="/Images/fulllogogbu.png" />
            </a>
            <div className='flex gap-4 mr-20 cursor-pointer'>
                <p className='text-xl'><Link to={'/'}>Home</Link></p>
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