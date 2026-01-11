import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "./StudentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { calcFinalGradeStudent, calcBehaviorGrade, convertBehaviorGrade, convertBehaviorPriorityGrade, sortAssignments, calcLetterGrade, convertBehaviorPriorityGradeColor } from "../../utils/Grading";
import { fetchStudent } from "../../redux/student";
import { fetchStudentClasses } from "../../redux/class";

export default function StudentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const student = useSelector((state) => state.student.student);
  const classes = useSelector((state) => state.class.classes);
  const [quarter, setQuarter] = useState(1);
  const [bToggle, setBToggle] = useState(classes ? classes.map(() => false) : []);
  const [cToggle, setCToggle] = useState(classes ? classes.map(() => false) : []);
  
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavStudent = (studentId) => {
    navigate(`/students/${studentId}`);
    navigate(0);
  }

  const handleGrades = (classId) => {
    navigate(`/students/${studentId}/classes/${classId}`)
  }

  const handleBehavior = (index) => {
    setBToggle(prev => {
      const newToggle = [...prev];
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
  }

  const handleClass = (index) => {
    setCToggle(prev => {
      const newToggle = [...prev];
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
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
                          <h3 className="text-md pt-2 font-bold">Siblings:</h3>
                          {student.siblings.map((sibling, index) => (
                              <h3 
                              onClick={()=>handleNavStudent(sibling.student.id)} 
                              key={`sibling${index}`}
                              className="text-md font-bold border-2 border-zinc-300 rounded-lg p-1 text-center cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
                              >{sibling.first_name} {sibling.last_name}</h3>
                          ))}
                      </>)}
                  </div>
                </div>
                <div id="quarterSelectConSP" className='whiteBox p-2 flex justify-between items-center gap-1'>
                  <label htmlFor='quarter'>
                    <p className='text-lg font-bold'>Quarter</p>
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
                <div id="behaviorConSP" className="whiteBox min-w-[100%] overflow-hidden">
                  <div id="behaviorHeaderConSP" className="bg-blue-500 text-white p-2 rounded-t-lg text-center">
                    <h2 id="behaviorTitleSP" className="text-xl font-bold">Behavior</h2>
                  </div>
                  <div id="behaviorInfoConSPBody">
                    {classes.map((class_, index) => {
                      let behaviorGrade = calcBehaviorGrade(class_.behaviors.attention, class_.behaviors.learnability, class_.behaviors.cooperation);
                      let behaviorPriorityGrade = convertBehaviorPriorityGrade(behaviorGrade);
                      let behaviorPriorityGradeColor = convertBehaviorPriorityGradeColor(behaviorPriorityGrade);
                      return (
                      <div className={`behaviorInfoConSP ${index < classes.length - 1 ? 'border-b border-gray-300' : ''} `} key={`behaviorConSP${index}`}>
                        <div 
                          className={`behaviorInfoHeaderConSP flex justify-between items-center p-2 cursor-pointer hover:opacity-80 transition-opacity duration-300 ${behaviorPriorityGradeColor}`}
                          onClick={() => handleBehavior(index)}
                        >
                          <div className="behaviorInfoHeaderConLeftSP">
                            <h3 className={`behaviorInfoSP text-md font-bold`}> {class_.name}</h3>
                          </div>
                          <div className="behaviorInfoHeaderConRightSP ">
                            <h3 className="behaviorInfoSP text-md">Priority: <b>{behaviorPriorityGrade}</b></h3>
                          </div>
                        </div>
                        <div className={`behaviorInfoConBodySP flex flex-col justify-start items-start gap-1 p-2 pb-4 pt-1 ${behaviorPriorityGradeColor} ${bToggle[index] ? 'block' : 'hidden'} transition-all duration-300`}>
                          <h3 className="behaviorInfoSP pl-10">Attention: <b>{convertBehaviorGrade(class_.behaviors.attention)}</b></h3>
                          <h3 className="behaviorInfoSP pl-10">Learnability: <b>{convertBehaviorGrade(class_.behaviors.learnability)}</b></h3>
                          <h3 className="behaviorInfoSP pl-10">Cooperation: <b>{convertBehaviorGrade(class_.behaviors.cooperation)}</b></h3>
                        </div>
                      </div>
                    )})}
                  </div>
                </div>
            </div>
            <div id="classesSideSP" className="flex flex-col justify-flex-start items-center w-[70%] gap-2">
              <div id="classesConSP" className="whiteBox min-w-[100%] overflow-hidden">
              <div id="classesHeaderConSP" className="bg-blue-500 text-white p-2 rounded-t-lg text-center">
                    <h2 id="classesTitleSP" className="text-xl font-bold">Classes</h2>
                </div>
                <div id="classesBodyConSP">
              {classes.map((class_, index) => {
                let finalGrade = calcFinalGradeStudent(class_.assignments);
                let finalLetterGrade = calcLetterGrade(finalGrade);
                return (
                <div className={`classConSP ${index < classes.length - 1 ? 'border-b border-gray-300' : ''}`} key={`classConS${index}`}>
                  <div className={`classInfoConSP flex justify-between items-center p-2 cursor-pointer hover:opacity-80 transition-opacity duration-300 ${finalGrade != 'N/A' ? finalLetterGrade:'noGrade'} `} onClick={() => handleClass(index)}>
                    <div className={`classInfoConLeftSP flex flex-col justify-start items-start g-0 `}>
                      <h3 className="classInfoSP text-xl font-bold p-0 m-0">{class_.grade}th Grade {class_.name}</h3>
                      <h4 className="classInfoSP text-md p-0 m-0">{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
                      <h4 className="classInfoSP text-md text-zinc-500 p-0 m-0">Period {class_.period}: Room - {class_.room}</h4>
                    </div>
                    <div className="classInfoConRightSP">
                      <h4 className="currentGradeSP text-xl font-bold">Current Grade: {finalGrade} ({finalLetterGrade})</h4>
                    </div>
                    {/* <button 
                      onClick={() => handleGrades(class_.id)} 
                      className="classButtonSP gradesSP"
                    >Grades</button> */}
                  </div>
                  <div className={`classAssignmentsConSP flex justify-center items-start gap-2 flex-wrap p-2 ${cToggle[index] ? 'block' : 'hidden'} transition-all duration-300`}>
                    {class_.assignments
                      .filter(a => a.quarter == quarter)
                      .sort((a1, a2) => sortAssignments(a1, a2))
                      .map((assignment, index) => (
                      <div className="assignmentGridConSP w-[30%]" key={`classAssignment${index}`}>
                        <div className={`assignmentConSP p-2 rounded-lg ${assignment.type}`}>
                          <h3 className="assignNameSP text-lg font-bold">{assignment.name}</h3>
                          <h4 className="assignDueDateSP text-sm text-zinc-500 mb-2">Due Date: {assignment.due_date.slice(0, assignment.due_date.length - 13)}</h4>
                          <h4 className={`assignGradeSP text-md font-bold`}>Grade: {assignment.grade} ({calcLetterGrade(assignment.grade)})</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )})}
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {errors.message && (<h1>{errors.message}</h1>)} */}
    </>
  );
}
