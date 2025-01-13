import { useState } from 'react'

import "../css/dashboard.css"
import { useNavigate } from 'react-router-dom';

function Header({studentData}) {
  const studentName = studentData && studentData.length > 0 ? studentData[0].name : 'Loading...';

  const [dropdownOpen, setDropdownOpen] = useState(false);
const Navigate = useNavigate()
  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logging out...');
    localStorage.removeItem('response')
    Navigate('/')
  };

  const handleProfile = () => {
    // Implement profile view functionality here
    console.log('Viewing Profile...');
  };

  return (
    <div className="">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="logo">
          <img src="https://svcolleges.edu.in/images/sv-colleges-logo-dark.png" alt="Logo" />
        </div>
        <div className="welcome-message">
        <h2>Welcome, {studentName}!</h2>

        </div>
        <div className="profile-section">
          <div className="profile-pic" onClick={handleLogout}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7wi56Lnyh6MonPhrJ9cUVq0xFod3DJNMOA&s" alt="Profile" />
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleProfile}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

   
    </div>
  );
}

export default Header;
