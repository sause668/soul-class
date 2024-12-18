import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { deleteGrade } from "../../redux/class";


const DeleteGradeModal = ({studentId, assignmentId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(deleteGrade({assignmentId, studentId}));
        closeModal();
    }
    
    return (
        <div className="formCon">
            <h3>{`Are you sure you want to delete this Grade?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
        </div>
    )
}

export default DeleteGradeModal