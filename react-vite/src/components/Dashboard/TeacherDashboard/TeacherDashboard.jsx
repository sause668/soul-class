import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { MdEdit } from "react-icons/md";


import "../Dashboard.css";
import { fetchTeacherClasses } from "../../../redux/class";
import EditClassModal from "../EditClassModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateClassModal from "../CreateClassModal";
// import DeleteClassModal from "../DeleteClassModal";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);

  // const handleGradeBook = (e, classId) => {
  //   e.stopPropagation()
  //   navigate(`/gradebook/${classId}`)
  // }

  useEffect(() => {
    dispatch(fetchTeacherClasses({teacherId: user.teacher.id})).then(() => setIsLoaded(true));
  }, [dispatch, user]);

  


  return (
    <>
      {isLoaded && (
        <div className="dashboardCon">
          <div id='profileSideDB'>
            <div>
              <div id="profileConDB"className="">
                <div id="profilePicConDB">
                  <FiUser id='profilePicDB'/>
                </div>
                <div id="profileInfoConDB">
                  <h2 className="profileInfoDB">{user.first_name} {user.last_name}</h2>
                  <h4 className="profileInfoDB">Teacher</h4>
                  <h4 className="profileInfoDB">Primary Grade: {user.teacher.primary_grade}</h4>
                  <h4 className="profileInfoDB">Primary Subject: {user.teacher.primary_subject}</h4>
                  
                </div>
              </div>
              <div id="appsConDB">
                <h2 id="appsTitleDB">Appointments</h2>
                <div id="appsListDB">
                  <div id="appsItemDB">
                    <div id="appsPicConDB">
                      <FiUser id='appsPicDB'/>
                    </div>
                    <div id="appsInfoConDB">
                      <h3 id="appsDateDB">10/4/2025</h3>
                      <h4 id="appsNameDB">Harry Potter</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div id="focusStudentsConDB">
                <h2 id="focusStudentsTitleDB">Focus Students</h2>
                <div id="focusStudentsListDB">
                  <div id="focusStudentsItemDB">
                    <div id="focusStudentsPicConDB">
                      <FiUser id='focusStudentsPicDB'/>
                    </div>
                    <div id="focusStudentsInfoConDB">
                      <h3 id="focusStudentsNameDB">Harry Potter</h3>
                      <h4 id="focusStudentsGradeDB">10th Grade</h4>
                    </div>
                    <div id="focusStudentsPNDB">Priority: At Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="contentSideDB">
            <div id="classesConDB">
              <div id="classTitleConDB">
                <h3 id="classTitleDB">CurrentClasses</h3>
                <OpenModalButton
                  buttonText={'New Class'}
                  modalComponent={<CreateClassModal />}
                  cssClasses={'newClassButtonDB'}
                />
              </div>
              <div id="classTableConDB">
                <table id="classTableDB">
                  <thead>
                    <tr>
                      <th id="classTableHeaderDB">Grade</th>
                      <th id="classTableHeaderDB">Class</th>
                      <th id="classTableHeaderDB">Period</th>
                      <th id="classTableHeaderDB">Room</th>
                      <th id="classTableHeaderDB">Students</th>
                      <th id="classTableHeaderDB">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((class_, index) => (
                      <tr key={`classRowT${index}`}>
                        <td id="classTableCellDB">{class_.grade}th Grade</td>
                        <td id="classTableCellDB">{class_.name}</td>
                        <td id="classTableCellDB">{class_.period}</td>
                        <td id="classTableCellDB">{class_.room}</td>
                        <td id="classTableCellDB">{class_.num_students} Students</td>
                        <td id="classTableCellDB">
                          <OpenModalButton
                            buttonText={<MdEdit />}
                            modalComponent={<EditClassModal classEdit={class_} />}
                            cssClasses={'classButtonDB editDB'}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="announcementsConDB">
              <h2 id="announcementsTitleDB">Announcements</h2>
              <div id="announcementsListDB">
                <div id="announcementItemDB">
                  <div id="announcementProfileConDB">
                    <div id="announcementProfilePicConDB">
                      <FiUser id='announcementProfilePicDB'/>
                    </div>
                    <div id="announcementProfileInfoConDB">
                      <h3 id="announcementProfileNameDB">Harry Potter</h3>
                      <h4 id="announcementProfilePositionDB">10th Grade</h4>
                      <h4 id="announcementProfileDateDB">10/4/2025</h4>
                    </div>
                  </div>
                  <div id="announcementContentConDB">
                    <h3 id="announcementContentTitleDB">Announcement 1 title</h3>
                    <p id="announcementContentTextDB">Announcement 1 content</p>
                    <div id="announcementContentPicConDB">
                      <img id="announcementContentPicDB" src="https://via.placeholder.com/150" alt="Announcement 1 picture" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {classes.map((class_, index) => (
              <div className="classGridConDB" key={`classConT${index}`}>
                <div className="classConDB lightBlueBox" onClick={()=>navigate(`/classes/${class_.id}`)}>
                  <div>
                    <h3 className="classInfoDB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h3>
                    <h4 className="classInfoDB">Room - {class_.room}, {class_.num_students} Students</h4>
                  </div>
                  
                  <div className="classButtonsConDB">
                    <OpenModalButton
                      buttonText={<MdEdit />}
                      modalComponent={<EditClassModal classEdit={class_} />}
                      cssClasses={'classButtonDB editDB'}
                    />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
}

export default TeacherDashboard;
