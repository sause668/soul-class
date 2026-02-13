import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


import "../Dashboard.css";
import { fetchTeacherClasses } from "../../../redux/class";
import { fetchAnnouncements } from "../../../redux/announcement";
import EditClassModal from "../EditClassModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateClassModal from "../CreateClassModal";
import CreateAnnouncementModal from "../CreateAnnouncementModal";
import EditAnnouncementModal from "../EditAnnouncementModal";
import DeleteAnnouncementModal from "../DeleteAnnouncementModal";
// import DeleteClassModal from "../DeleteClassModal";
import { useNavigate } from "react-router-dom";
import { nameToString } from "../../../utils/TypeConvertion";
import { convertBehaviorPriorityGradeColor, getPriorityStudents } from "../../../utils/Grading";

function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const announcements = useSelector((state) => state.announcement.announcements) || [];
  const { highlightStudents, focusStudents } = getPriorityStudents(classes);
  const [isLoaded, setIsLoaded] = useState(false);

  // const handleGradeBook = (e, classId) => {
  //   e.stopPropagation()
  //   navigate(`/gradebook/${classId}`)
  // }

  

  const appointments = [ 
    {
      date: '10/4/25',
      firstName: 'Harry',
      lastName: 'Potter',
      time: '10:00 AM',
    },
    {
      date: '10/5/25',
      time: '11:00 AM',
      firstName: 'Hermione',
      lastName: 'Granger',
    },
    {
      date: '10/6/25',
      time: '12:00 PM',
      firstName: 'Ron',
      lastName: 'Weasley',
    },
    {
      date: '10/7/25',
      time: '1:00 PM',
      firstName: 'Draco',
      lastName: 'Malfoy',
    },
  ]

  const classHeaders = [
    {
      header: 'Grade',
      key: 'grade',
    },
    {
      header: 'Class',
      key: 'name',
    },
    {
      header: 'Period',
      key: 'period',
    },
    {
      header: 'Room',
      key: 'room',
    },
    {
      header: 'Students',
      key: 'num_students',
    },
    {
      header: 'Actions',
      key: 'actions',
    },
  ]

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };
  
  useEffect(() => {
    Promise.all([
      dispatch(fetchTeacherClasses({teacherId: user.teacher.id})),
      dispatch(fetchAnnouncements())
    ]).then(() => setIsLoaded(true));
  }, [dispatch, user]);

  


  return (
    <>
      {isLoaded && (
        <div id="dashboardConCon" className="flex justify-center py-5">
        <div id="dashboardCon" className=" flex justify-center gap-[1rem] w-[70%] ">
          <div id='profileSideDB' className="w-[30%] flex flex-col justify-flex-start items-center gap-2">
            <div id="profileConDB"className="whiteBox p-2">
              <div id="profilePicConDB ">
                <FiUser id='profilePicDB' className="text-[10rem] bg-white rounded-full"/>
              </div>
              <div id="profileInfoConDB">
                <h3 className="profileInfoDB text-2xl font-bold">{user.first_name} {user.last_name}</h3>
                <h4 className="profileInfoDB text-lg">Teacher</h4>
                <h4 className="profileInfoDB text-zinc-500">{user.teacher.primary_grade}th Grade {user.teacher.primary_subject}</h4>
                
              </div>
            </div>
            <div id="appsConDB" className="whiteBox w-full">
              <h2 id="appsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Appointments</h2>
              <div id="appsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {appointments.map((appointment, index) => (
                  <div className=" appsItemDB flex justify-between items-center gap-2 px-2 py-1.5 hover:bg-blue-100 transition-colors duration-300 cursor-pointer" key={`appsItemT${index}`}>
                    <div className="appsPicConDB shrink-0 grow-0">
                      <FiUser className="appsPicDB text-2xl bg-white rounded-full"/>
                    </div>
                    {/* <div className="appsInfoConDB flex flex-row justify-flex-start items-flex-start gap-4"> */}
                      <h3 className="appsDateDB text-sm font-bold shrink grow">{appointment.date}</h3>
                      <h3 className="appsTimeDB text-sm shrink grow">{appointment.time}</h3>
                      <h4 className="appsNameDB text-sm shrink grow">{nameToString(appointment.firstName, appointment.lastName)}</h4>
                    {/* </div> */}
                  </div>
                ))}
              </div>
            </div>
            <div id="highlightStudentsConDB" className="whiteBox w-full overflow-hidden">
              <h2 id="highlightStudentsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Highlight Students</h2>
              <div id="highlightStudentsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {highlightStudents.map((student, index) => (
                  <div 
                    className={`highlightStudentsItemDB flex justify-between items-center gap-2 px-2 py-1.5 ${convertBehaviorPriorityGradeColor(student.priority)} hover:opacity-80 transition-opacity duration-300 cursor-pointer`} 
                    key={`highlightStudentsItemT${index}`}
                    onClick={()=>navigate(`/students/${student.id}`)}
                  >
                    <div className="highlightStudentsInfoConDB flex flex-row justify-flex-start items-flex-start gap-4">
                      <FiUser className="highlightStudentsPicDB text-2xl bg-white rounded-full"/>
                      <h3 className="highlightStudentsNameDB text-sm font-bold">{nameToString(student.firstName, student.lastName)}</h3>
                    </div>
                    <h3 className="highlightStudentsPNDB text-sm">Priority: {student.priority}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div id="focusStudentsConDB" className="whiteBox w-full overflow-hidden">
              <h2 id="focusStudentsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Focus Students</h2>
              <div id="focusStudentsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {focusStudents.map((student, index) => (
                  <div 
                  className={`focusStudentsItemDB flex justify-between items-center gap-2 px-2 py-1.5 ${convertBehaviorPriorityGradeColor(student.priority)} hover:opacity-80 transition-opacity duration-300 cursor-pointer`} 
                  key={`focusStudentsItemT${index}`}
                  onClick={()=>navigate(`/students/${student.id}`)}
                  >
                    <div className="focusStudentsInfoConDB flex flex-row justify-flex-start items-flex-start gap-4">
                      <FiUser className="focusStudentsPicDB text-2xl bg-white rounded-full"/>
                      <h3 className="focusStudentsNameDB text-sm">{nameToString(student.firstName, student.lastName)}</h3>
                    </div>
                    {/* <h4 className="focusStudentsGradeDB text-sm">{student.grade}</h4> */}
                    <h3 className="focusStudentsPNDB text-sm">Priority: {student.priority}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="contentSideDB" className="w-[70%] flex flex-col justify-flex-start items-flex-start gap-2 height-full">
            <div id="classesConDB" className="whiteBox flex flex-col justify-flex-start items-flex-start ">
              <div id="classTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="classTitleDB" className="text-xl font-bold">Current Classes</h3>
                <OpenModalButton
                  buttonText={<FiPlus className="text-2xl" />}
                  modalComponent={<CreateClassModal />}
                  cssClasses={'newClassButtonDB text-2xl m-0 p-1 bg-blue-500 text-white rounded-full hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors duration-300'}
                />
              </div>
              <div id="classTableConDB" className="w-full">
                <table id="classTableDB" className="w-full">
                  <thead>
                    <tr className="bg-gray-200 text-black border-b border-gray-300">
                      {classHeaders.map((header, index) => (
                        <th className={`classTableHeaderDB${index} `} key={`classTableHeaderT${index}`}>{header.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((class_, index) => (
                      <tr 
                      key={`classRowT${index}`} 
                      className={`${index < classes.length - 1 ? 'border-b border-gray-300' : ''} hover:bg-blue-100 transition-colors duration-300 cursor-pointer`}
                      onClick={()=>navigate(`/classes/${class_.id}`)}
                      >
                        <td id="classTableCellDB">{class_.grade}th Grade</td>
                        <td id="classTableCellDB">{class_.name}</td>
                        <td id="classTableCellDB">{class_.period}</td>
                        <td id="classTableCellDB">{class_.room}</td>
                        <td id="classTableCellDB">{class_.num_students}</td>
                        <td id="classTableCellDB">
                          <OpenModalButton
                            buttonText={<MdEdit />}
                            modalComponent={<EditClassModal classEdit={class_} />}
                            cssClasses={'classButtonDB editDB text-2xl m-0 p-1 bg-blue-500 text-white rounded-full'}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="announcementsConDB" className="whiteBox">
              <div id="announcementsTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="announcementsTitleDB" className="text-xl font-bold">Announcements</h3>
                <OpenModalButton
                  buttonText={<FiPlus className="text-2xl" />}
                  modalComponent={<CreateAnnouncementModal />}
                  cssClasses={'newClassButtonDB text-2xl m-0 p-1 bg-blue-500 text-white rounded-full border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-colors duration-300'}
                />
              </div>
              <div id="announcementsListConDB" className="flex flex-col justify-flex-start items-flex-start gap-5 p-2">
                {announcements.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">No announcements yet</div>
                ) : (
                  announcements.map((announcement, index) => {
                    const isOwner = announcement.user_id === user.id;
                    return (
                      <div className={`announcementItemDB flex flex-col justify-flex-start items-flex-start gap-1 ${index > 0 ? 'border-t border-gray-300 pb-2 pt-2' : ''}`} key={`announcementItemT${announcement.id}`}>
                        <div className="announcementProfileConDB flex justify-between items-center w-full">
                          <div className="announcementProfileInfoConDB flex justify-flex-start items-center gap-2">
                            <div className="announcementProfilePicConDB">
                              <FiUser className="announcementProfilePicDB text-2xl bg-white rounded-full"/>
                            </div>
                            <div className="announcementProfileDisConDB gap-0.1">
                              <div className="flex items-center gap-2">
                                <h3 className="announcementProfileNameDB text-sm m-0 p-0">{nameToString(announcement.author_first_name, announcement.author_last_name)}</h3>
                                {isOwner && (
                                  <div className="flex items-center gap-1">
                                    <OpenModalButton
                                      buttonText={<MdEdit className="text-sm" />}
                                      modalComponent={<EditAnnouncementModal announcement={announcement} />}
                                      cssClasses={'text-sm m-0 p-1 bg-blue-500 text-white rounded border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'}
                                    />
                                    <OpenModalButton
                                      buttonText={<MdDelete className="text-sm" />}
                                      modalComponent={<DeleteAnnouncementModal announcement={announcement} />}
                                      cssClasses={'text-sm m-0 p-1 bg-red-500 text-white rounded border-2 border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors duration-300 '}
                                    />
                                  </div>
                                )}
                              </div>
                              <h4 className="announcementProfilePositionDB text-xs m-0 p-0 text-zinc-500">{announcement.author_type}</h4>
                            </div>
                          </div>
                          <div className="announcementProfileOptionsConDB">
                            <h4 className="announcementProfileOptionsDB text-sm m-0 p-0 text-zinc-500">{formatDate(announcement.created_at)}</h4>
                          </div>
                        </div>
                        <div id="announcementContentConDB" className="flex flex-col justify-flex-start items-flex-start gap-1">
                          <h3 id="announcementContentTitleDB">{announcement.title}</h3>
                          <p id="announcementContentTextDB">{announcement.content}</p>
                          {announcement.image_url && (
                            <div id="announcementContentPicConDB">
                              <img id="announcementContentPicDB" src={announcement.image_url} alt="Announcement picture" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default TeacherDashboard;
