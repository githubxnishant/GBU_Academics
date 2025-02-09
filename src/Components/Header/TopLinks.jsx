import React from 'react'

const TopLinks = () => {
    return (
        <>
            <div className='flex justify-between items-center text-sm text-white px-20 h-[5vh] bg-[#78335d] color-white'>
                <h1 className='cursor-pointer ml-12'>GBU Academics</h1>
                <div className='mr-20'>
                    <ul className='flex gap-3'>
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/' target='_blank'>Main Website</a></li>|
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/page/notices' target='_blank'>Notices</a></li>|
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/page/events' target='_blank'>Events</a></li>|
                        <li><a className='cursor-pointer' href='https://faculty.gbu.ac.in/' target='_blank'>Faculty</a></li>|
                        <li><a className='cursor-pointer' href='https://mygbu.in/schd/' target='_blank'>Time Table</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopLinks