import "./GradeBook.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import RemoveStudentModal from "./RemoveStudentModal";


const StudentInfoModal = ({classId, student}) => {
    return (
        <div id="studentInfoCon">
            <h3>{`${student.first_name} ${student.last_name}`}</h3>
            <h4>Grade: {student.grade}</h4>
            <OpenModalButton
                buttonText={'Remove Student'}
                modalComponent={<RemoveStudentModal
                    classId={classId}
                    student={student}
                    cssClasses={''}
                />}
            />
        </div>
    )
}

export default StudentInfoModal