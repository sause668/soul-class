import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { deleteStudentBehavior } from "../../redux/class";
import { useState } from "react";


const DeleteStudentBehaviorModal = ({studentBehavior, studentName}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const serverResponse = await dispatch(deleteStudentBehavior({behaviorId: studentBehavior.id}));
        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
          } else {
            closeModal();
          }
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete ${studentName}'s behaviors?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    )
}

export default DeleteStudentBehaviorModal