import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {

    const [menu, setMenu] = useState(false);
    const [activeTab, setActiveTab] = useState('CSE');
    const [searchSubject, setSearchSubject] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchedSubject, setSearchedSubject] = useState([]); 
    const [addSubject, setAddSubject] = useState(false);
    const [viewAllSubjects, setViewAllSubjects] = useState(false);
    const [fetchSubjects, setFetchSubjects] = useState([]);
    const [subCode, setSubCode] = useState('');
    const [subName, setSubName] = useState('');
    const [midSem2025, setMidSem2025] = useState('');
    const [midSem2024, setMidSem2024] = useState('');
    const [midSem2023, setMidSem2023] = useState('');
    const [midSem2022, setMidSem2022] = useState('');
    const [endSem2025, setEndSem2025] = useState('');
    const [endSem2024, setEndSem2024] = useState('');
    const [endSem2023, setEndSem2023] = useState('');
    const [endSem2022, setEndSem2022] = useState('');
    const year2025 = '2025';
    const year2024 = '2024';
    const year2023 = '2023';
    const year2022 = '2022';

    const submitHandle = async () => {
        const dept = activeTab.toLowerCase();
        console.log(dept)
        try {
            if(subCode == '') {
                toast.error('Subject Code cannot be Empty!');
                return;
            } else if (subCode != '') {
                const duplicateSub = await axios.get(`http://localhost:5000/checkduplicate/${dept}`, { params: { subCode } });
                if (duplicateSub.data.success) {
                    toast.error('Subject already exists in DB!');
                    return;
                } else {
                    if(subName == '') {
                        toast.error('Subject Name cannot be Empty!');
                        return;
                    } else {
                        await axios.post(`http://localhost:5000/addsubject/${dept}`, {
                            subCode, subName, year2025, year2024, year2023, year2022, midSem2025, midSem2024, midSem2023, midSem2022, endSem2025, endSem2024, endSem2023, endSem2022
                        });
                        toast.success(`${subCode.toUpperCase()} successfully added to DB!`);
                    }
                }
            }
        } catch(error) {
            console.log("Error Post Suject to DB", error);
        }
        setSubCode('');
        setSubName('');
        setMidSem2025('');
        setMidSem2024('');
        setMidSem2023('');
        setMidSem2022('');
        setEndSem2025('');
        setEndSem2024('');
        setEndSem2023('');
        setEndSem2022('');
        setAddSubject(!addSubject);
    }

    const searchHandle = async () => {
        try {
            
            const dept = activeTab.toLowerCase();
            let result = await axios.get(`http://localhost:5000/searchsubject/${dept}`, {
                params: { subCode: searchSubject.toUpperCase() },
            });
            if (!result.data.status) {
                toast.error(`${searchSubject} does not exist in the DB`);
                setSearchedSubject([]);
                return;
            }
            let subjects = result.data.response;
            setSearchedSubject(subjects);
            console.log(searchedSubject);
            updateState(subjects);
            } catch (error) {
            toast.error('An unexpected error occurred, please try again!');
            console.error('Error occurred while searching for the subject:', error.message);
            }
        };
    
    const updateState = (subjects) => {
        setSearchSubject(subjects);
        console.log(searchedSubject);
    }

    const formHandler = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const fetchAllSubject = async () => {
            try {
                const dept = activeTab.toLowerCase();
                const response = await axios.get(`http://localhost:5000/viewsubjects/${dept}`);
                setFetchSubjects(response.data);
            } catch(error) {
                console.error('Error fetching subjects data from database server', error);
            }
        };
        fetchAllSubject();
    }, [viewAllSubjects, activeTab, addSubject]);

    return(
        <> 
            {/* Add Subject Popup */}
            <div className={`w-screen z-40 h-screen bg-black opacity-50 flex fixed justify-center items-center ${addSubject ? 'top-0' : '-top-[100vh]'}`}>
            </div>
            <div className={`w-1/2 h-2/3 opacity-100 z-50 absolute top-1/2 left-1/2 -translate-x-[50%] px-20 py-5 rounded -translate-y-[50%] bg-[#f9f9f9] transition-all duration-500 ${addSubject ? 'top-0' : 'hidden'}`}>
                <h1 className="text-center text-3xl mb-3 font-medium">Add Subject</h1>
                <form onSubmit={ formHandler }>
                    <div className="flex justify-center place-items-baseline flex-row bg-white border py-3">
                        <div className="w-[20%] flex justify-end items-start flex-col">
                            <p>Department</p>
                            <p className="mt-3 ">Course Code</p>
                            <p className="mt-3">Course Name</p>
                        </div>
                        <div className="h-full w-[70%]">   
                            <input value={ activeTab } disabled className="w-[25%] cursor-not-allowed ml-5 px-5 border"/> <br />
                            <input 
                            value={subCode}
                            onChange={(e) => {setSubCode(e.target.value)}}
                            className="ml-5 mt-3 px-3 border w-[30%]" maxLength={5} required placeholder="exp - MA101"/>
                            <input 
                            value={subName}
                            onChange={(e) => {setSubName(e.target.value)}}
                            className="mt-3 ml-5 px-3 border w-[90%]" required placeholder="exp - Engineering Mathematics I"/>
                        </div>
                    </div>
                    <table className="h-48 w-full mt-5 bg-white">
                        <thead>
                            <tr>
                                <td className="border text-center font-semibold">Exam Year</td>
                                <td className="border text-center font-semibold">Mid Sem Link</td>
                                <td className="border text-center font-semibold">End Sem Link</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border text-center">{year2025}</td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={midSem2025} onChange={(e) => setMidSem2025(e.target.value)} placeholder="Mid Sem Paper"/>
                                </td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={endSem2025} onChange={(e) => setEndSem2025(e.target.value)} placeholder="End Sem Paper"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="border text-center">{year2024}</td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={midSem2024} onChange={(e) => setMidSem2024(e.target.value)} placeholder="Mid Sem Paper"/>
                                </td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={endSem2024} onChange={(e) => setEndSem2024(e.target.value)} placeholder="End Sem Paper"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="border text-center">{year2023}</td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={midSem2023} onChange={(e) => setMidSem2023(e.target.value)} placeholder="Mid Sem Paper"/>
                                </td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={endSem2023} onChange={(e) => setEndSem2023(e.target.value)} placeholder="End Sem Paper"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="border text-center">{year2022}</td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={midSem2022} onChange={(e) => setMidSem2022(e.target.value)} placeholder="Mid Sem Paper"/>
                                </td>
                                <td className="border text-center hover:outline-none w-[40%]">
                                    <input value={endSem2022} onChange={(e) => setEndSem2022(e.target.value)} placeholder="End Sem Paper"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="w-full flex justify-center items-center mt-5">
                    <button onClick={submitHandle} type='submit' className={`bg-emerald-400 px-5 py-2 text-lg text-white font-semibold rounded-lg transition-all duration-500 hover:bg-emerald-500 mr-3`}>Submit</button>
                    <button className={`bg-red-400 px-5 py-2 text-lg text-white font-semibold rounded-lg transition-all duration-500 hover:bg-red-600 ml-3`} onClick={() => {setAddSubject(!addSubject)}}>Cancel</button>
                </div>
            </div>



            {/* Visible Content */}
            <div className="h-screen w-screen flex justify-center">
                {/* Side Nav */}
                <div className={`border-r bg-[#f8f9fa] border-[#d9d9d9] h-full transition-all duration-300 ${menu ? 'w-[5%]' : 'w-[20%]'}`}>
                    <div className={`border-b border-[#d9d9d9] h-[8%] w-full flex items-center px-5 ${menu ? 'justify-center' : 'justify-between'}`}>
                        <img className={`h-8 transition-all duration-300 ${menu ? 'hidden' : ''}`} src="/Images/fulllogogbu.png"/>
                        <button value={ menu } onClick={() => { setMenu(!menu)}}>
                            {menu ?
                            // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            //     <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            // </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                            }
                        </button>
                    </div>
                    <div className="h-[75%] w-full p-5">
                        <button className="w-full flex justify-center">
                            {menu ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24`" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                            </svg> 
                            : 
                            <div className="w-full flex justify-center items-center gap-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                                </svg> */}
                                <h1 className="font-medium">Dashboard</h1>
                            </div> }
                        </button>
                        <button className="w-full flex justify-center mt-5">
                            {menu ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-text-fill" viewBox="0 0 16 16">
                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1"/>
                            </svg> 
                            : 
                            <div className="w-full flex justify-center items-center gap-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-text-fill" viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1"/>
                                </svg> */}
                                <h1 className="font-medium">Records</h1>
                            </div> }
                        </button>
                    </div>
                    <div className={`h-[17%] border-t absolute b-0 p-5 flex justify-center items-center flex-col gap-5 transition-all duration-300 ${menu ? 'w-[5%]' : 'w-[20%]'}`}>
                        <button className="w-full flex justify-center">
                            {menu ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                            : 
                            <div className="w-full flex justify-center items-center gap-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg> */}
                                <h1 className="font-medium">Profile</h1>
                            </div> }
                        </button>
                        <button className="w-full flex justify-center">
                            {menu ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                            </svg>
                            : 
                            <div className="w-full flex justify-center items-center gap-3">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg> */}
                                <h1 className="font-medium">Settings</h1>
                            </div> }
                        </button>
                    </div>
                </div>
                {/* Main Body */}
                <div className={`border-[#d9d9d9] h-full transition-all duration-300 ${menu ? 'w-[95%]' : 'w-[80%]'}`}>
                    <div className="border-b text-2xl font-semibold border-[#d9d9d9] bg-[#f9f9fa] h-[8%] w-full flex justify-center items-center">GBU Academics</div>
                    <div className="h-[92%] w-full bg-[#F3F3F3] p-5 flex justify-center items-center flex-col">
                        <div className="h-full w-full p-3">
                            <h1 className="font-normal text-3xl mb-3">Dashboard</h1>
                            <h1 className="font-normal text-xl text-left mb-3">School : <span>School of Information and Communication Technology</span></h1>
                            <div className="flex items-center mb-3">
                                <button 
                                value = { 'CSE' }
                                onClick = { (e) => { setActiveTab(e.target.value)} }
                                className={`w-1/3 border px-4 py-1 bg-white transition duration-150 hover:border-black hover:font-semibold ${activeTab == 'CSE' ? 'border-2 border-black font-semibold' : '' }`}>CSE</button>
                                <button 
                                value = { 'IT' }
                                onClick = { (e) => { setActiveTab(e.target.value)} }
                                className={`w-1/3 border px-4 py-1 bg-white transition duration-150 hover:border-black hover:font-semibold ${activeTab == 'IT' ? 'border-2 border-black font-semibold' : '' }`}>IT</button>
                                <button 
                                value = { 'ECE' }
                                onClick = { (e) => { setActiveTab(e.target.value)} } 
                                className={`w-1/3 border px-4 py-1 bg-white text-base transition duration-150 hover:border-black hover:font-semibold ${activeTab == 'ECE' ? 'border-2 border-black font-semibold' : '' }`}>ECE</button>
                            </div>
                            <div className="w-auto h-[70%] flex items-start">

                                {/* CSE Tab */}
                                <div className={`py-1 text-base ${activeTab == 'CSE' ? 'w-full' : 'hidden' }`}>
                                    {/* Header - Search and Buttons */}
                                    <div className="w-full flex justify-between gap-3 mb-5">
                                        <div className="h-12 w-2/3 border bg-white px-5 flex justify-start items-center">
                                            <label className="mr-3">Course Code</label>
                                            <input 
                                            value={ searchSubject }
                                            onChange={(e) => {setSearchSubject(e.target.value)}}
                                            className="border w-20 border-black px-3 rounded-sm" maxLength={5} placeholder="Search Subject Code"/>
                                            <input value={searchedSubject.length != 0 ? searchedSubject.subName : '' } disabled className={`cursor-not-allowed w-80 border border-black px-3 ml-3 rounded-sm`} placeholder="Subject Name" />
                                            <button className="ml-3 rounded-sm w-auto border px-3 border-black" type="submit" value={searchClicked} onClick={searchHandle}>Search</button>
                                        </div>
                                        <div className="w-1/3 flex justify-between">
                                            <button 
                                            value={addSubject}
                                            onClick={ () => {setAddSubject(!addSubject)}}
                                            className="w-[49%] border bg-blue-300 text-black px-4 py-1 rounded transition duration-150 hover:border-blue-600 hover:font-medium">Add New</button>
                                            <button 
                                            value={ viewAllSubjects }
                                            onClick={ () => {setViewAllSubjects(!viewAllSubjects)} }
                                            className="w-[49%] border bg-blue-300 text-black px-4 py-1 rounded transition duration-150 hover:border-blue-600 hover:font-medium">{viewAllSubjects ? 'Back' : 'View All' }</button>
                                        </div>
                                    </div>
                                    {/* Default edit subject */}
                                    <div className={`h-[336px] border overflow-scroll w-full ${viewAllSubjects ? 'hidden' : 'w-full' }`}>
                                        <table className="w-full relative h-full text-center">
                                            <thead className="">
                                                <tr className="h-12 border bg-[#fff]">
                                                    <td className="w-[10%] border font-semibold">Year</td>
                                                    <td className="w-[10%] border font-semibold">Semester</td>
                                                    <td className="w-[40%] border font-semibold">Link</td>
                                                    <td className="w-[40%] border font-semibold">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody className="h-[288px] overflow-auto">
                                                <tr className="h-12 border border-b-0">
                                                    <td>2025</td>
                                                    <td>Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0">
                                                    <td></td>
                                                    <td>End</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                    <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                    <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-b-0 bg-white">
                                                    <td className="border-r">2024</td>
                                                    <td className="border-r">Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0 bg-white">
                                                    <td className="border-r"></td>
                                                    <td className="border-r">End</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td>
                                                    <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                    <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-b-0">
                                                    <td>2023</td>
                                                    <td>Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0">
                                                    <td></td>
                                                    <td>End</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border-b-0 bg-[#fff]">
                                                    <td className="border-r">2022</td>
                                                    <td className="border-r">Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td className="border-r">
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border-t-0 bg-[#fff]">
                                                    <td className="border-r"></td>
                                                    <td className="border-r">End</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td className="border-r">
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* View All Subjects */}
                                    <div className={`w-full h-[50vh] overflow-scroll ${viewAllSubjects ? 'w-full' : 'hidden'}`}>
                                        <table className="h-auto w-full text-center border bg-white">
                                            <thead className="font-semibold">
                                                <tr className="h-12">
                                                    <td className="border w-[10%]">S.no</td>
                                                    <td className="border w-[15%]">Course Code</td>
                                                    <td className="border w-[36%]">Course Name</td>
                                                    <td className="border w-[13%]">Exam Year</td>
                                                    <td className="border w-[13%]">Mid Sem</td>
                                                    <td className="border w-[13%]">End Sem</td>
                                                </tr>
                                            </thead>
                                            {fetchSubjects.map((subject, index) => (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td className="h-10 border-r">{index + 1}</td>
                                                        <td className="h-10 border-r">{subject.subCode.toUpperCase()}</td>
                                                        <td className="h-10 border-r">{subject.subName}</td>
                                                        <td className="h-10 border-r">{subject.year2025.year}</td>
                                                        <td className="h-10 border-r">{subject.year2025.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2025.endSem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2024.year}</td>
                                                        <td className="h-10 border-r">{subject.year2024.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2024.endSem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2023.year}</td>
                                                        <td className="h-10 border-r">{subject.year2023.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2023.endSem}</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2022.year}</td>
                                                        <td className="h-10 border-r">{subject.year2022.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2022.endSem}</td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </table>
                                        {fetchSubjects.length == 0 ? <p className="h-[85%] bg-white border flex justify-center items-center">No Data Found!</p> : ''}
                                    </div>
                                </div>

                                {/* IT Tab */}
                                <div className={`py-1 text-base ${activeTab == 'IT' ? 'w-full' : 'hidden' }`}>
                                    {/* Header - Search and Buttons */}
                                    <div className="w-full flex justify-between gap-3 mb-5">
                                        <div className="h-12 w-2/3 border bg-white px-5 flex justify-start items-center">
                                            <label className="mr-3">Course Code</label>
                                            <input 
                                            value={ searchSubject }
                                            onChange={ searchHandle }
                                            className="border border-black px-3 rounded-sm" maxLength={5} placeholder="Search Subject Code"/>
                                            <input disabled className="cursor-not-allowed border border-black px-3 ml-3 rounded-sm w-auto" placeholder="Subject Name Here" />
                                        </div>
                                        <div className="w-1/3 flex justify-between">
                                            <button 
                                            value={addSubject}
                                            onClick={ () => {setAddSubject(!addSubject)}}
                                            className="w-[49%] border bg-blue-300 text-black px-4 py-1 rounded transition duration-150 hover:border-blue-600 hover:font-medium">Add New</button>
                                            <button 
                                            value={ viewAllSubjects }
                                            onClick={ () => {setViewAllSubjects(!viewAllSubjects)} }
                                            className="w-[49%] border bg-blue-300 text-black px-4 py-1 rounded transition duration-150 hover:border-blue-600 hover:font-medium">{viewAllSubjects ? 'Back' : 'View All' }</button>
                                        </div>
                                    </div>
                                    {/* Default edit subject */}
                                    <div className={`h-[336px] border overflow-scroll ${viewAllSubjects ? 'hidden' : 'w-full' }`}>
                                        <table className="w-full relative h-full text-center">
                                            <thead className="">
                                                <tr className="h-12 border bg-[#fff]">
                                                    <td className="w-[10%] border font-semibold">Year</td>
                                                    <td className="w-[10%] border font-semibold">Semester</td>
                                                    <td className="w-[40%] border font-semibold">Link</td>
                                                    <td className="w-[40%] border font-semibold">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody className="h-[288px] overflow-auto">
                                                <tr className="h-12 border border-b-0">
                                                    <td>2025</td>
                                                    <td>Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0">
                                                    <td></td>
                                                    <td>End</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                    <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                    <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-b-0 bg-white">
                                                    <td className="border-r">2024</td>
                                                    <td className="border-r">Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0 bg-white">
                                                    <td className="border-r"></td>
                                                    <td className="border-r">End</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td>
                                                    <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                    <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-b-0">
                                                    <td>2023</td>
                                                    <td>Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0">
                                                    <td></td>
                                                    <td>End</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border-b-0 bg-[#fff]">
                                                    <td className="border-r">2022</td>
                                                    <td className="border-r">Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td className="border-r">
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border-t-0 bg-[#fff]">
                                                    <td className="border-r"></td>
                                                    <td className="border-r">End</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td className="border-r">
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* View All Subjects */}
                                    <div className={`w-full h-[50vh] overflow-scroll ${viewAllSubjects ? 'w-full' : 'hidden'}`}>
                                        <table className="h-auto w-full text-center border bg-white">
                                            <thead className="font-semibold">
                                                <tr className="h-12">
                                                    <td className="border w-[10%]">S.no</td>
                                                    <td className="border w-[15%]">Course Code</td>
                                                    <td className="border w-[36%]">Course Name</td>
                                                    <td className="border w-[13%]">Exam Year</td>
                                                    <td className="border w-[13%]">Mid Sem</td>
                                                    <td className="border w-[13%]">End Sem</td>
                                                </tr>
                                            </thead>
                                            {fetchSubjects.map((subject, index) => (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td className="h-10 border-r">{index + 1}</td>
                                                        <td className="h-10 border-r">{subject.subCode.toUpperCase()}</td>
                                                        <td className="h-10 border-r">{subject.subName}</td>
                                                        <td className="h-10 border-r">{subject.year2025.year}</td>
                                                        <td className="h-10 border-r">{subject.year2025.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2025.endSem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2024.year}</td>
                                                        <td className="h-10 border-r">{subject.year2024.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2024.endSem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2023.year}</td>
                                                        <td className="h-10 border-r">{subject.year2023.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2023.endSem}</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2022.year}</td>
                                                        <td className="h-10 border-r">{subject.year2022.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2022.endSem}</td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </table>
                                        {fetchSubjects.length == 0 ? <p className="h-[85%] bg-white border flex justify-center items-center">No Data Found!</p> : ''}
                                    </div>
                                </div>

                                {/* ECE Tab */}
                                <div className={`py-1 text-base ${activeTab == 'ECE' ? 'w-full' : 'hidden' }`}>
                                    {/* Header - Search and Buttons */}
                                    <div className="w-full flex justify-between gap-3 mb-5">
                                        <div className="h-12 w-2/3 border bg-white px-5 flex justify-start items-center">
                                            <label className="mr-3">Course Code</label>
                                            <input 
                                            value={ searchSubject }
                                            onChange={ searchHandle }
                                            className="border border-black px-3 rounded-sm" maxLength={5} placeholder="Search Subject Code"/>
                                            <input disabled className="cursor-not-allowed border border-black px-3 ml-3 rounded-sm w-auto" placeholder="Subject Name Here" />
                                        </div>
                                        <div className="w-1/3 flex justify-between">
                                            <button 
                                            value={addSubject}
                                            onClick={ () => {setAddSubject(!addSubject)}}
                                            className="w-[49%] border bg-blue-300 text-black px-4 py-1 rounded transition duration-150 hover:border-blue-600 hover:font-medium">Add New</button>
                                            <button 
                                            value={ viewAllSubjects }
                                            onClick={ () => {setViewAllSubjects(!viewAllSubjects)} }
                                            className="w-[49%] border bg-blue-300 text-black px-4 py-1 rounded transition duration-150 hover:border-blue-600 hover:font-medium">{viewAllSubjects ? 'Back' : 'View All' }</button>
                                        </div>
                                    </div>
                                    {/* Default edit subject */}
                                    <div className={`h-[336px] border overflow-scroll ${viewAllSubjects ? 'hidden' : 'w-full' }`}>
                                        <table className="w-full relative h-full text-center">
                                            <thead className="">
                                                <tr className="h-12 border bg-[#fff]">
                                                    <td className="w-[10%] border font-semibold">Year</td>
                                                    <td className="w-[10%] border font-semibold">Semester</td>
                                                    <td className="w-[40%] border font-semibold">Link</td>
                                                    <td className="w-[40%] border font-semibold">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody className="h-[288px] overflow-auto">
                                                <tr className="h-12 border border-b-0">
                                                    <td>2025</td>
                                                    <td>Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0">
                                                    <td></td>
                                                    <td>End</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                    <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                    <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-b-0 bg-white">
                                                    <td className="border-r">2024</td>
                                                    <td className="border-r">Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0 bg-white">
                                                    <td className="border-r"></td>
                                                    <td className="border-r">End</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td>
                                                    <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                    <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-b-0">
                                                    <td>2023</td>
                                                    <td>Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border border-t-0">
                                                    <td></td>
                                                    <td>End</td>
                                                    <td className="text-blue-400 underline cursor-pointer">View Document</td>
                                                    <td>
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border-b-0 bg-[#fff]">
                                                    <td className="border-r">2022</td>
                                                    <td className="border-r">Mid</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td className="border-r">
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr className="h-12 border-t-0 bg-[#fff]">
                                                    <td className="border-r"></td>
                                                    <td className="border-r">End</td>
                                                    <td className="text-blue-400 underline cursor-pointer border-r">View Document</td>
                                                    <td className="border-r">
                                                        <button className="w-28 border mr-5 bg-emerald-400 text-black px-4 py-1 rounded transition duration-150 hover:border-emerald-600 hover:font-medium">Update</button>
                                                        <button className="w-28 border bg-red-400 px-4 py-1 rounded transition duration-150 hover:border-black hover:font-medium">Remove</button>
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* View All Subjects */}
                                    <div className={`w-full h-[50vh] overflow-scroll ${viewAllSubjects ? 'w-full' : 'hidden'}`}>
                                        <table className="h-auto w-full text-center border bg-white">
                                            <thead className="font-semibold">
                                                <tr className="h-12">
                                                    <td className="border w-[10%]">S.no</td>
                                                    <td className="border w-[15%]">Course Code</td>
                                                    <td className="border w-[36%]">Course Name</td>
                                                    <td className="border w-[13%]">Exam Year</td>
                                                    <td className="border w-[13%]">Mid Sem</td>
                                                    <td className="border w-[13%]">End Sem</td>
                                                </tr>
                                            </thead>
                                            {fetchSubjects.map((subject, index) => (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td className="h-10 border-r">{index + 1}</td>
                                                        <td className="h-10 border-r">{subject.subCode.toUpperCase()}</td>
                                                        <td className="h-10 border-r">{subject.subName}</td>
                                                        <td className="h-10 border-r">{subject.year2025.year}</td>
                                                        <td className="h-10 border-r">{subject.year2025.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2025.endSem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2024.year}</td>
                                                        <td className="h-10 border-r">{subject.year2024.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2024.endSem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2023.year}</td>
                                                        <td className="h-10 border-r">{subject.year2023.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2023.endSem}</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r"></td>
                                                        <td className="h-10 border-r">{subject.year2022.year}</td>
                                                        <td className="h-10 border-r">{subject.year2022.midSem}</td>
                                                        <td className="h-10 border-r">{subject.year2022.endSem}</td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </table>
                                        {fetchSubjects.length == 0 ? <p className="h-[85%] bg-white border flex justify-center items-center">No Data Found!</p> : ''}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={`w-[80%] h-[6vh] flex items-center justify-center fixed bottom-0 bg-white border ${menu ? 'w-[95%]' : 'w-[80%]'}`}>
                        <div>Developed & Maintained by <a href='https://linktr.ee/linkxnishant' target='_blank'><u><b>Nishant Chauhan</b></u></a></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;