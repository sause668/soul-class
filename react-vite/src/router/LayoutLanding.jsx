// import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
// import { thunkAuthenticate } from "../redux/session";
// import Navigation from "../components/Navigation/Navigation";

export default function LayoutLanding() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        {/* {isLoaded && <Outlet />} */}
        <Outlet />
        <Modal />
      </ModalProvider>
    </>
  );
}
