import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { removeStudent } from "../../redux/class";


const RemoveStudentModal = ({classId, student}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(removeStudent({
          classId, 
          studentId: student.id
        }));
        closeModal();
    }
    
    return (
        <div className="formCon">
            <h3>{`Are you sure you want to remove ${student.first_name} ${student.last_name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
        </div>
    )
}

export default RemoveStudentModal