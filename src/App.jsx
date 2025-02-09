import React, { useState, useEffect } from 'react';
import './App.css';
import Homepage from './Components/MainBody/Homepage';
// import Dashboard from './Pages/Admin/Dashboard';
import {BrowserRouter, Routes, Route} from  'react-router-dom';
import CSE from './Pages/SOICT/CSE';
import IT from './Pages/SOICT/IT';
import ECE from './Pages/SOICT/ECE';
import BT from './Pages/SOBT/BT';
import LB from './Pages/SOLJ&G/LB';
import MB from './Pages/SOM/MB';
import AR from './Pages/SOE/AR';
import CE from './Pages/SOE/CE';
import EECE from './Pages/SOE/ECE';
import EE from './Pages/SOE/EE';
import ME from './Pages/SOE/ME';
import EN from './Pages/SOHSS/EN';
import EP from './Pages/SOHSS/EP';
import ET from './Pages/SOHSS/ET';
import HC from './Pages/SOHSS/HC';
import IL from './Pages/SOHSS/IL';
import MC from './Pages/SOHSS/MC';
import CS from './Pages/SOVSAS/CS';
import ES from './Pages/SOVSAS/ES';
import FT from './Pages/SOVSAS/FT';
import MA from './Pages/SOVSAS/MA';
import PH from './Pages/SOVSAS/PH';

function App() {


  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}
          <Route path='/cse' element={<CSE />}></Route>
          <Route path='/it' element={<IT />}></Route>
          <Route path='/ece' element={<ECE />}></Route>
          <Route path='/bt' element={<BT />}></Route>
          <Route path='/lb' element={<LB />}></Route>
          <Route path='/mb' element={<MB />}></Route>
          <Route path='/ar' element={<AR />}></Route>
          <Route path='/ce' element={<CE />}></Route>
          <Route path='/ee' element={<EE />}></Route>
          <Route path='/me' element={<ME />}></Route>
          <Route path='/eece' element={<EECE />}></Route>
          <Route path='/en' element={<EN />}></Route>
          <Route path='/ep' element={<EP />}></Route>
          <Route path='/et' element={<ET />}></Route>
          <Route path='/hc' element={<HC />}></Route>
          <Route path='/il' element={<IL />}></Route>
          <Route path='/mc' element={<MC />}></Route>
          <Route path='/cs' element={<CS />}></Route>
          <Route path='/es' element={<ES />}></Route>
          <Route path='/ft' element={<FT />}></Route>
          <Route path='/ma' element={<MA />}></Route>
          <Route path='/ph' element={<PH />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export const server = 'https://gbu-academics-backend.onrender.com';

export default App;
