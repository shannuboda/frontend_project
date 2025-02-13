import Header from './Header'
import Profile_Card from './Profile_Card'
import Quick_followups from './Quick_followups'
import Edutech_Media from './Edutech_Media'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from 'primereact/skeleton';


function Dashboard() {
    const [response, setResponse] = useState(null); // Initialize with null
    const [studentData, setStudentData] = useState(null); // Initialize with null
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false)
  
    // Fetch student data from the server
    const getStudentData = async () => {
      try {
        // Ensure response is not null or undefined
        if (!response || !response.username || !response.year) {
          console.warn('Response is not properly initialized. Skipping fetch.');
          return;
        }
        setLoader(true)
        const get_res = await axios.get(`https://backend-project-1nk6.onrender.com/getData/${response.username}/${response.year}`);
        setStudentData(get_res.data); // Directly use `get_res.data`
        console.log(get_res.data);
        setLoader(false)
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
        toast.success("Login Successfull!!!");

      }
    }, [response]);
    
  return (
    <>
    {
      loader ? 
      <div className="border-round border-1 surface-border p-4 surface-card">
    <div className="flex mb-3">
        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
        <div>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
        </div>
    </div>
    <Skeleton width="100%" height="150px"></Skeleton>
    <div className="flex justify-content-between mt-3">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
    </div>
</div>
         
      :(<div>
         <Toaster
  position="top-right"
  reverseOrder={true}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#ffff',
      color: 'black',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'white',
      },
    },
  }}
/>
      <Header studentData={studentData}></Header>
      <Profile_Card studentData={studentData}></Profile_Card>
      <Quick_followups></Quick_followups>
      <Edutech_Media studentData={studentData}></Edutech_Media>
      <Footer></Footer>
    </div>)
    }
    
    
    </>
   
  )
}

export default Dashboard
