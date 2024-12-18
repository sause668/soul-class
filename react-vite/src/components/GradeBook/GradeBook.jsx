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
import { calcFinalGradeTeacher, calcLetterGrade } from "../../utils/Grading";

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
      {isLoaded && (
        <div id="gradeBookCon">
          <div id="headerConGB">
            <div id="titleConGB" className="lightBlueBox">
              <h1 id="titleGB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h1>
            </div>
            <div id="optionsConGB" className="lightBlueBox">
              <OpenModalButton
                buttonText={'Add Student'}
                modalComponent={<AddStudentModal 
                  classId={classId} 
                  currentStudentIds={class_.students.map(student => student.id)} 
                />}
                cssClasses={'gradeBookButtonGB addStudentGB'}
              />
              <OpenModalButton
                buttonText={'New Assignment'}
                modalComponent={<NewAssignmentModal 
                  classId={classId} 
                  quarter={quarter} 
                />}
                cssClasses={'gradeBookButtonGB newAssignmentGB'}
              />
              <div className='quarterSelectConGB'>
                <label htmlFor='quarter'>
                  <p className=''>
                    Quarter
                  </p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectGB"
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
          <div id="tableConGB" className="lightBlueBox">
            <div id="tableFormatConGB">
              <table id="tableGB">
              <colgroup>
                <col />
                <col />
                <col />
              </colgroup> 
                <thead id="tableHeadGB">
                  <tr id="tableHeadRowGB">
                    <td className="tableCellGB tableHeadCellGB studentsHeadCellGB"></td>
                    {class_.assignments.filter(a => a.quarter == quarter).map((assignment, index) => (
                      // <td key={`assignHead${index}`}>{assignment.name}</td>
                      <OpenModalCell
                        cellText={assignment.name}
                        modalComponent={<EditAssignmentModal assignment={assignment}/>}
                        cssClasses={`tableCellGB tableHeadCellGB assignHeadCellGB ${assignment.type}`}
                        key={`assignHead${index}`}
                      />
                    ))}
                    {/* <td className="emptyCell emptyCellTop"></td> */}
                    <td className="tableCellGB tableHeadCellGB finalHeadCellBG">Final</td>
                  </tr>
                </thead>
                <tbody id="tableBodyGB">
                  {class_.students.map((student, iStudent) => {
                    let finalGrade = calcFinalGradeTeacher(class_.assignments.filter(a => a.quarter == quarter), student.id);
                    let finalLetterGrade = calcLetterGrade(finalGrade);
                    return (
                    <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                      <OpenModalCell
                        cellText={`${student.last_name}, ${student.first_name}`}
                        modalComponent={<StudentInfoModal
                          classId={class_.id}
                          student={student}
                        />}
                        cssClasses={'tableCellGB tableBodyCellBG studentBodyCellGB'}
                      />
                      {class_.assignments.filter(a => a.quarter === quarter).map((assignment, iAssignment) => {
                        let grade = assignment.grades.find((grade) => {
                          return grade.student_id == student.id
                        })
                        if (grade) {
                          let letterGrade = calcLetterGrade(grade.grade)
                          return <OpenModalCell
                            cellText={`${grade.grade} (${letterGrade})`}
                            key={`grade${iStudent}${iAssignment}`}
                            cssClasses={`tableCellGB tableBodyCellGB gradeBodyCellBG ${letterGrade}`}
                            modalComponent={<EditGradeModal grade={grade}/>}
                          />
                        }
                        return <OpenModalCell
                          cellText={''}
                          key={`grade${iStudent}${iAssignment}`}
                          cssClasses={'tableCellGB tableBodyCellGB gradeBodyCellBG noGrade'}
                          modalComponent={<CreateGradeModal
                            assignmentId={assignment.id}
                            studentId={student.id}
                          />}
                        />
                      })}
                      {/* <td className={`emptyCell ${iStudent === class_.students.length - 1 && 'emptyCellBottom'}`}></td> */}
                      {finalGrade != 'N/A' ? 
                        <td className={`tableCellGB tableBodyCellGB finalBodyCellGB ${finalLetterGrade}`}>{finalGrade} ({finalLetterGrade})</td>
                      :
                        <td className={`tableCellGB tableBodyCellGB finalBodyCellGB noGrade`}>N/A</td>
                      }
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GradeBook;
