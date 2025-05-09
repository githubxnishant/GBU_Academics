import React from 'react'
import { Link } from 'react-router-dom'
// import Cse from '../../../Pages/SOICT/CSE'
import Header from '../../Components/Header/Header'
import NavigationBar from '../SideNav/NavigationBar';
import Footer from '../Footer/Footer';

const Homepage = () => {
    return (
        <>
            <Header />
            <div className='md:flex'>
                <NavigationBar />
                <div className='md:w-[70%] w-screen flex justify-center items-center'>
                    <div className='md:w-[95%] w-[90%] md:h-[92%]'>
                        <div className='md:h-[33vh] h-auto overflow-hidden rounded'>
                            <img src="/Images/meditation_center.jpg" alt="Meditation Center Image" className='relative md:top-[-60%]' />
                        </div>
                        <div className='flex justify-between items-center flex-wrap gap-5 md:h-[40vh] h-[20vh] w-auto' >
                            {/* <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'><Link to={'/cse'}>SOICT</Link></button>
                                </div>
                            </div>
                            <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'>SOM</button>
                                </div>
                            </div>
                            <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'>SOBT</button>
                                </div>
                            </div>
                            <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'>SOVSAS</button>
                                </div>
                            </div>
                            <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'>SOE</button>
                                </div>
                            </div>
                            <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'>SOHSS</button>
                                </div>
                            </div>
                            <div className='border-2 bg-white border-[#d9d9d9] h-56 w-[30%] rounded'>
                                <div className='m-3 border-2 h-[150px] rounded w-auto flex items-center
                                justify-center'>Image of Department here</div>
                                <div className='mx-3 w-auto'>
                                    <button className='w-full p-1 bg-[#d9d9d9] rounded'>SOLJ&G</button>
                                </div>
                            </div> */}
                            <span className='w-full'><h1 className='text-center font-medium md:text-xl text-lg'>Previous Year Question Papers</h1><br />
                            <h2 className='md:text-base text-sm w-full text-center'>For further Communication, feel free to reach the developer at <a href='mailto:mailxnishant@gmail.com' className='font-bold underline'>mailxnishant@gmail.com</a></h2></span>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Homepage