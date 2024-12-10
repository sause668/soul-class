import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GradeBook.css";
import Navigation from "../Navigation/Navigation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchClass } from "../../redux/class";

function GradeBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  if (!user || user.type != 'teacher') return <Navigate to="/" replace={true} />;

  useEffect(() => {
    dispatch(fetchClass({classId})).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation/>
      <h1>Grade Book</h1>
      {isLoaded && (
        <> 
          <h2>{class_.name}</h2>
          <h4>{class_.subject}</h4>
          <h4>{class_.grade}</h4>
          <h4>{class_.room}</h4>
          <h4>{class_.period}</h4>
          <h3>Students</h3>
          <ul>
            {class_.students.map((student, index) => (
              <li>
                <h4>{student.first_name}</h4>
                <h5>{student.last_name}</h5>
                <h5>{student.id}</h5>
                <h5>{student.grade}</h5>
              </li>
            ))}
          </ul>
          <h3>Assignments</h3>
          <ul>
            {class_.assignments.map((assignment, index) => (
              <li>
                <h4>{assignment.name}</h4>
                <h5>{assignment.type}</h5>
                <h5>{assignment.quarter}</h5>
                <h5>{assignment.due_date}</h5>
                <h5>grades</h5>
                {assignment.grades.map((grade, index) => (
                  <>
                    <h6>{grade.student_id}, {grade.grade}</h6>
                  </>
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default GradeBook;
