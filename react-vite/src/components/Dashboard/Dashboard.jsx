import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "./Dashboard.css";
import Navigation from "../Navigation/Navigation";
import { fetchClasses } from "../../redux/class";
import EditClassModal from "./EditClassModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateClassModal from "./CreateClassModal";
import DeleteClassModal from "./DeleteClassModal";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const handleGradeBook = (classId) => {
    navigate(`/gradebook/${classId}`)
  }

  useEffect(() => {
    dispatch(fetchClasses()).then(() => setIsLoaded(true));
  }, [dispatch]);

  


  return (
    <>
      <Navigation/>
      <h1>Dashboard</h1>
      {isLoaded && (
        <div className="mainCon">
          <div id='profileSide'>
            <div id="profileCon">
              <div id="profilePicCon">
                <FiUser id='profilePic'/>
              </div>
              <div id="profileInfoCon">
                <h2 className="profileInfo">{user.first_name} {user.last_name}</h2>
                {(user.type == 'teacher') ? (<>
                <h4 className="profileInfo">Teacher</h4>
                <h4 className="profileInfo">Primary Grade: {user.teacher.primary_grade}</h4>
                <h4 className="profileInfo">Primary Subject: {user.teacher.primary_subject}</h4>
                </>):(<>
                  <h4 className="profileInfo">Student</h4>
                  <h4 className="profileInfo">Grade: {user.student.grade}th</h4>
                </>)}
              </div>
            </div>
            <OpenModalButton
              buttonText={'New Class'}
              modalComponent={<CreateClassModal />}
              cssClasses={'newClassButton'}
            />
          </div>
          <div id="classesCon">
            {(user.type == 'teacher') ? (<>
                {classes.map((class_, index) => (
                  <div id="classCon" key={`classConT${index}`}>
                    <h3 className="classInfo">{class_.grade}th Grade {class_.name} - {class_.period} Period</h3>
                    <h4 className="classInfo">Room - {class_.room}, {class_.num_students} Students</h4>
                    <div className="classButtonsCon">
                      <button 
                        onClick={() => handleGradeBook(class_.id)} 
                        className="classButton gradeBook"
                      >Grade Book</button>
                      <OpenModalButton
                        buttonText={'Edit'}
                        modalComponent={<EditClassModal classEdit={class_} />}
                        cssClasses={'classButton edit'}
                      />
                      <OpenModalButton
                        buttonText={'Delete'}
                        modalComponent={<DeleteClassModal classDelete={class_} />}
                        cssClasses={'classButton delete'}
                      />
                    </div>
                  </div>
                ))}
              </>):(<>
                {classes.map((class_, index) => (
                  <div id="classCon" key={`classConS${index}`}>
                    <h3 className="classInfo">{class_.grade}th Grade {class_.name} - {class_.period} Period</h3>
                    <h4 className="classInfo">{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
                    <h4 className="classInfo">Room - {class_.room}</h4>
                    <h4 className="currentGrade">Current Grade: {class_.current_grade}</h4>
                  </div>
                ))}
              </>)}
          </div>
          <ul>
            
            
          </ul>
        </div>
      )}
    </>
  );
}

export default Dashboard;
