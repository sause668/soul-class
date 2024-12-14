import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Grades.css";
import Navigation from "../Navigation/Navigation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchClass } from "../../redux/class";
import { calcFinalGradeStudent } from "../../utils/Grading";

function Grades() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  



  

  useEffect(() => {
    dispatch(fetchClass({classId})).then(() => setIsLoaded(true));
  }, [dispatch, classId]);

  if (!user || user.type != 'student') return <Navigate to="/" replace={true} />;

  return (
    <>
      <Navigation/>
      {isLoaded && (
        <div id="mainCon"> 
          <div id="headerCon">
            <div id="classInfoCon">
              <h3 id="className">{class_.grade}th Grade {class_.name} - Period {class_.period}</h3>
              <h4 className="classTeacher">{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
              <h4 className="classRoom">Room - {class_.room}</h4>
            </div>
            <div className="classGradeCon">
              <h4 className="currentGrade">Current Grade: {calcFinalGradeStudent(class_.assignments.filter(a => a.quarter == quarter))}</h4>
              <select name="quarter" id="quarter" value={quarter} onChange={(e) => setQuarter(parseInt(e.target.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="classAssignmentsCon">
            {class_.assignments.filter(a => a.quarter == quarter).map((assignment, index) => (
              <div className="assignmentCon" key={`classAssignment${index}`}>
                <h4>{assignment.name}</h4>
                <h5>Due Date: {assignment.due_date.slice(0, assignment.due_date.length - 13)}</h5>
                <h5>Grade: {assignment.grade}</h5>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Grades;
