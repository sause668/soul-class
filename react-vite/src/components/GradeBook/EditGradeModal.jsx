import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { editGrade } from "../../redux/class";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteGradeModal from "./DeleteGradeModal";

function EditGradeModal({grade}) {
  const dispatch = useDispatch();
  const [currentGrade, setCurrentGrade] = useState(grade.grade);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(  
        editGrade({
            assignmentId: grade.assignment_id,
            studentId: grade.student_id,
            grade: currentGrade
        })
    );

    if (await serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };



  return (
    <div className='formCon'>
        <h1 className='inputTitle'>Edit Grade</h1>
        <form onSubmit={handleSubmit}>
        <div className='inputCon'>
          <label htmlFor='grade'>
            <p className='labelTitle'>
              Grade
            </p>
          </label>
          <input
            className='formInput'
            type="number"
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            required
          />
          {errors.grade && <p className='labelTitle error'>{errors.grade}</p>}
        </div>
        <div className="submitCon">
          <button 
            className='submitButton'
            type="submit"
            // disabled={
            //   (!email.length ||
            //   !username.length ||
            //   !firstName.length ||
            //   !lastName.length ||
            //   !password.length ||
            //   !confirmPassword.length)
            // }
          >Submit</button>
          <OpenModalButton
            buttonText={'Delete'}
            modalComponent={<DeleteGradeModal 
              assignmentId={grade.assignment_id}
              studentId={grade.student_id}
            />}
            cssClasses={''}
          />
        </div>
        </form>
        
    </div>
  );
}

export default EditGradeModal;