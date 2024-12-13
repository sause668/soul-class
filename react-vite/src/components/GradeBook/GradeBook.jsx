import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GradeBook.css";
import Navigation from "../Navigation/Navigation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchClass } from "../../redux/class";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "./AddStudentModal";

function GradeBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  // const assignments = class_.assignments;
  // const students = class_.students;
  // const assignLen = class_.assignments.length;
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  let gradeArr = []
  

  // const changeQuarter = (e) => {
  //   setQuarter(e.target.value)
  // }

  const weightGrade = (type) => {
    switch (type) {
      case 'W':
        return 1
      case 'Q':
        return 2
      case 'T':
        return 3
      case 'P':
        return 3
      default:
        return 1
  }
  }

  
  useEffect(() => {
    dispatch(fetchClass({classId})).then(() => setIsLoaded(true));
  }, [dispatch, classId]);

  if (!user || user.type != 'teacher') return <Navigate to="/" replace={true} />;


  return (
    <>
      <Navigation/>
      <h1>Grade Book</h1>
      {isLoaded && (
        <div id="mainCon"> 
          <div id="headerCon">
            <div id="titleCon">
              <h2 id="title"></h2>
            </div>
            <div id="optionsCon">
              <OpenModalButton
                buttonText={'New Student'}
                modalComponent={<AddStudentModal 
                  classId={classId} 
                  currentStudentIds={class_.students.map(student => student.id)} 
                />}
                cssClasses={'gradeBookButton newStudent'}
              />
              <button className="gradeBookButton newAssignment">New Assignment</button>
              <select name="quarter" id="quarter" value={quarter} onChange={(e) => setQuarter(parseInt(e.target.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <td>Students</td>
                  {class_.assignments.filter(a => a.quarter == quarter).map((assignment, index) => (
                    <td key={`assignHead${index}`}>{assignment.name}</td>
                  ))}
                  <td>Final</td>
                </tr>
              </thead>
              <tbody>
                {class_.students.map((student, iStudent) => (
                  <tr key={`studentName${iStudent}`}>
                    <td >{student.last_name}, {student.first_name}</td>
                    {class_.assignments.filter(a => a.quarter === quarter).map((assignment, iAssignment) => {
                      let grade = assignment.grades.find((grade) => {
                        return grade.student_id == student.id
                      })
                      if (grade) return <td key={`grade${iStudent}${iAssignment}`}>{grade.grade}</td>
                      return <td key={`grade${iStudent}${iAssignment}`}></td>
                    })}
                    <td>work on</td>
                  </tr>
                ))}

              </tbody>
            </table>
          
          </div>
        </div>
      )}
    </>
  );
}

export default GradeBook;
