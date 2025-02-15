import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "./StudentsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { calcFinalGradeStudent } from "../../utils/Grading";
import { fetchStudent, fetchStudents } from "../../redux/student";
import { fetchStudentClasses } from "../../redux/class";

export default function StudentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavStudent = (studentId) => {
    navigate(`/students/${studentId}`)
  }

//   const handleGrades = (classId) => {
//     navigate(`/grades/${classId}`)
//   }

  useEffect(() => {
    dispatch(fetchStudents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  


  return (
    <>
      {isLoaded && (
        <div id="studentsCon">
          {students.map((student, index) => (
            <div key={`studentInfo${index}`}>
                <h3 onClick={()=>handleNavStudent(student.id)} >{student.first_name} {student.last_name}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

