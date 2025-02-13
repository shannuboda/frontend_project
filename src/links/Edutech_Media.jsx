import { Navigate, useNavigate } from "react-router-dom";

function Edutech_Media({studentData}) {
    console.log("This is from edutech",studentData);
    
    const navigate = useNavigate()
  return (
    <div>
      <section id="advertisers" className="advertisers-service-sec pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="section-header text-center">
              <h2 className="fw-bold fs-1">
                Your
                <span className="b-class-secondary"> Academic </span>Followups
              </h2>
              <p className="sec-icon">
                <i className="fa-solid fa-gear"></i>
              </p>
            </div>
          </div>
          <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
            <div className="col" onClick={()=>{navigate('/cgpa',{state:studentData})}}>
              <div className="service-card">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-user-graduate"></i>
                </div>
                <h3>Tracking Academic Progress</h3>
                <p>Get the All Your Academic Score Cards of Your Semesters</p>
              </div>
            </div>
            <div className="col" onClick={()=>{navigate('/sem_data',{state:studentData})}}>
              <div className="service-card">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-arrows-down-to-people"></i>
                </div>
                <h3>Semester Wise Result</h3>
                <p>
                  Get Your All semesters Results along with SGPA of individual
                  Semesters
                </p>
              </div>
            </div>
            <div className="col">
              <div className="service-card" onClick={()=>{navigate('/supply',{state:studentData})}}>
                <div className="icon-wrapper">
                  <i className="fa-solid fa-pen-clip"></i>
                </div>
                <h3>Apply Examinations</h3>
                <p>
                  Apply for your Supplimentary Subject Examinations from here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Edutech_Media;
