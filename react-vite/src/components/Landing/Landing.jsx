import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landing.css";
import Navigation from "../Navigation/Navigation";

function Landing() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return (
    <>
      <Navigation/>
      <h1>Landing</h1>
      {isLoaded && (<></>)}
    </>
  );
}

export default Landing;
