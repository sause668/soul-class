import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { fetchStudents } from "../../redux/student";
import { addStudent } from "../../redux/class";

function AddStudentModal({classId, currentStudentIds}) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newStudent, setNewStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState(6);
  const [room, setRoom] = useState(103);
  const [period, setPeriod] = useState(1);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [lastName, firstName] = newStudent.split(', ')
    const newStudentId = students.find(student => student.first_name == firstName && student.last_name == lastName).id
    const serverResponse = await dispatch(  
        addStudent({
            classId,
            studentId: newStudentId
        })
    );

    if (await serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(fetchStudents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        {isLoaded && (
            <div className='formCon'>
                <h1 className='inputTitle'>Add Student</h1>
                <form onSubmit={handleSubmit}>
                <div className='inputCon'>
                <select 
                    name="newStudent" 
                    id="newStudent" 
                    // value={`${newStudent.last_name}, ${newStudent.first_name}`} 
                    value={newStudent} 
                    onChange={(e) => setNewStudent(e.target.value)}
                >
                    {students.filter(student => !currentStudentIds.includes(student.id)).map((student, index) => (
                        <option value={`${student.last_name}, ${student.first_name}`} key={`newStudent${index}`}>{student.last_name}, {student.first_name}</option>
                    ))}
                    </select>
                </div>
                <button
                    className='submitButton'
                    type="submit"
                //   disabled={
                //     (!email.length ||
                //     !username.length ||
                //     !password.length ||
                //     !confirmPassword.length)
                //   }
                    >Submit</button>
                </form>
            </div>
        )}
    </>
    
  );
}

export default AddStudentModal;