import { useState, useEffect } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Sem_Data() {
  const [selectedSemester, setselectedSemester] = useState("");
  const [marksheetData, setMarksheetData] = useState([]);
  const [response, setResponse] = useState(null); // Initialize with null
  // Login related code
  console.log(response);

  const navigate = useNavigate();
  useEffect(() => {
    const localResponse = localStorage.getItem("response");
    if (!localResponse) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      setResponse(JSON.parse(localResponse)); // Parse and set response
    }
  }, [navigate]);

  //   local storage related code
  const studentData = useLocation().state;
  console.log(studentData);

  //   semesters data fetching api
  const handleSemesterChange = (event) => {
    console.log(event.target.value);
    setselectedSemester(event.target.value);
  };

  const handleSubmit = async () => {
    const semData = await axios.get(
      `http://localhost:3000/getsem1/${response.username}/${response.year}/${selectedSemester}`
    );
    setMarksheetData(semData.data[0].subjects);
    console.log("ssdd", marksheetData);
  };

  return (
    <div>
      <Header studentData={studentData}></Header>

      <div className="marksheet-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to the Marksheets Page</h1>
          <p>
            Select a subject from the dropdown below to view the marksheet data.
          </p>
        </div>

        {/* Dropdown and Submit Button */}
        <div className="dropdown-container">
          <select
            className="subject-dropdown"
            value={selectedSemester}
            onChange={handleSemesterChange}
          >
            <option value="">Select Semester</option>
            <option value="SEMESTER1">1-1</option>
            <option value="SEMESTER2">1-2</option>
            <option value="SEMESTER3">2-1</option>
            <option value="SEMESTER4">2-2</option>

            <option value="SEMESTER5">3-1</option>
            <option value="SEMESTER6">3-2</option>
            <option value="SEMESTER7">4-1</option>
            <option value="SEMESTER8">4-2</option>
          </select>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {/* Marks Table */}
        {marksheetData.length > 0 && (
          <div className="marksheet-table-container">
            <div
              className="stu_intro"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="stu_intro_1">
                <h3>Name: {response.username}</h3>
                <h3>Regulation: {response.regulation}</h3>
                <h3>Batch: {response.year}</h3>
              </div>
              <div className="stu_intro_2">
                <h3>SGPA: 8.16</h3>
              </div>
            </div>

            <table className="marksheet-table">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Subject Name</th>
                  <th>Status(Pass/Fail)</th>
                  <th>Subject Credits</th>
                  <th>Subject Grade</th>
                </tr>
              </thead>
              <tbody>
                {marksheetData.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.status}</td>
                    <td>{student.credits}</td>
                    <td>{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sem_Data;
