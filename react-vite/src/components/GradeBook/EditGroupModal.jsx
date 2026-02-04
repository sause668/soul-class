import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GradeBook.css";
import { editGroup } from "../../redux/class";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteGroupModal from "./DeleteGroupModal";

function EditGroupModal({group}) {
  const dispatch = useDispatch();
  const [currentName, setCurrentName] = useState(group.name);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(  
        editGroup({
            groupId: group.id,
            name: currentName
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
        <h1 className='inputTitle'>Edit Group</h1>
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
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              required
            />
                {errors.name && <p className='labelTitle error'>{errors.name}</p>}
          </div>
          <div className="submitCon">
            <button 
              className='submitButton'
              type="submit"
            >Submit</button>
            <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteGroupModal 
                groupId={group.id}
              />}
              cssClasses={''}
            />
          </div>
          {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </form>
    </div>
  );
}

export default EditGroupModal;