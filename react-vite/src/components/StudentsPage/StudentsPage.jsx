import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./StudentsPage.css";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../../redux/student";

export default function StudentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavStudent = (studentId) => {
    navigate(`/students/${studentId}`)
  }

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

