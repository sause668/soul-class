import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ClassPage.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchGradebookClass } from "../../redux/class";
import { calcFinalGradeTeacher, calcLetterGrade, sortStudents, sortAssignments, convertBehaviorPriorityGrade, convertBehaviorPriorityGradeColor, calcBehaviorGrade } from "../../utils/Grading";
import { typeToString } from "../../utils/TypeConvertion";

function ClassPage() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  

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
        <div id="classConC" className="flex justify-center items-flex-start w-[70%]">
          <div id="headerConC" className="flex flex-col justify-flex-start items-center w-[40%] gap-2">
            <div id="titleConC" className="whiteBox p-3 flex flex-col justify-flex-start items-start gap-0.5">
              <h1 id="titleC" className="text-4xl font-bold">{class_.grade}th Grade {class_.name}</h1>
              <h4 id="teacherNameC" className="text-lg ">Period {class_.period}: Room - {class_.room}</h4>
              <h3 id="periodC" className="text-md text-zinc-500">{class_.teacher.last_name}, {class_.teacher.first_name}</h3>
              {/* <h4 id="classInfoC" className="text-md">{class_.students.length} Students</h4> */}
            </div>
            <div id="optionsConC" className="whiteBox p-2 flex justify-between items-center gap-2">
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
            </div>
            <div id="studentsConC" className="whiteBox w-[80%]">
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
            </div>
            {/* </div> */}
          </div>
          {/* <div id="classInfoFormatConC"> */}
          <div id="classInfoConC" className="flex flex-col justify-flex-start items-center w-[60%]">
            {/* <div className="gridItemFormatC"> */}
                <div id="assignmentsConC" className="whiteBox w-[80%] overflow-hidden">
                    <div className="subTitleConC p-2 bg-blue-500 text-white rounded-t-lg text-center">
                        <h2 className="subTitleC text-xl font-bold">Assignments</h2>
                    </div>
                    {class_.assignments
                        .filter(a => a.quarter == quarter)
                        .sort((a1, a2) => sortAssignments(a1, a2))
                        .map((assignment, index) => (
                            <div className={`assignConC p-2 flex justify-between items-center ${assignment.type} ${index < class_.assignments.filter(a => a.quarter == quarter).length - 1 ? 'border-b border-gray-300' : ''}`} key={`assignClass${index}`}>
                                <div className="assignInfoConC flex flex-col justify-flex-start items-flex-start gap-1">
                                    <h3 className="assignNameC text-md font-bold">{assignment.name}</h3>
                                    <h4 className="assignTypeC text-md text-zinc-500">{typeToString(assignment.type)}</h4>
                                </div>
                                <h4 className="assignDueDateC">{assignment.due_date.slice(0, 16)}</h4>
                            </div>
                        ))
                    }
                </div>
            {/* </div> */}
          </div>
          {/* </div> */}
        </div>
        </div>
      )}
      {errors.message && (<h1>{errors.message}</h1>)}
    </>
  );
}

export default ClassPage;
