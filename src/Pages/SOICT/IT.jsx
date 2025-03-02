import React, { useState, useEffect} from 'react'
import Header from '../../Components/Header/Header'
import NavigationBar from '../../Components/SideNav/NavigationBar'
import Footer from '../../Components/Footer/Footer'
import SearchBar from '../../utils/SearchBar'
import axios from 'axios';
import Maintenance from '../../utils/Maintenance'

const It = () => {

    const [unsortedData, setUnsortedData] = useState([]);
    const [subData, setSubData] = useState([]);

    useEffect(() => {
        const fetchAllSubjects = async () => {
            try {
                const response = await axios.get("http://localhost:3000/viewsubjects/it", { timeout: 5000 });
                setUnsortedData(response.data);
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
                <div className='md:w-[70%] flex justify-center mt-6'>
                    <div className='md:w-[95%] w-[90%] h-[92%] overflow-auto'>
                        <div className='md:h-[31vh] h-40 overflow-hidden rounded'>
                            <img src="/Images/meditation_center.jpg" alt="Meditation Center Image" className='relative md:top-[-60%] top-[-10%]' />
                        </div>
                        <div className='w-auto h-[4vh] flex justify-between items-center md:my-3 my-2 font-normal md:text-base text-xs'>
                            <h1><span className='text-[#2563eb] underline'>School of Information and Communication Technology </span>&gt;<span className='text-[#2563eb] underline'> IT</span></h1>
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

export default It