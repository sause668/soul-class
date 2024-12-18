import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { createAssignment } from "../../redux/class";
import { stringToType } from "../../utils/TypeConvertion";

function NewAssignmentModal({classId, quarter}) {
  const dispatch = useDispatch();
  const [assignName, setAssignName] = useState('');
  const [type, setType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(  
        createAssignment({
            classId,
            name: assignName,
            type: stringToType(type),
            quarter,
            dueDate
        })
    );

    if (await serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };



  return (
    <div className='formCon'>
        <h1 className='inputTitle'>New Assignment</h1>
        <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='inputCon'>
          <label htmlFor='assignName'>
            <p className='labelTitle'>
              Assignment Name
            </p>
          </label>
          <input
            className='formInput'
            type="text"
            value={assignName}
            onChange={(e) => setAssignName(e.target.value)}
            required
          />
          {errors.assignName && <p className='labelTitle error'>{errors.assignName}</p>}
        </div>
        {/* Type */}
        <div className='inputCon'>
          <label htmlFor='type'>
            <p className='labelTitle'>
              Type
            </p>
          </label>
          <select 
            name="type" 
            id="type" 
            className="typeSelectGB"
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value='Classwork'>Classwork</option>
            <option value='Homework'>Homework</option>
            <option value='Quiz'>Quiz</option>
            <option value='Test'>Test</option>
            <option value='Project'>Project</option>
          </select>
          {errors.type && <p className='labelTitle error'>{errors.type}</p>}
        </div>
        {/* Due Date */}
        <div className='inputCon'>
          <label htmlFor='dueDate'>
            <p className='labelTitle'>
              Due Date
            </p>
          </label>
          <input
            className='formInput'
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          {errors.dueDate && <p className='labelTitle error'>{errors.dueDate}</p>}
        </div>
        <div className="submitCon">
            <button 
                className='submitButton'
                type="submit"
                // disabled={
                //   (!email.length ||
                //   !username.length ||
                //   !firstName.length ||
                //   !lastName.length ||
                //   !password.length ||
                //   !confirmPassword.length)
                // }
            >Submit</button>
        </div>
        </form>
    </div>
  );
}

export default NewAssignmentModal;