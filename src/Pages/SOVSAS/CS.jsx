import React from 'react'
import Header from '../../Components/Header/Header'
import NavigationBar from '../../Components/SideNav/NavigationBar'
import Footer from '../../Components/Footer/Footer'
import Maintenance from '../../utils/Maintenance'
import SearchBar from '../../utils/SearchBar'

const CS = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <NavigationBar />
                <div className='w-[70%] flex justify-center mt-6'>
                    <div className='w-[95%] h-[92%] overflow-auto'>
                        <div className='h-[31vh] overflow-hidden rounded'>
                            <img src="/Images/meditation_center.jpg" alt="Meditation Center Image" className='relative top-[-50%]' />
                        </div>
                        <div className='w-auto h-[4vh] flex justify-between items-center my-3 font-normal text-base'>
                            <h1><span className='text-[#2563eb] underline'>School of Vocational Studies and Applied Sciences </span>&gt;<span className='text-[#2563eb] underline'> CS</span></h1>
                            <div><SearchBar /></div>
                        </div>
                        <div className='flex justify-center items-center text-center px-24 h-[31vh] w-auto flex-col'>
                            <Maintenance />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default CS