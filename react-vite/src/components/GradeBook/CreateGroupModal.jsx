import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { createGroup } from "../../redux/class";

function CreateGroupModal({classId}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(  
        createGroup({
            classId,
            name
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
        <h1 className='inputTitle'>Create Group</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputCon'>
            <label htmlFor='name'>
              <p className='labelTitle'>
                Name
              </p>
            </label>
            <input
              className='formInput'
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
                {errors.name && <p className='labelTitle error'>{errors.name}</p>}
          </div>
          <div className="submitCon">
            <button 
              className='submitButton'
              type="submit"
              disabled={(!name.length)}
            >Submit</button>
          </div>
          {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </form>
    </div>
  );
}

export default CreateGroupModal;