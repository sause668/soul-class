import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const handleNavDashboard = () => {
    navigate(`/`)
    setShowMenu(false);
  }

  const handleNavStudents = () => {
    navigate(`/students`)
    setShowMenu(false);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate(`/`);
    closeMenu();
  };

  return (
    <div id="navProfileButtonCon">
      <button id="navProfileButton" onClick={toggleMenu}>
        <FaUserCircle id='navProfileLogo'/>
      </button>
      {showMenu && (
        <div className={"profile-dropdown whiteBox"} ref={ulRef}>
          <div className="navDropdownItem">
            <h3 className="navLogout" onClick={handleNavDashboard}>Dashboard</h3>
          </div>
          <div className="navDropdownItem">
            <h3 className="navLogout" onClick={handleNavStudents}>Student Search</h3>
          </div>
          <div className="navDropdownItem">
            <h3 className="navLogout" onClick={logout}>Log Out</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
