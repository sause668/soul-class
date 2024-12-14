import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { deleteAssignment, deleteClass, deleteGrade, removeStudent } from "../../redux/class";


const DeleteGradeModal = ({studentId, assignmentId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(deleteGrade({assignmentId, studentId}));
        closeModal();
    }
    
    return (
        <>
            <h3>{`Are you sure you want to delete this Grade?`}</h3>
            <div >
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            <br/>
            
        </>
    )
}

export default DeleteGradeModal