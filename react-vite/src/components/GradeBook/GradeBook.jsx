import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GradeBook.css";
import Navigation from "../Navigation/Navigation";
import { Navigate, useParams } from "react-router-dom";
import { fetchClass } from "../../redux/class";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "./AddStudentModal";
import NewAssignmentModal from "./NewAssignmentModal";
import OpenModalCell from "../OpenModalTableCell/OpenModalTableCell";
import EditAssignmentModal from "./EditAssignmentModal";
import CreateGradeModal from "./CreateGradeModal";
import EditGradeModal from "./EditGradeModal";
import StudentInfoModal from "./StudentInfoModal";
import { calcFinalGradeTeacher } from "../../utils/Grading";

function GradeBook() {
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
                buttonText={'Add Student'}
                modalComponent={<AddStudentModal 
                  classId={classId} 
                  currentStudentIds={class_.students.map(student => student.id)} 
                />}
                cssClasses={'gradeBookButton addStudent'}
              />
              <OpenModalButton
                buttonText={'New Assignment'}
                modalComponent={<NewAssignmentModal 
                  classId={classId} 
                  quarter={quarter} 
                />}
                cssClasses={'gradeBookButton newAssignment'}
              />
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
                    // <td key={`assignHead${index}`}>{assignment.name}</td>
                    <OpenModalCell
                      cellText={assignment.name}
                      modalComponent={<EditAssignmentModal assignment={assignment}/>}
                      cssClasses={''}
                      key={`assignHead${index}`}
                    />
                  ))}
                  <td>Final</td>
                </tr>
              </thead>
              <tbody>
                {class_.students.map((student, iStudent) => (
                  <tr key={`studentName${iStudent}`}>
                    <OpenModalCell
                      cellText={`${student.last_name}, ${student.first_name}`}
                      modalComponent={<StudentInfoModal
                        classId={class_.id}
                        student={student}
                        cssClasses={''}
                      />}
                    />
                    {class_.assignments.filter(a => a.quarter === quarter).map((assignment, iAssignment) => {
                      let grade = assignment.grades.find((grade) => {
                        return grade.student_id == student.id
                      })
                      if (grade) return <OpenModalCell
                        cellText={grade.grade}
                        key={`grade${iStudent}${iAssignment}`}
                        cssClasses={''}
                        modalComponent={<EditGradeModal grade={grade}/>}
                      />
                      return <OpenModalCell
                        cellText={''}
                        key={`grade${iStudent}${iAssignment}`}
                        cssClasses={''}
                        modalComponent={<CreateGradeModal
                          assignmentId={assignment.id}
                          studentId={student.id}
                        />}
                      />
                    })}
                    <td>{calcFinalGradeTeacher(class_.assignments, student.id)}</td>
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
