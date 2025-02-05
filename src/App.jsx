// import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MDBContainer from "./links/Login";
import Dashboard from "./links/Dashboard";
import { useEffect, useState } from "react";
import Sem_Data from "./links/Sem_Data";
import CGPA from "./links/CGPA";
import Supply_Data from "./links/Supply_Data";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
 
  return (
    <>
    
        <Routes>
          <Route path="/" element={<MDBContainer></MDBContainer>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/sem_data" element={<Sem_Data />}></Route>
          <Route path="/cgpa" element={<CGPA></CGPA>}></Route>
          <Route path="/supply" element={<Supply_Data></Supply_Data>}></Route>

        </Routes>
     
    </>
  );
}

export default App;
