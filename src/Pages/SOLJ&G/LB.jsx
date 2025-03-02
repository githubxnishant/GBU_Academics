import React from 'react'
import Header from '../../Components/Header/Header'
import NavigationBar from '../../Components/SideNav/NavigationBar'
import Footer from '../../Components/Footer/Footer'
import Maintenance from '../../utils/Maintenance'
import SearchBar from '../../utils/SearchBar'

const LB = () => {
    return (
        <>
            <Header />
            <div className='md:flex'>
                <NavigationBar />
                <div className='md:w-[70%] flex justify-center mt-6'>
                    <div className='md:w-[95%] w-[90%] h-[92%] overflow-auto'>
                        <div className='md:h-[31vh] h-40 overflow-hidden rounded'>
                            <img src="/Images/meditation_center.jpg" alt="Meditation Center Image" className='relative md:top-[-60%] top-[-10%]' />
                        </div>
                        <div className='w-auto h-[4vh] flex justify-between items-center md:my-3 my-2 font-normal md:text-base text-xs'>
                            <h1><span className='text-[#2563eb] underline'>School of Law, Justice & Governance </span>&gt;<span className='text-[#2563eb] underline'> MB</span></h1>
                            <div><SearchBar /></div>
                        </div>
                        <div className='flex justify-center items-center text-center md:px-24 h-[25vh] w-auto flex-col'>
                            <Maintenance />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default LB