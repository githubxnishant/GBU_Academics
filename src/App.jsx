import React from 'react';
import Homepage from './Components/MainBody/Homepage';
import Dashboard from './Pages/Admin/Dashboard';
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
import Login from './Pages/Admin/Login';
import ProtectedRoute from './Context/ProtectedRoute';

function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/cse' element={<CSE />} />
          <Route path='/it' element={<IT />} />
          <Route path='/ece' element={<ECE />} />
          <Route path='/bt' element={<BT />} />
          <Route path='/lb' element={<LB />} />
          <Route path='/mb' element={<MB />} />
          <Route path='/ar' element={<AR />} />
          <Route path='/ce' element={<CE />} />
          <Route path='/ee' element={<EE />} />
          <Route path='/me' element={<ME />} />
          <Route path='/eece' element={<EECE />} />
          <Route path='/en' element={<EN />} />
          <Route path='/ep' element={<EP />} />
          <Route path='/et' element={<ET />} />
          <Route path='/hc' element={<HC />} />
          <Route path='/il' element={<IL />} />
          <Route path='/mc' element={<MC />} />
          <Route path='/cs' element={<CS />} />
          <Route path='/es' element={<ES />} />
          <Route path='/ft' element={<FT />} />
          <Route path='/ma' element={<MA />} />
          <Route path='/ph' element={<PH />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export const server = 'https://gbu-academics-backend.onrender.com';
// export const server = 'https://localhost:3000';

export default App;
