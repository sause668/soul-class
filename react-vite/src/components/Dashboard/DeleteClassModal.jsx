import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./Dashboard.css";
import { deleteClass } from "../../redux/class";


const DeleteClassModal = ({classDelete}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async () => {
        dispatch(deleteClass({classId: classDelete.id}));
        closeModal();
    }
    
    return (
        <div className="formCon">
            <h3>{`Are you sure you want to delete ${classDelete.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
        </div>
    )
}

export default DeleteClassModal