import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Grades.css";
import { Navigate, useParams } from "react-router-dom";
import { fetchGradesClass } from "../../redux/class";
import { calcFinalGradeStudent, calcLetterGrade, sortAssignments, convertBehaviorPriorityGrade, calcBehaviorGrade, convertBehaviorGrade } from "../../utils/Grading";
import { convertBehaviorGradeColor, convertBehaviorPriorityGradeColor } from "../../utils/Grading";
import { typeToString } from "../../utils/TypeConvertion";

function Grades() {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const attentionGrade = class_ ? convertBehaviorGrade(class_.behaviors.attention) : 'N/A';
  const learnabilityGrade = class_ ? convertBehaviorGrade(class_.behaviors.learnability) : 'N/A';
  const cooperationGrade = class_ ? convertBehaviorGrade(class_.behaviors.cooperation) : 'N/A';
  const priorityGrade = class_ ? convertBehaviorPriorityGrade(calcBehaviorGrade(class_.behaviors.attention, class_.behaviors.learnability, class_.behaviors.cooperation)) : 'N/A';
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const group = {
      id: 1,
      name: '1',
      students: [
        {
          id: 1,
          firstName: 'Harry',
          lastName: 'Potter',
        },
        {
          id: 2,
          firstName: 'Ron',
          lastName: 'Weasley',
        },
        {
          id: 3,
          firstName: 'Hermione',
          lastName: 'Granger',
        },
      ]
    }

  useEffect(() => {
    dispatch(fetchGradesClass({studentId: user.student.id, classId}))
      .then((res) => {
        if (res && res.errors) {
          setErrors(res.errors)
        } else {
          setIsLoaded(true)
        }
      })
  }, [dispatch, classId, user]);

  if (!user || user.type != 'student') return <Navigate to="/" replace={true} />;

  return (
    <>
      {(isLoaded) && (
        <div className="flex justify-center items-center pt-5 pb-5">
        <div id="classConC" className="flex justify-center items-flex-start w-[70%]">
          <div id="headerConC" className="flex flex-col justify-flex-start items-center w-[40%] gap-2">
            <div id="titleConC" className="whiteBox p-3 flex flex-col justify-flex-start items-start gap-0.5">
              <h1 id="titleC" className="text-4xl font-bold">{class_.grade}th Grade {class_.name}</h1>
              <h4 id="periodConC" className="text-lg ">Period {class_.period}: Room - {class_.room}</h4>
              <h3 id="teacherConC" className="text-md text-zinc-500">{class_.teacher.last_name}, {class_.teacher.first_name}</h3>
                {/* <h2 id="groupTitleC" className="text-md font-bold">Class Group: 1</h2> */}
              {/* <h4 id="classInfoC" className="text-md">{class_.students.length} Students</h4> */}
            </div>
            <div id="behaviorsConC" className="flex flex-col justify-flex-start items-center w-[80%] overflow-hidden">
              <h2 id="behaviorsTitleC" className="text-xl font-bold text-center bg-blue-500 text-white rounded-t-lg p-2 w-full">Behavior</h2>
              <div id="behaviorsListConC" className="flex flex-col justify-flex-start items-start w-full">
                <div id="attentionConC" className={`flex justify-between items-center text-md p-2 px-4 w-full border-b border-gray-300 ${convertBehaviorGradeColor(attentionGrade)}`}>
                  <h3 id="attentionTitleC" className={``}>Attention:</h3>
                  <h3 id="attentionGradeC" className={``}>{attentionGrade}</h3>
                </div>
                <div id="learnabilityConC" className={`flex justify-between items-center text-md p-2 px-4 w-full border-b border-gray-300 ${convertBehaviorGradeColor(learnabilityGrade)}`}>
                  <h3 id="learnabilityTitleC" className={``}>Learnability:</h3>
                  <h3 id="learnabilityGradeC" className={``}>{learnabilityGrade}</h3>
                </div>
                <div id="cooperationConC" className={`flex justify-between items-center text-md p-2 px-4 w-full border-b border-gray-400 ${convertBehaviorGradeColor(cooperationGrade)}`}>
                  <h3 id="cooperationTitleC" className={``}>Cooperation:</h3>
                  <h3 id="cooperationGradeC" className={``}>{cooperationGrade}</h3>
                </div>
                <div id="priorityConC" className={`flex justify-between items-center text-md p-2 px-4  w-full ${convertBehaviorPriorityGradeColor(priorityGrade)}`}>
                  <h3 id="priorityTitleC" className={`text-lg font-bold`}>Priority:</h3>
                  <h3 id="priorityGradeC" className={`text-lg font-bold`}>{priorityGrade}</h3>
                </div>
              </div>
            </div>
            <div id="groupConC" className="whiteBox flex flex-col justify-flex-start items-start gap-0.5 w-[80%]">
              <h2 id="groupTitleC" className="text-xl font-bold text-center bg-blue-500 text-white rounded-t-lg p-2 w-full">Class Group: {group.name}</h2>
              <div id="groupStudentsConC" className="flex flex-col justify-flex-start items-start gap-0.5 w-full">
                {group.students.map((student, index) => (
                  <h3 id="groupStudentC" className={`text-md p-2 w-full ${index < group.students.length - 1 ? 'border-b border-gray-300' : ''}`} key={`groupStudentC${index}`}>{student.lastName}, {student.firstName}</h3>
                ))}
              </div>
            </div>
            {/* <div id="optionsConC" className="whiteBox p-2 flex justify-between items-center gap-2">
              <button onClick={()=>nav(`/gradebook/${class_.id}`)}>Grade Book</button>
              <div className='quarterSelectConC flex justify-between items-center gap-1'>
                <label htmlFor='quarter'>
                  <p className='text-md'>Quarter</p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectC "
                  value={quarter} 
                  onChange={(e) => setQuarter(parseInt(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div> */}
            {/* <div id="studentsConC" className="whiteBox w-[80%]">
                <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                  <h2 className="subTitleC text-xl font-bold">Students</h2>
                </div>
                {class_.students
                    .sort((s1, s2) => sortStudents(s1, s2))
                    .map((student, index) => {
                        let finalGrade = calcFinalGradeTeacher(class_.assignments.filter(a => a.quarter == quarter), student.id);
                        let finalLetterGrade = calcLetterGrade(finalGrade);
                        return (
                            <div 
                                className={`studentCon flex justify-between items-center gap-2 p-2 ${finalGrade != 'N/A' ? finalLetterGrade:'noGrade'} ${index < class_.students.length - 1 ? 'border-b border-gray-300' : ''} cursor-pointer hover:opacity-80 transition-opacity duration-300`} 
                                key={`studentClass${index}`}
                                onClick={()=>nav(`/students/${student.id}`)}
                            >
                                <h3 className="studentNameC text-md font-bold">{student.last_name}, {student.first_name}</h3>
                                <h4 className="studentGradeC">{finalGrade != 'N/A' ? `${finalGrade} (${finalLetterGrade})`:'N/A'}</h4>
                            </div>
                        );
                    })
                }
            </div>
            <div id="studentsConC" className="whiteBox w-[80%]">
                <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                  <h2 className="subTitleC text-xl font-bold">Behaviors</h2>
                </div>
                {class_.students
                    .sort((s1, s2) => sortStudents(s1, s2))
                    .map((student, index) => {
                        const studentBehavior = class_.behaviors.find((behavior) => behavior.student_id === student.id);
                        const finalBehavior = convertBehaviorPriorityGrade(calcBehaviorGrade(studentBehavior.attention, studentBehavior.learnability, studentBehavior.cooperation));
                        const finalBehaviorColor = convertBehaviorPriorityGradeColor(finalBehavior);
                        return (
                            <div 
                                className={`studentCon flex justify-between items-center gap-2 p-2 ${finalBehaviorColor} ${index < class_.students.length - 1 ? 'border-b border-gray-300' : ''} cursor-pointer hover:opacity-80 transition-opacity duration-300`} 
                                key={`studentClass${index}`}
                                onClick={()=>nav(`/students/${student.id}`)}
                            >
                                <h3 className="studentNameC text-md font-bold">{student.last_name}, {student.first_name}</h3>
                                <h4 className="studentGradeC">{finalBehavior}</h4>
                            </div>
                        );
                    })
                }
            </div> */}
            {/* </div> */}
          </div>
          {/* <div id="classInfoFormatConC"> */}
          <div id="classInfoConC" className="flex flex-col justify-flex-start items-center w-[60%] gap-2">
            <div id="assignmentsConC" className="whiteBox w-[80%] overflow-hidden">
                <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                    <h2 className="subTitleC text-xl font-bold">Assignments</h2>
                </div>
                {class_.assignments
                    .filter(a => a.quarter == quarter)
                    .sort((a1, a2) => sortAssignments(a1, a2))
                    .map((assignment, index) => {
                      const finalGrade = assignment.grade;
                      const finalLetterGrade = calcLetterGrade(finalGrade);
                      return (
                        <div className={`assignConC p-2 flex justify-between items-center ${finalGrade != 'N/A' ? finalLetterGrade:'noGrade'} ${index < class_.assignments.filter(a => a.quarter == quarter).length - 1 ? 'border-b border-gray-300' : ''}`} key={`assignClass${index}`}>
                            <div className="assignInfoConC flex flex-col justify-flex-start items-flex-start gap-1">
                                <h3 className="assignNameC text-md font-bold">{assignment.name}</h3>
                                {/* <h4 className="assignDueDateC">{assignment.due_date.slice(0, 16)}</h4> */}
                                <h4 className="assignTypeC text-md text-zinc-500">{typeToString(assignment.type)}</h4>
                            </div>
                            <h4 className={`assignGradeC text-lg font-bold `}>{finalGrade} ({finalLetterGrade})</h4>
                        </div>
                    )})
                }
            </div>
            {/* <div id="groupConC" className="whiteBox w-[80%] overflow-hidden">
              <div className="subTitleConC p-2 flex justify-between items-center bg-blue-500 text-white rounded-t-lg text-center">
                <h2 className="subTitleC text-xl font-bold">Class Groups</h2>
                <div id="groupEditConC" className="text-2xl bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-white hover:text-blue-500 transition-all duration-300">
                  <MdEdit />
                </div>
              </div>
              <div className="groupListConC">
                {groups.map((group, index) => (
                  <div id="groupConC" className={`flex justify-between items-center gap-2 p-2 ${index % 2 == 0 ? 'bg-blue-100' : 'bg-blue-50'} cursor-pointer hover:opacity-80 hover:bg-gray-100 transition-all duration-300 ${index < groups.length - 1 ? 'border-b border-gray-300' : ''}`} key={`groupConC${index}`}>
                      <h3 className="groupNameC text-lg font-bold">{group.name}</h3>
                      <div className="groupStudentsConC">
                        {group.students.map((student, index) => (
                          <div id="studentConC" className="flex justify-between items-center gap-2 p-2 cursor-pointer hover:opacity-80 hover:bg-gray-100 transition-all duration-300 " key={`studentConC${index}`}>
                            <h3 className="studentNameC text-md ">{student.lastName}, {student.firstName}</h3>
                          </div>
                          ))}
                        </div>
                      </div>
                ))}
                </div>
              </div> */}
            </div> 
          </div>
        </div>
      )}
    </>
  );
}

export default Grades;
