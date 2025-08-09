import React from 'react'

const TopLinks = () => {
    return (
        <>
            <div className='flex justify-between items-center md:text-sm text-xs text-white md:px-20 px-5 h-[5vh] bg-[#78335d] color-white'>
                <h1 className='cursor-pointer md:ml-12'>GBU Academics</h1>
                <div className='md:mr-20 md:w-auto w-1/2 overflow-auto'>
                    <ul className='flex gap-3 items-center'>
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/' target='_blank'>Main Website</a></li>|
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/page/notices' target='_blank'>Notices</a></li>|
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/page/events' target='_blank'>Events</a></li>|
                        <li><a className='cursor-pointer' href='https://faculty.gbu.ac.in/' target='_blank'>Faculty</a></li>|
                                {/* <li><a className='cursor-pointer' href='#' target='_blank'>Sitemap</a></li>| */}
                        <li><a className='cursor-pointer' href='https://mygbu.in/schd/' target='_blank'>Time Table</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopLinks
