import { useState, useEffect } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Supply_Data() {
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
  // console.log(studentData);

  //   semesters data fetching api
  const handleSemesterChange = (event) => {
    console.log(event.target.value);
    setselectedSemester(event.target.value);
  };

  const handleSubmit = async () => {
    const semData = await axios.get(
      `https://backend-project-1nk6.onrender.com/getsupply/${response.username}/${response.year}/${selectedSemester}/${response.branch}/${response.regulation}`
    );

    if (semData.data.message === "No Data Found") {
      toast.error("No Data Found, Please Contact Your Administrator");
    }
    setMarksheetData(semData.data);
  };
  // console.log("ssdd", GPA);

  // Print Mode
  const [isPrintMode, setIsPrintMode] = useState(false);

  const handleCheckboxChange = (id) => {
    setMarksheetData((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false); // Reset after print
    }, 100);
  };

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "black",
            color: "white",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
        }}
      />

      <Header studentData={studentData}></Header>

      <div className="marksheet-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to the Marksheets Page</h1>
          <p>
            Select your semester from the dropdown below to view the marksheet
            data.
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
            </div>

            <table className="marksheet-table">
              <thead>
                <tr>
                  <th>Selection</th>
                  <th>Subject Name</th>
                  <th>Status(Pass/Fail)</th>
                  <th>Subject Credits</th>
                  <th>Subject Grade</th>
                </tr>
              </thead>
              {
                <tbody>
                  {marksheetData
                    .filter((student) => !isPrintMode || student.checked)
                    .map((student, index) => (
                      <tr key={index} data-checked={student.checked}>
                        <td>
                          <input
                            type="checkbox"
                            name=""
                            id={index + 1}
                            checked={student.checked}
                            onChange={() => handleCheckboxChange(student.id)}
                          />
                        </td>
                        <td>{student.name}</td>
                        <td>{student.status}</td>
                        <td>{student.credits}</td>
                        <td>{student.grade}</td>
                      </tr>
                    ))}
                </tbody>
              }
            </table>
          </div>
        )}
        <button type="button" onClick={() => handlePrint()}>
          Print
        </button>
      </div>
    </div>
  );
}

export default Supply_Data;
