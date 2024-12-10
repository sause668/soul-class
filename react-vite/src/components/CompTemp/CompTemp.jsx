import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CompTemp.css";

function CompTemp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (<></>)}
    </>
  );
}

export default CompTemp;
