
import { useEffect, useState } from "react";
import "../css/profilecard.css";
function Profile_Card({studentData}) {
    const [student,setStudentData] = useState({})
    console.log("kaka",student);
    
    useEffect(() => {
        if (studentData) {
          setStudentData(studentData[0]);
        }
      }, [studentData]); // Trigger useEffect when studentData changes
    
  return (
    <div>
      {/* Dashboard Content */}
      <div className="content">
        
        <h2>Your Personal Dashboard</h2>
        <p>
          Welcome to your student dashboard. This is where you can see all your
          information here.
        </p>

        <div className="profile-content">
        <div className="profile-card">
      <div className="profile-card-left">
        <img
          src={"https://pbs.twimg.com/profile_images/1371404992951717890/va7zovD-_400x400.jpg"}
          alt="Profile"
          className="profile-image"
        />
        <h3>Personal Profile Card</h3>
        <img
          src={student.photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <hr />
      <div className="profile-card-right">
  <h2>{student.name}</h2>
  <table className="student-details-table">
    <tbody>
      <tr>
        <td><strong>Student Roll No:</strong></td>
        <td>{student.rollnu}</td>
        <td><strong>Course:</strong></td>
        <td>{student.course}</td>
      </tr>
      <tr>
        <td><strong>Father Name:</strong></td>
        <td>{student.FatherName}</td>
        <td><strong>Mother Name:</strong></td>
        <td>{student.MotherName}</td>
      </tr>
      <tr>
        <td><strong>Section:</strong></td>
        <td>{student.Branch_section}</td>
        <td><strong>Student Phone:</strong></td>
        <td>{student.PhoneNumber}</td>
      </tr>
      <tr>
        <td><strong>Student Email:</strong></td>
        <td>{student.email}</td>
        <td><strong>Current Year:</strong></td>
        <td>{student.year}</td>
      </tr>
      <tr>
        <td><strong>Current Semester:</strong></td>
        <td>{student.semester}</td>
        <td><strong>Current Address:</strong></td>
        <td>{student.address}</td>
      </tr>
      <tr>
        <td><strong>Current CGPA:</strong></td>
        <td colSpan="3">{student.cgpa}</td>
      </tr>
    </tbody>
  </table>
  <div className="profile-actions">
    <button className="action-btn edit-btn">Edit Profile</button>
    <button className="action-btn message-btn">Message</button>
  </div>
</div>
    </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Profile_Card;
