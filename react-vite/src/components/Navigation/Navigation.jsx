import { useLocation, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import StudentSearch from "./StudentSearch";
import { IoChevronBack } from "react-icons/io5";

import "./Navigation.css";

function Navigation() {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div id="navCon">
      {/* <div id="navLeftCon" className="flex justify-start items-center gap-2"> */}
      {(currentPath === '/') ? (
        <div id="navLogoCon" className="w-1/3">
          {/* <img src="/imgs/logo.png" alt="logo" id="navLogo"/> */}
        </div>
      ):(
        <div id="backButtonCon" className="w-1/3">
          <button id="backButton" type="button" onClick={()=>nav(-1)}>
            <IoChevronBack id="backButtonIcon" />
          </button>
        </div>
      )}
      <div id={(currentPath === '/') ? 'navTitleCon':''} className="w-1/3">
        <h1 id="navTitle" className="text-5xl font-bold cursor-pointer p-2 pb-3" onClick={()=>nav('/')}>Soul Academy</h1>
      </div>
      {/* </div> */}
      <div id="navRightCon" className="">
        <StudentSearch />
        <ProfileButton/>
      </div>
    </div>
  );
}

export default Navigation;
