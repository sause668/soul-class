import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "./StudentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { calcFinalGradeStudent, calcBehaviorGrade, convertBehaviorGrade, convertBehaviorPriorityGrade, sortAssignments, calcLetterGrade } from "../../utils/Grading";
import { fetchStudent } from "../../redux/student";
import { fetchStudentClasses } from "../../redux/class";

export default function StudentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const student = useSelector((state) => state.student.student);
  const classes = useSelector((state) => state.class.classes);
  const [quarter, setQuarter] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavStudent = (studentId) => {
    navigate(`/students/${studentId}`);
    navigate(0);
  }

  const handleGrades = (classId) => {
    navigate(`/students/${studentId}/classes/${classId}`)
  }

  useEffect(() => {
    dispatch(fetchStudent({studentId}))
    .then(() => dispatch(fetchStudentClasses({studentId})))
    .then(() => setIsLoaded(true));
  }, [dispatch, studentId]);

  


  return (
    <>
      {isLoaded && (
        <div className="flex justify-center items-center pt-5 pb-5">
          <div id="studentPageConSP " className="flex justify-center items-flex-start w-[70%] gap-2">
            <div id='profileSideSP' className="flex flex-col justify-flex-start items-center w-[30%] gap-2">
                <div id="profileConSP"className="whiteBox p-2">
                  <div id="profilePicConSP">
                    <FiUser id='profilePicSP' className="text-[10rem] bg-white rounded-full"/>
                  </div>
                  <div id="profileInfoConSP">
                      <h2 className="profileInfoSP text-2xl font-bold">{student.first_name} {student.last_name}</h2>
                      <h4 className="profileInfoSP text-lg">Student</h4>
                      <h4 className="profileInfoSP text-zinc-500">Grade: {student.grade}th</h4>
                      {student.siblings.length > 0 && (<>
                          <h3 className="text-md">Siblings:</h3>
                          {student.siblings.map((sibling, index) => (
                              <button onClick={()=>handleNavStudent(sibling.student.id)} key={`sibling${index}`}>{sibling.first_name} {sibling.last_name}</button>
                          ))}
                      </>)}
                  </div>
                </div>
                <div id="quarterSelectConSP" className='whiteBox p-2 flex justify-between items-center gap-1'>
                  <label htmlFor='quarter'>
                    <p className='text-md'>Quarter</p>
                  </label>
                  <select 
                    name="quarter" 
                    id="quarter" 
                    className="quarterSelectSP "
                    value={quarter} 
                    onChange={(e) => setQuarter(parseInt(e.target.value))}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div id="behaviorConSP" className="whiteBox min-w-[100%]">
                  <div id="behaviorHeaderConSP" className="bg-blue-500 text-white p-2 rounded-t-lg text-center">
                    <h2 id="behaviorTitleSP" className="text-xl font-bold">Behavior</h2>
                  </div>
                  <div id="behaviorInfoConSPBody">
                    {classes.map((class_, index) => {
                      let behaviorGrade = calcBehaviorGrade(class_.behaviors.attention, class_.behaviors.learnability, class_.behaviors.cooperation);
                      let behaviorPriorityGrade = convertBehaviorPriorityGrade(behaviorGrade);
                      return (
                      <div className="behaviorInfoConSP" key={`behaviorConSP${index}`}>
                        <div className="behaviorInfoHeaderConSP flex justify-between items-center p-2 ">
                          <div className="behaviorInfoHeaderConLeftSP">
                          {/* <h3 className="behaviorInfoSP">{class_.grade}th Grade {class_.name}</h3> */}
                          <h3 className="behaviorInfoSP"> {class_.name}</h3>
                          </div>
                          <div className="behaviorInfoHeaderConRightSP ">
                            <h3 className="behaviorInfoSP">Priority: {behaviorPriorityGrade}</h3>
                          </div>
                        </div>
                        <div className="behaviorInfoConBodySP flex flex-col justify-start items-start gap-2">
                          <h3 className="behaviorInfoSP pl-10">Attention: {convertBehaviorGrade(class_.behaviors.attention)}</h3>
                          <h3 className="behaviorInfoSP pl-10">Learnability: {convertBehaviorGrade(class_.behaviors.learnability)}</h3>
                          <h3 className="behaviorInfoSP pl-10">Cooperation: {convertBehaviorGrade(class_.behaviors.cooperation)}</h3>
                        </div>
                      </div>
                    )})}
                  </div>
                </div>
            </div>
            <div id="classesSideSP">
              {classes.map((class_, index) => (
                <div className="classConSP" key={`classConS${index}`}>
                  <div className="classInfoConSP">
                    <div className="classInfoConLeftSP">
                      <h3 className="classInfoSP">{class_.grade}th Grade {class_.name} - Period {class_.period}</h3>
                      <h4 className="classInfoSP">{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
                      <h4 className="classInfoSP">Room - {class_.room}</h4>
                    </div>
                    <div className="classInfoConRightSP">
                      <h4 className="currentGradeSP">Current Grade: {calcFinalGradeStudent(class_.assignments)}</h4>
                    </div>
                    {/* <button 
                      onClick={() => handleGrades(class_.id)} 
                      className="classButtonSP gradesSP"
                    >Grades</button> */}
                  </div>
                  <div className="classAssignmentsConSP">
                    {class_.assignments
                      .filter(a => a.quarter == quarter)
                      .sort((a1, a2) => sortAssignments(a1, a2))
                      .map((assignment, index) => (
                      <div className="assignmentGridConSP" key={`classAssignment${index}`}>
                        <div className={`assignmentConSP ${assignment.type}`}>
                          <h3 className="assignNameSP">{assignment.name}</h3>
                          <h4 className="assignDueDateSP">Due Date: {assignment.due_date.slice(0, assignment.due_date.length - 13)}</h4>
                          <h4 className={`assignGradeSP`}>Grade: {assignment.grade} ({calcLetterGrade(assignment.grade)})</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* {errors.message && (<h1>{errors.message}</h1>)} */}
    </>
  );
}
