import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "../Dashboard.css";
import { fetchStudentClasses } from "../../../redux/class";
import { fetchAnnouncements } from "../../../redux/announcement";
import { fetchAppointments } from "../../../redux/appointment";
import { useNavigate } from "react-router-dom";
import { nameToString } from "../../../utils/TypeConvertion";
import { calcFinalGradeStudent, calcLetterGrade, convertBehaviorPriorityGrade, calcBehaviorGrade, convertBehaviorPriorityGradeColor } from "../../../utils/Grading";

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const announcements = useSelector((state) => state.announcement.announcements) || [];
  const appointments = useSelector((state) => state.appointment.appointments) || [];

  const [isLoaded, setIsLoaded] = useState(false);

  const classHeaders = [
    // {
    //   header: 'Grade',
    //   key: 'grade',
    // },
    {
      header: 'Period',
      key: 'period',
    },
    {
      header: 'Room',
      key: 'room',
    },
    {
      header: 'Class',
      key: 'name',
    },
    {
      header: 'Teacher',
      key: 'teacher',
    },
    {
      header: 'Grade',
      key: 'grade',
    },
  ]

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  };

  const formatAppointmentTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // const handleGrades = (classId) => {
  //   navigate(`/grades/${classId}`)
  // }

  useEffect(() => {
    Promise.all([
      dispatch(fetchStudentClasses({studentId: user.student.id})),
      dispatch(fetchAnnouncements()),
      dispatch(fetchAppointments())
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
                <h4 className="profileInfoDB text-lg">Student</h4>
                <h4 className="profileInfoDB text-zinc-500">{user.student.grade}th Grade</h4>
                
              </div>
            </div>
            <div id="behaviorConDB" className="whiteBox w-full overflow-hidden">
              <h2 id="behaviorTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Behavior</h2>
              <div id="behaviorListDB" className="flex flex-col justify-flex-start items-flex-start"> 
                {classes.map((class_, index) => {
                  // const attentionGrade = convertBehaviorGrade(class_.behaviors.attention);
                  // const learnabilityGrade = convertBehaviorGrade(class_.behaviors.learnability);
                  // const cooperationGrade = convertBehaviorGrade(class_.behaviors.cooperation);
                  const priorityGrade = convertBehaviorPriorityGrade(calcBehaviorGrade(class_.behaviors.attention, class_.behaviors.learnability, class_.behaviors.cooperation));
                  const priorityGradeColor = convertBehaviorPriorityGradeColor(priorityGrade);
                return (
                  <div id="behaviorListItemDB" className={`flex justify-between items-center p-2 px-4 w-full ${index < classes.length - 1 ? 'border-b border-gray-300' : ''} ${priorityGradeColor} hover:opacity-80 transition-opacity duration-300 cursor-pointer`} key={`behaviorGradeT${index}`}>
                    <h3 id="behaviorTitleDB" className={`text-md font-bold`}>{class_.name}</h3>
                    <h3 id="behaviorGradeDB" className={`text-md `}>{priorityGrade}</h3>
                  </div>
                )
              })}</div>
              
              
            </div>
            <div id="appsConDB" className="whiteBox w-full">
              <h2 id="appsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Appointments</h2>
              <div id="appsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {appointments.length === 0 ? (
                  <div className="text-center text-gray-500 py-4 px-2 w-full">
                    <p className="text-sm">No appointments scheduled</p>
                  </div>
                ) : (
                  appointments.slice(0, 5).map((appointment) => (
                    <div 
                      className="appsItemDB flex justify-between items-center gap-2 px-2 py-1.5 hover:bg-blue-100 transition-colors duration-300 cursor-pointer w-full" 
                      key={`appsItemS${appointment.id}`}
                      onClick={() => navigate('/appointments')}
                    >
                      <div className="appsPicConDB shrink-0 grow-0">
                        <FiUser className="appsPicDB text-2xl bg-white rounded-full"/>
                      </div>
                      <h3 className="appsDateDB text-sm font-bold shrink grow">{formatAppointmentDate(appointment.appointment_date)}</h3>
                      <h3 className="appsTimeDB text-sm shrink grow">{formatAppointmentTime(appointment.appointment_time)}</h3>
                      <h4 className="appsNameDB text-sm shrink grow">{nameToString(appointment.teacher_first_name, appointment.teacher_last_name)}</h4>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* <div id="highlightStudentsConDB" className="whiteBox w-full">
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
            <div id="focusStudentsConDB" className="whiteBox w-full">
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
                    <h3 className="focusStudentsPNDB text-sm">Priority: {student.priority}</h3>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
          <div id="contentSideDB" className="w-[70%] flex flex-col justify-flex-start items-flex-start gap-2 height-full">
            <div id="classesConDB" className="whiteBox flex flex-col justify-flex-start items-flex-start ">
              <div id="classTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="classTitleDB" className="text-xl font-bold">Current Classes</h3>
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
                    {classes.map((class_, index) => {
                      const finalGrade = calcFinalGradeStudent(class_.assignments);
                      const finalLetterGrade = calcLetterGrade(finalGrade);
                      return (
                      <tr 
                      key={`classRowT${index}`} 
                      className={`${finalGrade != 'N/A' ? finalLetterGrade:'noGrade'} ${index < classes.length - 1 ? 'border-b border-gray-300' : ''} hover:opacity-80 transition-opacity duration-300 cursor-pointer`}
                      onClick={()=>navigate(`/grades/${class_.id}`)}
                      >
                        <td id="classTableCellDB">{class_.period}</td>
                        <td id="classTableCellDB">{class_.room}</td>
                        <td id="classTableCellDB">{class_.name}</td>
                        <td id="classTableCellDB">{nameToString(class_.teacher.last_name, class_.teacher.first_name)}</td>
                        <td id="classTableCellDB">{finalGrade} ({finalLetterGrade})</td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="announcementsConDB" className="whiteBox">
              <div id="announcementsTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="announcementsTitleDB" className="text-xl font-bold">Announcements</h3>
              </div>
              <div id="announcementsListConDB" className="flex flex-col justify-flex-start items-flex-start gap-5 p-2">
                {announcements.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">No announcements yet</div>
                ) : (
                  announcements.map((announcement, index) => (
                    <div className={`announcementItemDB flex flex-col justify-flex-start items-flex-start gap-1 ${index > 0 ? 'border-t border-gray-300 pb-2 pt-2' : ''}`} key={`announcementItemS${announcement.id}`}>
                      <div className="announcementProfileConDB flex justify-between items-center w-full">
                        <div className="announcementProfileInfoConDB flex justify-flex-start items-center gap-2">
                          <div className="announcementProfilePicConDB">
                            <FiUser className="announcementProfilePicDB text-2xl bg-white rounded-full"/>
                          </div>
                          <div className="announcementProfileDisConDB gap-0.1">
                            <h3 className="announcementProfileNameDB text-sm m-0 p-0">{nameToString(announcement.author_first_name, announcement.author_last_name)}</h3>
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
                  ))
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

export default StudentDashboard;
