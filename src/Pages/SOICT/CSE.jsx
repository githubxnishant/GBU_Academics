import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header/Header'
import NavigationBar from '../../Components/SideNav/NavigationBar'
import Footer from '../../Components/Footer/Footer'
import SearchBar from '../../utils/SearchBar'
import axios from 'axios';
import { server } from '../../App'

const Cse = () => {

    const [unsortedData, setUnsortedData] = useState([]);
    const [subData, setSubData] = useState([]);
    const [query, setQuery] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchQuery = async () => {
        const subCode = prompt("Search Subject Code");
        try {
            const response = await axios.get(`${server}/searchsubject/cse`, {
                params: { subCode }
            });
            if (response) {
                setSubData([response.data.response]);
                return;
            }
        } catch (error) {
            console.log("Error searching the subject in the db!");
            alert(`${sub.toUpperCase()} not found in the DB!`);
        }
    }

    useEffect(() => {
        const fetchAllSubjects = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/viewsubjects/cse`);
                setUnsortedData(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error Fetching Subject Data from DB!", error);
            }
        };
        fetchAllSubjects();
    }, []);

    useEffect(() => {
        if (unsortedData.length > 0) {
            const sortedData = [...unsortedData].sort((a, b) => (a.subCode < b.subCode ? -1 : 1));
            setSubData(sortedData);
        }
    }, [unsortedData]);

    return (
        <>
            <Header />
            <div className='md:flex'>
                <NavigationBar />
                <div className='md:w-[70%] w-screen flex justify-center md:mt-6 mt-3'>
                    <div className='w-[90%] h-[92%] overflow-auto'>
                        <div className='md:h-[31vh] h-[18vh] overflow-hidden rounded'>
                            <img src="/Images/ict.jpg" alt="Meditation Center Image" className='relative md:top-[-50%] top-[-10%]' />
                        </div>
                        <div className='w-auto h-[4vh] flex justify-between items-center md:my-3 mb-3 font-normal text-xs md:text-base'>
                            <h1><span className='text-[#2563eb] underline'>School of Information and Communication Technology </span>&gt;<span className='text-[#2563eb] underline'> CSE</span></h1>
                            <div onClick={searchQuery} className='md:w-auto w-1/2 flex md:justify-end justify-end items-center'>
{/*                                 <SearchBar /> */}
                                <button className='border border-black px-2 md:ml-2 rounded'>Search</button>
                            </div>
                        </div>
                        <div className='flex md:justify-between justify-center flex-wrap gap-5 md:mb-0 -mb-1 h-[31vh] md:w-auto'>
                            {loading ?
                                <>
                                    <Loader />
                                    <Loader />
                                    <Loader />
                                    <Loader />
                                    <Loader />
                                    <Loader />
                                </>
                                :
                                <>
                                    {subData.map((subject) => (
                                        <div className='border-2 bg-white border-[#d9d9d9] h-60 md:w-[30%] w-[80%] rounded p-3 shadow-md'>
                                            <div className='w-full h-16 bg-[#d9d9d9] rounded flex items-center justify-center text-center mb-2 p-3 text-sm'>{subject.subCode.toUpperCase()} - {subject.subName}</div>
                                            <div className='h-24 overflow-auto'>
                                                {subject.year2025.midSem === ' ' && subject.year2025.endSem === ' ' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                                    <h1>{subject.year2025.year}</h1>
                                                    <div className='flex items-center justify-center'>
                                                        {subject.year2025.midSem === ' ' ? '' : <a href={subject.year2025.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                        {subject.year2025.midSem != ' ' && subject.year2025.endSem != ' ' ? <p className='px-3'>|</p> : ''}
                                                        {subject.year2025.endSem === ' ' ? '' : <a href={subject.year2025.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                                    </div>
                                                </div>}
                                                {subject.year2024.midSem === ' ' && subject.year2024.endSem === ' ' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                                    <h1>{subject.year2024.year}</h1>
                                                    <div className='flex items-center justify-center'>
                                                        {subject.year2024.midSem === ' ' ? '' : <a href={subject.year2024.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                        {subject.year2024.midSem != ' ' && subject.year2024.endSem != ' ' ? <p className='px-3'>|</p> : ''}
                                                        {subject.year2024.endSem === ' ' ? '' : <a href={subject.year2024.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                                    </div>
                                                </div>}
                                                {subject.year2023.midSem === ' ' && subject.year2023.endSem === ' ' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                                    <h1>{subject.year2023.year}</h1>
                                                    <div className='flex items-center justify-center'>
                                                        {subject.year2023.midSem === ' ' ? '' : <a href={subject.year2023.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                        {subject.year2023.midSem != ' ' && subject.year2023.endSem != ' ' ? <p className='px-3'>|</p> : ''}
                                                        {subject.year2023.endSem === ' ' ? '' : <a href={subject.year2023.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                                    </div>
                                                </div>}
                                                {subject.year2022.midSem === ' ' && subject.year2022.endSem === ' ' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                                    <h1>{subject.year2022.year}</h1>
                                                    <div className='flex items-center justify-center'>
                                                        {subject.year2022.midSem === ' ' ? '' : <a href={subject.year2022.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                        {subject.year2022.midSem != ' ' && subject.year2022.endSem != ' ' ? <p className='px-3'>|</p> : ''}
                                                        {subject.year2022.endSem === ' ' ? '' : <a href={subject.year2022.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                                    </div>
                                                </div>}
                                                {subject.year2025.midSem === ' ' && subject.year2025.endSem === ' ' && subject.year2024.midSem === ' ' && subject.year2024.endSem === ' ' && subject.year2023.midSem === ' ' && subject.year2023.endSem === ' ' && subject.year2022.midSem === ' ' && subject.year2022.endSem === ' ' ? <div className='flex justify-center items-center h-24'>No data available!</div> : ''}
                                            </div>
                                            <div className='h-10 mt-2 bg-[#d9d9d9] rounded flex justify-center items-center'>
                                                <button className='text-sm hover:font-semibold duration-300 transition-all hover:text-[#2563eb]'>Download Syllabus</button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

const Loader = () => {
    return (
        <>
            <div className='border-2 bg-white border-[#d9d9d9] h-60 md:w-[30%] w-[80%] rounded p-3 shadow-md'>
                <div className='w-full h-16 bg-[#d9d9d9] rounded flex items-center justify-center text-center mb-2 p-3 text-sm'></div>
                <div className='h-24 flex items-center flex-col justify-center'>
                    Loading...
                </div>
                <div className='h-10 mt-2 bg-[#d9d9d9] rounded flex justify-center items-center'>
                    <button className='text-sm hover:font-semibold duration-300 transition-all hover:text-[#2563eb]'></button>
                </div>
            </div>
        </>
    )
}

export default Cse;
