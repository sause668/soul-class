import { useSelector } from "react-redux";
import "./HomePage.css";
import Dashboard from "../Dashboard/Dashboard";
import Landing from "../Landing/Landing";

function HomePage() {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {(user) ? <Dashboard/>:<Landing/>}
    </>
  );
}

export default HomePage;
