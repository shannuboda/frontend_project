// import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MDBContainer from "./links/Login";
import Dashboard from "./links/Dashboard";
import { useEffect, useState } from "react";

function App() {
 
  return (
    <>
    
        <Routes>
          <Route path="/" element={<MDBContainer></MDBContainer>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
     
    </>
  );
}

export default App;
