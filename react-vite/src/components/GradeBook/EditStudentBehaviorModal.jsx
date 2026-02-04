import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { editStudentBehavior } from "../../redux/class";
// import DeleteStudentBehaviorModal from "./DeleteBehaviorModal";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";

function EditStudentBehaviorModal({studentBehavior, student}) {
  const dispatch = useDispatch();
  const studentName = `${student.first_name} ${student.last_name}`;
  const [attention, setAttention] = useState(studentBehavior.attention);
  const [learnability, setLearnability] = useState(studentBehavior.learnability);
  const [cooperation, setCooperation] = useState(studentBehavior.cooperation);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(  
        editStudentBehavior({
            behaviorId: studentBehavior.id,
            attention,
            learnability,
            cooperation
        })
    );

    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };


  return (
    <div className='formCon'>
        <h1 className='inputTitle'>{`Edit ${studentName}'s Behaviors`}</h1>
        <form onSubmit={handleSubmit}>
        {/* Attention */}
        <div className='inputCon'>
          <label htmlFor='attention'>
            <p className='labelTitle'>
              Attention
            </p>
          </label>
          <select 
            name="attention" 
            id="attention" 
            className="selectGB"
            value={attention} 
            onChange={(e) => setAttention(e.target.value)}
          >
            <option value={1}>Poor</option>
            <option value={2}>Lacking</option>
            <option value={3}>Average</option>
            <option value={4}>Good</option>
            <option value={5}>Excellent</option>
          </select>
          {errors.attention && <p className='labelTitle error'>{errors.attention}</p>}
        </div>
        {/* Learnability */}
        <div className='inputCon'>
          <label htmlFor='learnability'>
            <p className='labelTitle'>
              Learnability
            </p>
          </label>
          <select 
            name="learnability" 
            id="learnability" 
            className="selectGB"
            value={learnability} 
            onChange={(e) => setLearnability(e.target.value)}
          >
            <option value={1}>Poor</option>
            <option value={2}>Lacking</option>
            <option value={3}>Average</option>
            <option value={4}>Good</option>
            <option value={5}>Excellent</option>
          </select>
          {errors.learnability && <p className='labelTitle error'>{errors.learnability}</p>}
        </div>
        {/* Cooperation */}
        <div className='inputCon'>
          <label htmlFor='cooperation'>
            <p className='labelTitle'>
              Cooperation
            </p>
          </label>
          <select 
            name="cooperation" 
            id="cooperation" 
            className="selectGB"
            value={cooperation} 
            onChange={(e) => setCooperation(e.target.value)}
          >
            <option value={1}>Poor</option>
            <option value={2}>Lacking</option>
            <option value={3}>Average</option>
            <option value={4}>Good</option>
            <option value={5}>Excellent</option>
          </select>
          {errors.cooperation && <p className='labelTitle error'>{errors.cooperation}</p>}
        </div>
        <div className="submitCon">
          <button 
              className='submitButton'
              type="submit"
          >Submit</button>
          {/* <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteStudentBehaviorModal studentBehavior={studentBehavior} studentName={studentName}/>}
            /> */}
        </div>
        {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </form>
    </div>
  );
}

export default EditStudentBehaviorModal;