// import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MDBContainer from "./links/Login";
import Dashboard from "./links/Dashboard";
import { useEffect, useState } from "react";
import Sem_Data from "./links/Sem_Data";

function App() {
 
  return (
    <>
    
        <Routes>
          <Route path="/" element={<MDBContainer></MDBContainer>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/sem_data" element={<Sem_Data />}></Route>
        </Routes>
     
    </>
  );
}

export default App;
