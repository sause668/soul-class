import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import Dashboard from "../Dashboard/Dashboard";
import Landing from "../Landing/Landing";

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return (
    <>
      {(user) ? <Dashboard/>:<Landing/>}

    </>
  );
}

export default HomePage;
