import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Grades.css";
import Navigation from "../Navigation/Navigation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchClass } from "../../redux/class";

function Grades() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  if (!user || user.type != 'student') return <Navigate to="/" replace={true} />;

  useEffect(() => {
    dispatch(fetchClass({classId})).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation/>
      <h1>Grades</h1>
      {isLoaded && (
        <> 
          <h2>{class_.name}</h2>
          <h4>{class_.subject}</h4>
          <h4>{class_.grade}</h4>
          <h4>{class_.room}</h4>
          <h4>{class_.period}</h4>
          <h4>{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
          <h4>{class_.current_grade}</h4>
          
          <h3>Assignments</h3>
          <ul>
            {class_.assignments.map((assignment, index) => (
              <li>
                <h4>{assignment.name}</h4>
                <h5>{assignment.type}</h5>
                <h5>{assignment.quarter}</h5>
                <h5>{assignment.due_date}</h5>
                <h5>{assignment.grade}</h5>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Grades;
