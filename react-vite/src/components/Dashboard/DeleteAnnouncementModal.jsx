import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Dashboard.css";
import { removeAnnouncement, fetchAnnouncements } from "../../redux/announcement";
import { useState } from "react";

const DeleteAnnouncementModal = ({ announcement }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const serverResponse = await dispatch(removeAnnouncement({ announcementId: announcement.id }));

        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            // Refresh announcements list
            dispatch(fetchAnnouncements());
            closeModal();
        }
    };
    
    return (
        <div className="formCon">
            <h3 className="confirmTextCon">{`Are you sure you want to delete "${announcement.title}"?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    );
};

export default DeleteAnnouncementModal;
