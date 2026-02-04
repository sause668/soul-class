import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GradeBook.css";
import { Navigate, useParams } from "react-router-dom";
import { fetchGradebookClass, editGroupStudent, addGroupStudent, removeGroupStudent } from "../../redux/class";
import { calcBehaviorGrade, convertBehaviorGrade, convertBehaviorGradeColor, convertBehaviorPriorityGrade, convertBehaviorPriorityGradeColor } from "../../utils/Grading";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "./AddStudentModal";
import NewAssignmentModal from "./NewAssignmentModal";
import OpenModalCell from "../OpenModalTableCell/OpenModalTableCell";
import CreateGradeModal from "./CreateGradeModal";
import EditGradeModal from "./EditGradeModal";
import StudentInfoModal from "./StudentInfoModal";
import EditStudentBehaviorModal from "./EditStudentBehaviorModal";
import CreateGroupModal from "./CreateGroupModal";
import EditGroupModal from "./EditGroupModal";
import { calcFinalGradeTeacher, calcLetterGrade, sortStudents, sortAssignments } from "../../utils/Grading";
import AssignmentInfo from "./AssignmentInfo";
import { FaPlus } from "react-icons/fa6";

function GradeBook() {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [groupStudent, setGroupStudent] = useState(null);

  // Define the three behavior assignments
  const behaviorAssignments = [
    { id: 'attention', name: 'Attention', type: 'behavior', quarter: 1 },
    { id: 'learnability', name: 'Learning Speed', type: 'behavior', quarter: 1 },
    { id: 'cooperation', name: 'Cooperation', type: 'behavior', quarter: 1 }
  ];

  const handleDragStart = (e, studentId, groupIdRemove = null) => {
    setGroupStudent({studentId, groupIdRemove});
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e, groupIdAdd = null) => {
    e.preventDefault();
    const {studentId, groupIdRemove} = groupStudent;

    if (!groupIdRemove) {
      dispatch(addGroupStudent({classId, studentId, groupIdAdd}));
    } else if (!groupIdAdd) {
      dispatch(removeGroupStudent({classId, studentId, groupIdRemove}));
    } else {
      dispatch(editGroupStudent({classId, studentId, groupIdRemove, groupIdAdd}));
    }
  }
  

  useEffect(() => {
    dispatch(fetchGradebookClass({teacherId: user.teacher.id, classId}))
      .then((res) => {
        if (res && res.errors) {
          setErrors(res.errors)
        } else {
          setIsLoaded(true)
        }
      })
  }, [dispatch, classId, user]);

  if (!user || user.type != 'teacher') return <Navigate to="/" replace={true} />;


  return (
    <>
      {(isLoaded) && (
        <div className="flex justify-center items-center pt-5 pb-5">
        <div id="gradeBookCon" className="flex flex-col justify-start items-center gap-2 w-[95%]">
          <div id="headerConGB" className="flex justify-between items-center w-[75%]">
            <div id="titleConGB" className="whiteBox p-3 flex flex-col justify-flex-start items-start gap-0.5">
              <h1 id="titleGB" className="text-4xl font-bold">{class_.grade}th Grade {class_.name}</h1>
              <h3 id="teacherNameGB" className="text-lg">{class_.teacher.last_name}, {class_.teacher.first_name}</h3>
              <h3 id="classRoomGB" className="text-md text-zinc-500">Period {class_.period}: Room - {class_.room}</h3>
            </div>
            <div id="optionsConGB" className="whiteBox p-2 flex justify-between items-center gap-2">
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
              <div className='quarterSelectConGB flex justify-between items-center gap-1 text-lg'>
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
          {/* Grade Book */}
          <div id="tableConGB" className="whiteBox p-2">
            <div id="tableFormatConGB" className="">
              <div id="tableStudentsConGB" className="">
                <table id="tableGBS" className="">
                  <tbody id="tableBodyGB" className="">
                    {class_.students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                      <tr className="tableBodyRowBG " key={`studentName${iStudent}`}>
                        <OpenModalCell
                          cellText={`${student.last_name}, ${student.first_name}`}
                          modalComponent={<StudentInfoModal
                            classId={class_.id}
                            student={student}
                          />}
                          cssClasses={'tableCellGB tableBodyCellBG studentBodyCellGB '}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div id="tableGradesConGB">
                <table id="tableGB">
                  <thead id="tableHeadGB">
                    <tr id="tableHeadRowGB">
                      {class_.assignments
                        .filter(a => a.quarter == quarter)
                        .sort((a1, a2) => sortAssignments(a1, a2))
                        .map((assignment, index) => (
                          <OpenModalCell
                            cellText={assignment.name}
                            modalComponent={<AssignmentInfo assignment={assignment}/>}
                            cssClasses={`tableCellGB tableHeadCellGB assignHeadCellGB font-bold ${assignment.type}`}
                            key={`assignHead${index}`}
                          />
                        ))}
                      <td className="tableCellGB tableHeadCellGB finalHeadCellBG text-lg font-bold">Final</td>
                    </tr>
                  </thead>
                  <tbody id="tableBodyGB">
                    {class_.students.map((student, iStudent) => {
                      let finalGrade = calcFinalGradeTeacher(class_.assignments.filter(a => a.quarter == quarter), student.id);
                      let finalLetterGrade = calcLetterGrade(finalGrade);
                      return (
                      <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                        {class_.assignments
                          .filter(a => a.quarter === quarter)
                          .sort((a1, a2) => sortAssignments(a1, a2))
                          .map((assignment, iAssignment) => {
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
                        {finalGrade != 'N/A' ? 
                          <td className={`tableCellGB tableBodyCellGB finalBodyCellGB f${finalLetterGrade}`}>{finalGrade} ({finalLetterGrade})</td>
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
          {/* Behavior Book */}
          <div id="tableConGB" className="whiteBox p-2">
            <div id="tableFormatConGB">
              <div id="tableStudentsConGB" className="">
                <table id="tableGBS">
                    <tbody id="tableBodyGB">
                      {class_.students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                        <tr className="tableBodyRowGB" key={`studentName${iStudent}`}>
                          <OpenModalCell
                            cellText={`${student.last_name}, ${student.first_name}`}
                            modalComponent={<StudentInfoModal
                              classId={class_.id}
                              student={student}
                            />}
                            cssClasses={'tableCellGB tableBodyCellBG studentBodyCellGB'}
                          />
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
              <div id="tableGradesConGB">
                <table id="tableGB">
                  <thead id="tableHeadGB">
                    <tr id="tableHeadRowBB">
                      {behaviorAssignments.map((assignment, index) => (
                        <OpenModalCell
                          cellText={assignment.name}
                          modalComponent={<AssignmentInfo assignment={assignment}/>}
                          cssClasses={`tableCellGB tableCellBB tableHeadCellGB assignHeadCellGB bg-gray-200 font-bold`}
                          key={`assignHead${index}`}
                        />
                      ))}
                      <td className="tableCellGB tableCellBB tableHeadCellGB finalHeadCellGB bg-slate-300 text-lg font-bold">Priority Level</td>
                    </tr>
                  </thead>
                  <tbody id="tableBodyGB">
                    {class_.students.map((student, iStudent) => {
                      // Calculate final grade using behavior assignments
                      const studentBehavior = class_.behaviors.find((behavior) => behavior.student_id === student.id);
                      let attentionGrade = convertBehaviorGrade(studentBehavior.attention);
                      let learnabilityGrade = convertBehaviorGrade(studentBehavior.learnability);
                      let cooperationGrade = convertBehaviorGrade(studentBehavior.cooperation);
                      let behaviors = [attentionGrade, learnabilityGrade, cooperationGrade];
                      let behaviorGrade = calcBehaviorGrade(studentBehavior.attention, studentBehavior.learnability, studentBehavior.cooperation);
                      let behaviorPriorityGrade = convertBehaviorPriorityGrade(behaviorGrade);
                      let behaviorPriorityGradeColor = convertBehaviorPriorityGradeColor(behaviorPriorityGrade);
                      return (
                      <tr className="tableBodyRowGB cursor-pointer hover:opacity-80 transition-opacity duration-300" key={`studentName${iStudent}`}>
                        {behaviors.map((behavior, index) => (
                          <OpenModalCell
                          cellText={behavior}
                          modalComponent={<EditStudentBehaviorModal
                            studentBehavior={studentBehavior}
                            student={student}
                          />}
                          cssClasses={`tableCellGB tableCellBB tableBodyCellGB gradeBodyCellGB ${convertBehaviorGradeColor(behavior)}`}
                          key={`behavior${index}`}
                        />
                        ))}
                        {behaviorGrade != 'N/A' ? 
                          <td className={`tableCellGB tableCellBB tableBodyCellGB finalBodyCellGB font-bold ${behaviorPriorityGradeColor}`}>{behaviorPriorityGrade}</td>
                        :
                          <td className={`tableCellGB tableCellBB tableBodyCellGB finalBodyCellGB noGrade font-bold`}>N/A</td>
                        }
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Group Book */}
          <div id="groupsConGB" className="whiteBox p-2 flex flex-col justify-flex-start items-center text-center w-[40%]">
            <div id="tableFormatConGB">
              <div id="tableStudentsConGB" className="">
                <table id="tableGBS">
                  <thead id="tableHeadGB">
                    <tr id="tableHeadRowGB">
                      <td className="tableCellGB tableHeadCellGB finalHeadCellGB text-lg font-bold">
                        <h3 className="groupNameGB text-lg font-bold">Groups</h3>
                        <OpenModalButton
                          buttonText={<FaPlus className="text-lg" />}
                          modalComponent={<CreateGroupModal 
                            classId={classId} 
                          />}
                          cssClasses={'gradeBookButtonGB addStudentGB'}
                        />
                      </td>
                      <td className="tableCellGB tableHeadCellGB finalHeadCellGB text-lg font-bold">Students</td>
                    </tr>
                  </thead>
                  <tbody id="tableBodyGB">
                    {class_.groups.map((group, index) => (
                      <tr className="tableBodyRowGB" key={`groupName${index}`}>
                        <OpenModalCell
                          cellText={group.name}
                          modalComponent={<EditGroupModal group={group}/>}
                          cssClasses={'tableCellGB tableCellBB tableBodyCellGB groupBodyCellGB'}
                        />
                        <td className="tableCellGB tableCellBB tableBodyCellGB studentBodyCellGB">
                        {group.students.map((student, index) => (
                          <div 
                            className="studentConGB flex justify-flex-start items-center gap-2 p-2 rounded-lg text-center bg-blue-300" key={`studentConGB${index}`}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, student.id, group.id)}
                          >  
                            <h3 className="studentNameGB">{student.last_name}, {student.first_name}</h3>
                         </div>
                        ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="groupsConGB" className="whiteBox p-2 flex flex-col justify-flex-start items-center text-center w-[40%]">
            <div id="classGroupConGB" className="flex justify-center items-start p-2 rounded-lg text-center">
              {class_.groups.map((group, index) => (
                <div className="groupConGB flex flex-col justify-flex-start items-center p-2 rounded-lg text-center" key={`groupConGB${index}`}>
                  <h3 className="groupNameGB text-lg font-bold mb-1">{group.name}</h3>
                  <div 
                    className="groupStudentsConGB flex flex-col justify-start items-center gap-2 p-2 rounded-lg text-center bg-blue-50 border border-slate-300 min-w-30 min-h-10"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, group.id)}
                  >
                    {group.students.map((student, index) => (
                      <div 
                        className="studentConGB flex justify-flex-start items-center gap-2 p-2 rounded-lg text-center bg-blue-300" key={`studentConGB${index}`}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, student.id, group.id)}
                      >  
                        <h3 className="studentNameGB">{student.last_name}, {student.first_name}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div id="noGroupConGB" className="flex flex-col justify-flex-start items-center p-2 rounded-lg text-center">
              <h3 id="studentListTitleGB" className="text-lg font-bold mb-1">No Group</h3>
              <div 
                id="studentListConGB" 
                className="flex flex-wrap justify-center items-start gap-2 p-2 rounded-lg text-center bg-gray-100 border border-slate-300 min-w-30 min-h-10"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, null)}
              >  
                {class_.students
                .filter(student => {
                  return !student.groups.some(group => group.class_id === class_.id)
                })
                .map((student, index) => (
                  <div 
                    className="studentConGB flex justify-flex-start items-center gap-2 p-2 rounded-lg text-center bg-slate-300" 
                    key={`studentConGB${index}`}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, student.id, null)}
                  >
                    <h3 className="studentNameGB">{student.last_name}, {student.first_name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
      {errors.message && (<h1>{errors.message}</h1>)}
    </>
  );
}

export default GradeBook;
