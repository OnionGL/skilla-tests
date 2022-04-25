import React, { useEffect } from 'react'
import {
   Routes,
   Route,
   Navigate,
   BrowserRouter} from 'react-router-dom'
import NavBar from '../Component/NavBar/NavBar'
import Call from '../Component/Call/Call'


export default function AppRouting() {
   return <>
   <div style={{
      display: 'flex',
      height: '100vh'
   }}>  
      <BrowserRouter>
      <NavBar />
      <Routes>
         <Route exact path="/" element={<Call />}/>
      </Routes>
      </BrowserRouter>
   </div>
     
      
   </>
}
