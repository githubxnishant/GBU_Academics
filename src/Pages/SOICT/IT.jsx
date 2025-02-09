import React, { useState, useEffect} from 'react'
import Header from '../../Components/Header/Header'
import NavigationBar from '../../Components/SideNav/NavigationBar'
import Footer from '../../Components/Footer/Footer'
import SearchBar from '../../utils/SearchBar'
import axios from 'axios';
import { server } from '../../App'

const IT = () => {

    const [unsortedData, setUnsortedData] = useState([]);
    const [subData, setSubData] = useState([]);
    
    const sortSubjects = () => {
        unsortedData.sort((a, b) => {
            if (a.subCode < b.subCode) {
                return -1;
            }
            if (a.subCode > b.subCode) {
                return 1;
            }
            return 0;
        });
    }

    useEffect(() => {
        const fetchAllSubjects = async () => {
            try {
                const response = await axios.get(`${server}/viewsubjects/it`)
                setUnsortedData(response.data);
            } catch(error) {
                console.log("Error Fetching Subject Data from DB!", error);
            }
        }
        fetchAllSubjects();
        sortSubjects();
        setSubData(unsortedData);
    });

    return (
        <>
            <Header />
            <div className='flex'>
                <NavigationBar />
                <div className='w-[70%] flex justify-center mt-6'>
                    <div className='w-[95%] h-[92%] overflow-auto'>
                        <div className='h-[31vh] overflow-hidden rounded'>
                            <img src="/Images/ict.jpg" alt="Meditation Center Image" className='relative top-[-50%]' />
                        </div>
                        <div className='w-auto h-[4vh] flex justify-between items-center my-3 font-normal text-base'>
                            <h1><span className='text-[#2563eb] underline'>School of Information and Communication Technology </span>&gt;<span className='text-[#2563eb] underline'> IT</span></h1>
                            <div><SearchBar /></div>
                        </div>
                        <div className='flex justify-between flex-wrap gap-5 h-[31vh] w-auto'>
                            {subData.map((subject) => (
                                <div className='border-2 bg-white border-[#d9d9d9] h-60 w-[30%] rounded p-3 shadow-md'>
                                    <div className='w-full h-16 bg-[#d9d9d9] rounded flex items-center justify-center text-center mb-2 p-3 text-sm'>{subject.subCode.toUpperCase()} - {subject.subName}</div>
                                    <div className='h-24 overflow-auto'>
                                        {subject.year2025.midSem === '' && subject.year2025.endSem === '' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                            <h1>{subject.year2025.year}</h1>
                                            <div className='flex items-center justify-center'>
                                                {subject.year2025.midSem === '' ? '' : <a href={subject.year2025.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                {subject.year2025.midSem != '' && subject.year2025.endSem != '' ? <p className='px-3'>|</p> : ''}
                                                {subject.year2025.endSem === '' ? '' : <a href={subject.year2025.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                            </div>
                                        </div>}
                                        {subject.year2024.midSem === '' && subject.year2024.endSem === '' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                            <h1>{subject.year2024.year}</h1>
                                            <div className='flex items-center justify-center'>
                                                {subject.year2024.midSem === '' ? '' : <a href={subject.year2024.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                {subject.year2024.midSem != '' && subject.year2024.endSem != '' ? <p className='px-3'>|</p> : ''}
                                                {subject.year2024.endSem === '' ? '' : <a href={subject.year2024.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                            </div>
                                        </div>}
                                        {subject.year2023.midSem === '' && subject.year2023.endSem === '' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                            <h1>{subject.year2023.year}</h1>
                                            <div className='flex items-center justify-center'>
                                                {subject.year2023.midSem === '' ? '' : <a href={subject.year2023.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                {subject.year2023.midSem != '' && subject.year2023.endSem != '' ? <p className='px-3'>|</p> : ''}
                                                {subject.year2023.endSem === '' ? '' : <a href={subject.year2023.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                            </div>
                                        </div>}
                                        {subject.year2022.midSem === '' && subject.year2022.endSem === '' ? '' : <div className='border-2 my-1 h-11 rounded px-7 flex items-center justify-between text-sm'>
                                            <h1>{subject.year2022.year}</h1>
                                            <div className='flex items-center justify-center'>
                                                {subject.year2022.midSem === '' ? '' : <a href={subject.year2022.midSem} target='_blank' className='text-[#2563eb]'>Mid</a>}
                                                {subject.year2022.midSem != '' && subject.year2022.endSem != '' ? <p className='px-3'>|</p> : ''}
                                                {subject.year2022.endSem === '' ? '' : <a href={subject.year2022.endSem} target='_blank' className='text-[#2563eb]'>End</a>}
                                            </div>
                                        </div>}
                                        {subject.year2025.midSem === '' && subject.year2025.endSem === ''  && subject.year2024.midSem === '' && subject.year2024.endSem === '' && subject.year2023.midSem === '' && subject.year2023.endSem === ''  && subject.year2022.midSem === '' && subject.year2022.endSem === '' ? <div className='flex justify-center items-center h-24'>No data available!</div> : ''}
                                    </div>
                                    <div className='h-10 mt-2 bg-[#d9d9d9] rounded flex justify-center items-center'>
                                        <button className='text-sm hover:font-semibold duration-300 transition-all hover:text-[#2563eb]'>Download Syllabus</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default IT