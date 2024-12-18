import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { deleteAssignment } from "../../redux/class";


const DeleteAssignmentModal = ({assignment}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(deleteAssignment({assignmentId: assignment.id}));
        closeModal();
    }
    
    return (
        <div className="formCon">
            <h3>{`Are you sure you want to delete ${assignment.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
        </div>
    )
}

export default DeleteAssignmentModal