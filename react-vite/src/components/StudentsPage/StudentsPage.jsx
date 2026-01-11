import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./StudentsPage.css";
import { useNavigate } from "react-router-dom";
import { fetchSearchStudents, fetchStudents } from "../../redux/student";
import { sortStudents } from "../../utils/Grading";

export default function StudentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);
  const [search, setSearch] = useState('');
  const [searchDelay, setSearchDelay] = useState(setTimeout(()=>null, 5000))
  const [rowHighlight, setRowHighlight] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNavStudent = (studentId) => {
    navigate(`/students/${studentId}`)
  }

  const handleSearch = (e) => {
    clearTimeout(searchDelay);
    setSearch(e.target.value);
    setSearchDelay(setTimeout(()=>studentSearch(e.target.value), 250));
  }

  const studentSearch = (searchStr) => {
    dispatch(fetchSearchStudents({search: searchStr}))
        .then((res) => {
            if (res && res.errors) {
                setErrors(res.errors);
            } 
        })
  }

  useEffect(() => {
    dispatch(fetchStudents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  


  return (
    <>
      {isLoaded && (
        <div id='studentsCon' className="flex flex-col justify-start items-center gap-2 py-5">
            <div id="headerConSS" className="flex flex-col justify-start items-center gap-2 w-full">
                <div id="titleConSS" className="whiteBox p-2 text-center">
                    <h1 id="titleSS" className="text-3xl font-bold">Student Search</h1>
                </div>
                <div id="searchConSS" className="whiteBox p-2 text-lg">
                    <input 
                        type="text" 
                        name="studentSearch" 
                        id="searchInputSS" 
                        placeholder="Search" 
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div id="tableConSS" className="whiteBox overflow-hidden">
                <table id="tableSS">
                    <thead id="tableHeadSS">
                        <tr className="tableHeadRowCC">
                            <td className="tableCellSS tableHeadCellSS">Last Name</td>
                            <td className="tableCellSS tableHeadCellSS">First Name</td>
                            <td className="tableCellSS tableHeadCellSS">Grade</td>
                        </tr>
                    </thead>
                    <tbody id="tableBodySS">
                        {students.sort((s1, s2) => sortStudents(s1, s2)).map((student, index) => {
                            const studentInfo = [student.last_name, student.first_name, student.grade]
                            return (
                                <tr 
                                    className="tableBodyRowCC" 
                                    key={`studentSearchTable${index}`}
                                    onClick={()=>handleNavStudent(student.id)}
                                >
                                    {studentInfo.map((info, index2) => (
                                        <td 
                                            key={`studentInfo${index}-${index2}`}
                                            className={`tableCellSS tableBodyCellSS ${index === rowHighlight && 'cellHighlightSS'}`} 
                                            onMouseOver={()=> setRowHighlight(index)} 
                                            onMouseLeave={()=> setRowHighlight(-1)}
                                        >{info}</td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
        
      )}
    </>
  );
}

