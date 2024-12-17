import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div id="mainCon">
      <div id="logoCon">
        Logo
      </div>
      <div id="titleCon">
        <NavLink to="/">Soul Academy</NavLink>
      </div>

      <div id="profileButtonCon">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
