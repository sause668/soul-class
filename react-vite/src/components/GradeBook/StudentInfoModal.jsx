import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { deleteClass, removeStudent } from "../../redux/class";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import RemoveStudentModal from "./RemoveStudentModal";


const StudentInfoModal = ({classId, student}) => {
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
        <>
            <h3>{`${student.first_name} ${student.last_name}?`}</h3>
            <h4>Grade: {student.grade}</h4>
            <OpenModalButton
                buttonText={'Remove Student'}
                modalComponent={<RemoveStudentModal
                    classId={classId}
                    student={student}
                    cssClasses={''}
                />}
            />
            <br/>
            
        </>
    )
}

export default StudentInfoModal