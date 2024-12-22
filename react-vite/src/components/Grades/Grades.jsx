import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Grades.css";
import Navigation from "../Navigation/Navigation";
import { Navigate, useParams } from "react-router-dom";
import { fetchClass } from "../../redux/class";
import { calcFinalGradeStudent, calcLetterGrade } from "../../utils/Grading";

function Grades() {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  // const [errors, setErrors] = useState({});



  useEffect(() => {
    dispatch(fetchClass({classId})).then(() => setIsLoaded(true));
  }, [dispatch, classId]);

  if (!user || user.type != 'student') return <Navigate to="/" replace={true} />;

  return (
    <>
      <Navigation/>
      {isLoaded && (
        <div id="gradesCon"> 
          <div id="headerConG">
            <div id="classInfoConG" className="lightBlueBox">
              <h2 id="classNameG">{class_.grade}th Grade {class_.name} - Period {class_.period}</h2>
              <h3 id="classTeacherG">{class_.teacher.last_name}, {class_.teacher.first_name}</h3>
              <h3 id="classRoomG">Room - {class_.room}</h3>
            </div>
            <div id="classGradeConG" className="lightBlueBox">
              <h2 id="currentGradeG">Current Grade: {calcFinalGradeStudent(class_.assignments.filter(a => a.quarter == quarter))}</h2>
              <div className='quarterSelectConG'>
                <label htmlFor='quarter'>
                  <p className=''>
                    Quarter
                  </p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectG" 
                  value={quarter} 
                  onChange={(e) => setQuarter(parseInt(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
          <div id="classAssignmentsConG">
          {class_.assignments.filter(a => a.quarter == quarter).map((assignment, index) => (
            <div className="assignmentGridConG" key={`classAssignment${index}`}>
              <div className={`assignmentConG ${assignment.type}`}>
                <h3 className="assignNameG">{assignment.name}</h3>
                <h4 className="assignDueDateG">Due Date: {assignment.due_date.slice(0, assignment.due_date.length - 13)}</h4>
                <h4 className={`assignGradeG`}>Grade: {assignment.grade} ({calcLetterGrade(assignment.grade)})</h4>
              </div>
            </div>
            
          ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Grades;
