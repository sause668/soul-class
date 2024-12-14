import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { deleteAssignment, deleteClass, removeStudent } from "../../redux/class";


const DeleteAssignmentModal = ({assignment}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(deleteAssignment({assignmentId: assignment.id}));
        closeModal();
    }
    
    return (
        <>
            <h3>{`Are you sure you want to delete ${assignment.name}?`}</h3>
            <div >
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            <br/>
            
        </>
    )
}

export default DeleteAssignmentModal