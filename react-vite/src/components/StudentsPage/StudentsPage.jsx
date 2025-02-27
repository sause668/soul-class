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
        <div id='studentsCon'>
            <div id="HeaderConSS">
                <div id="titleConSS">
                    <h1 id="titleSS">Student Search</h1>
                </div>
                <div id="searchConSS">
                    <input type="text" name="studentSearch" id="searchInputSS" placeholder="Search" />
                </div>
            </div>

            <div id="tableConSS">
                <table id="tableSS">
                    <thead id="tableHeadSS">
                        <tr className="tableHeadRowCC">
                            <td className="tableCellSS tableHeadCellSS">Last Name</td>
                            <td className="tableCellSS tableHeadCellSS">First Name</td>
                            <td className="tableCellSS tableHeadCellSS">Grade</td>
                        </tr>
                    </thead>
                    <tbody id="tableBodySS">
                        {students.map((student, index) => (
                            <tr 
                                className="tableBodyRowCC" 
                                key={`studentSearchTable${index}`}
                                onClick={()=>handleNavStudent(student.id)}
                            >
                                <td className="tableCellSS" >{student.last_name}</td>
                                <td className="tableCellSS" >{student.first_name}</td>
                                <td className="tableCellSS" >{student.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* <div id="studentsCon">
            {students.map((student, index) => (
                <div key={`studentInfo${index}`}>
                    <h3 onClick={()=>handleNavStudent(student.id)} >{student.first_name} {student.last_name}</h3>
                </div>
            ))}
            </div> */}
        </div>
        
      )}
    </>
  );
}

