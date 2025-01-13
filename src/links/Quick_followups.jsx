
import { BsAwardFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";

export default function Quick_followups() {
  const cards = [
    {
      id: 1,
      hyperlink: "https://jntuaresults.ac.in",
      icon: <PiStudentFill></PiStudentFill>,
      title: "JNTUA RESULTS",
      description: "Goto Jntua Results Portal",
    },
    {
      id: 2,
      hyperlink: "https://svportal.iblogger.org",
      icon: <FaBookReader />,
      title: "E Learning",
      description: "Explore Engineering Materials.",
    },
    {
      id: 3,
      hyperlink: "https://jntuaresults.ac.in",
      icon: <PiExamFill />,
      title: "MID Examinations",
      description: "Mid Examination Portal.",
    },
    {
      id: 4,
      hyperlink: "https://jntuaresults.ac.in",
      icon: <BsAwardFill />,
      title: "Syllabus Design",
      description: "Information on All Semesters Syllabus.",
    },
  ];

  return (
    <div className="quick_follow_up">
      {/* <h2 className="quick_follow_heading">Portal Quick Access</h2> */}
       <div className="section-header text-center advertisers-service-sec">
        <h2 className="fw-bold fs-1">
        Portal 
          <span className="b-class-secondary"> Quick </span>Access
        </h2>
        <p className="sec-icon"><i className="fa-solid fa-gear"></i></p>
      </div>
      <div className="card-container-unique">
        {cards.map((card) => (
          <div key={card.id} className="card-unique">
            <a href={card.hyperlink} target="_blank" rel="noopener noreferrer">
              <h1>{card.icon}</h1>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
