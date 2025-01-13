import Header from './Header'
import Profile_Card from './Profile_Card'
import Quick_followups from './Quick_followups'
import Edutech_Media from './Edutech_Media'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const [response, setResponse] = useState(null); // Initialize with null
    const [studentData, setStudentData] = useState(null); // Initialize with null
    const navigate = useNavigate();
  
    // Fetch student data from the server
    const getStudentData = async () => {
      try {
        // Ensure response is not null or undefined
        if (!response || !response.username || !response.year) {
          console.warn('Response is not properly initialized. Skipping fetch.');
          return;
        }
        const get_res = await axios.get(`http://localhost:3000/getData/${response.username}/${response.year}`);
        setStudentData(get_res.data); // Directly use `get_res.data`
        console.log(get_res.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    // Check if user is logged in on component mount
    useEffect(() => {
      const localResponse = localStorage.getItem('response');
      if (!localResponse) {
        navigate('/'); // Redirect to login if not logged in
      } else {
        setResponse(JSON.parse(localResponse)); // Parse and set response
      }
    }, [navigate]); // Dependency includes `navigate`
  
    // Trigger data fetch when `response` is updated
    useEffect(() => {
      if (response) {
        getStudentData();
      }
    }, [response]);
    
  return (
    <div>
      <Header studentData={studentData}></Header>
      <Profile_Card></Profile_Card>
      <Quick_followups></Quick_followups>
      <Edutech_Media></Edutech_Media>
      <Footer></Footer>
    </div>
  )
}

export default Dashboard