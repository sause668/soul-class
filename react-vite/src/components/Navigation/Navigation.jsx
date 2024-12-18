import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const nav = useNavigate()
  return (
    <div id="navCon">
      <div id="navLogoCon">
        <img src="/imgs/logo.png" alt="logo" id="navLogo"/>
      </div>
      <div id="navTitleCon">
        <h1 id="navTitle" onClick={()=>nav('/')}>Soul Academy</h1>
      </div>
      <ProfileButton/>
    </div>
  );
}

export default Navigation;
