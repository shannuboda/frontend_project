import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/cgpa.css"
function CGPA() {
  const [response, setResponse] = useState(null); // Initialize with null
  const [credit_record, setCreditRecord] = useState([]);
  const [gpa_record, setgpaRecord] = useState([]);
  const navigate = useNavigate();

  // Function to calculate CGPA
  const cal_cgpa = () => {
    if (!credit_record.length || !gpa_record.length) {
      return "0.00"; // Return 0 if data is not available
    }

    const credit_count = credit_record.reduce((prevValue, currentValue) => prevValue + currentValue, 0);

    const cal_GPA = gpa_record.reduce((sum, gpa, index) => {
      return sum + gpa * credit_record[index];
    }, 0);

    return (cal_GPA / credit_count).toFixed(2);
  };

  // Fetch data for GPA and credits
  const gpaCalci = async () => {
    try {
      const GPAResults = await axios.get(
        `https://backend-project-1nk6.onrender.com/getcgpa/${response.username}/${response.year}/${response.branch}/${response.regulation}`
      );
      console.log(GPAResults.data);
      setCreditRecord(GPAResults.data.records_credits || []);
      setgpaRecord(GPAResults.data.records_gpa || []);
    } catch (error) {
      console.error("Error fetching GPA data:", error);
    }
  };

  // Effect to fetch initial response
  useEffect(() => {
    const localResponse = localStorage.getItem("response");
    if (!localResponse) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      setResponse(JSON.parse(localResponse)); // Parse and set response
    }
  }, [navigate]);

  // Effect to fetch GPA and credit records
  useEffect(() => {
    if (response) {
      gpaCalci();
    }
  }, [response]);

  // Log data for debugging
  console.log("Credit Record:", credit_record);
  console.log("GPA Record:", gpa_record);

  // Calculate CGPA
  const final_CGPA = cal_cgpa();
  console.log("Final Record",final_CGPA);
  
 return (
<>

<div id="borderimg1">
      <h3 className="center">SV COLLEGE OF ENGINEERING</h3>
      <p>(Approved by AICTE, Affiliated to JNTUA)</p>
      <p>Balaji Nagar, Kadapa - 516003</p>
      <hr />

      <h4 className="center" style={{ color: "blue" }}>
        Student All Semesters SGPA & CGPA Report Card
      </h4>
      <hr style={{ color: "red" }} />

    
      <div className="report-card">
        <h3>
        <span>Student RollNumber: <u>{response && response.username}</u></span>

          <span style={{ marginLeft: "20px" }}>Student Regulation: <u>{response && response.regulation}</u></span>
        </h3>
        <br />
        <h3>
          Section: <u>{response && response.branch}</u>
          <span style={{ marginLeft: "20px" }}>Academic Year: <u>{response && response.year}</u></span>
          <span style={{ marginLeft: "20px" }}>Final CGPA: <u>{final_CGPA}</u></span>
        </h3>
        <hr style={{ color: "red" }} />
        <hr style={{ color: "blue" }} />

        {["I YEAR", "II YEAR", "III YEAR", "IV YEAR"].map((year, index) => {
  // Safely access gpa_record and credit_record with a fallback to "0"
  const gpaFirstSem = gpa_record?.[index * 2] || "0"; // First Semester SGPA
  const creditFirstSem = credit_record?.[index * 2] || "0"; // First Semester Credits
  const gpaSecondSem = gpa_record?.[index * 2 + 1] || "0"; // Second Semester SGPA
  const creditSecondSem = credit_record?.[index * 2 + 1] || "0"; // Second Semester Credits

  return (
    <div key={index} style={{ background: "#ffc300" }}>
      <h2 align="center" className="year">
        {year}
      </h2>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th colSpan="2">I Semester</th>
            <th></th>
            <th colSpan="2">II Semester</th>
          </tr>
          <tr style={{ border: "2px solid black" }}>
            <td style={{ border: "2px solid black" }}>SGPA</td>
            <td style={{ border: "2px solid black" }}>TOTAL CREDITS SCORED</td>
            <td style={{ border: "2px solid black" }}></td>
            <td style={{ border: "2px solid black" }}>SGPA</td>
            <td style={{ border: "2px solid black" }}>TOTAL CREDITS SCORED</td>
          </tr>
        </thead>
        <tbody style={{ border: "2px solid black" }}>
          <tr style={{ border: "2px solid black" }}>
            <td style={{ border: "2px solid black" }}>{gpaFirstSem}</td>
            <td style={{ border: "2px solid black" }}>{creditFirstSem}</td>
            <td style={{ border: "2px solid black" }}></td>
            <td style={{ border: "2px solid black" }}>{gpaSecondSem}</td>
            <td style={{ border: "2px solid black" }}>{creditSecondSem}</td>
          </tr>
        </tbody>
      </table>
      <hr style={{ color: "red" }} />
      <hr style={{ color: "blue" }} />
    </div>
  );
})}

      </div>

      <br />
      <br />
      <button
        id="printButton"
        className="button button1"
        onClick={() => window.print()}
      >
        Print Data
      </button>
      <button
        className="button button2"
        onClick={() => (window.location.href = "../homepage.php")}
      >
        Go to HomePage Here
      </button>
      <button
        className="btn btn-danger"
        onClick={() => (window.location.href = "../logout.php")}
        id="button3"
      >
        LOGOUT Here
      </button>
    </div>

</>
 )
}
 export default CGPA;