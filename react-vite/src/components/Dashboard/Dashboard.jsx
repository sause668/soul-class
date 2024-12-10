import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import Navigation from "../Navigation/Navigation";
import { fetchClasses } from "../../redux/class";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchClasses()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation/>
      <h1>Dashboard</h1>
      {isLoaded && (
        <>
          <h2>{user.first_name} {user.last_name}</h2>
          {(user.type == 'teacher') ? (<>
              <h4>{user.type}</h4>
              <h4>{user.email}</h4>
              <h4>{user.teacher.primary_grade}</h4>
              <h4>{user.teacher.primary_subject}</h4>
            </>):(<>
              <h4>{user.type}</h4>
              <h4>{user.email}</h4>
              <h4>{user.student.grade}</h4>
            </>)}
          <h2>Classes</h2>
          <ul>
            {(user.type == 'teacher') ? (<>
              {classes.map((class_, index) => (
                <li>
                  <h3>{class_.name}</h3>
                  <h4>{class_.subject}</h4>
                  <h4>{class_.grade}</h4>
                  <h4>{class_.room}</h4>
                  <h4>{class_.period}</h4>
                  <h4>{class_.num_students}</h4>
                </li>
              ))}
            </>):(<>
              {classes.map((class_, index) => (
                <li>
                  <h3>{class_.name}</h3>
                  <h4>{class_.subject}</h4>
                  <h4>{class_.grade}</h4>
                  <h4>{class_.room}</h4>
                  <h4>{class_.period}</h4>
                  <h4>{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
                  <h4>{class_.current_grade}</h4>
                </li>
              ))}
            </>)}
            
          </ul>
        </>
      )}
    </>
  );
}

export default Dashboard;
