import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "../Dashboard.css";
import { fetchStudentClasses } from "../../../redux/class";
import { useNavigate } from "react-router-dom";
import { nameToString } from "../../../utils/TypeConvertion";
import { calcFinalGradeStudent, calcLetterGrade } from "../../../utils/Grading";

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
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

  const announcements = [
    {
      
      date: '10/4/2025',
      authorFirstName: 'Harry',
      authorLastName: 'Potter',
      authorType: 'Teacher',
      title: 'Announcement 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/150',
    },
    {
      date: '10/5/2025',
      authorFirstName: 'Hermione',
      authorLastName: 'Granger',
      authorType: 'Teacher',
      title: 'Announcement 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      date: '10/6/2025',
      authorFirstName: 'Ron',
      authorLastName: 'Weasley',
      authorType: 'Teacher',
      title: 'Announcement 3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/150',
    },
  ]

  const handleGrades = (classId) => {
    navigate(`/grades/${classId}`)
  }

  useEffect(() => {
    dispatch(fetchStudentClasses({studentId: user.student.id})).then(() => setIsLoaded(true));
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
            {/* <div id="behaviorConDB" className="whiteBox w-full"> */}
            {/* <div id="appsConDB" className="whiteBox w-full">
              <h2 id="appsTitleDB" className="text-xl text-center font-bold bg-blue-500 text-white p-2 rounded-t-lg">Appointments</h2>
              <div id="appsListDB" className="flex flex-col justify-flex-start items-flex-start">
                {appointments.map((appointment, index) => (
                  <div className=" appsItemDB flex justify-between items-center gap-2 px-2 py-1.5 hover:bg-gray-100 transition-colors duration-300 cursor-pointer" key={`appsItemT${index}`}>
                    <div className="appsPicConDB shrink-0 grow-0">
                      <FiUser className="appsPicDB text-2xl bg-white rounded-full"/>
                    </div>
                      <h3 className="appsDateDB text-sm font-bold shrink grow">{appointment.date}</h3>
                      <h3 className="appsTimeDB text-sm shrink grow">{appointment.time}</h3>
                      <h4 className="appsNameDB text-sm shrink grow">{nameToString(appointment.firstName, appointment.lastName)}</h4>
                  </div>
                ))}
              </div>
            </div> */}
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
                {announcements.map((announcement, index) => (
                  <div className={`announcementItemDB flex flex-col justify-flex-start items-flex-start gap-1 ${index > 0 ? 'border-t border-gray-300 pb-2 pt-2' : ''}`} key={`announcementItemT${index}`}>
                    <div className="announcementProfileConDB flex justify-between items-center">
                      <div className="announcementProfileInfoConDB flex justify-flex-start items-center gap-2">
                        <div className="announcementProfilePicConDB">
                          <FiUser className="announcementProfilePicDB text-2xl bg-white rounded-full"/>
                        </div>
                        <div className="announcementProfileDisConDB gap-0.1">
                          <h3 className="announcementProfileNameDB text-sm m-0 p-0">{nameToString(announcement.authorFirstName, announcement.authorLastName)}</h3>
                          <h4 className="announcementProfilePositionDB text-xs m-0 p-0 text-zinc-500">{announcement.authorType}</h4>
                        </div>
                      </div>
                      <div className="announcementProfileOptionsConDB">
                        <h4 className="announcementProfileOptionsDB text-sm m-0 p-0 text-zinc-500">{announcement.date}</h4>
                      </div>
                    </div>
                    <div id="announcementContentConDB" className="flex flex-col justify-flex-start items-flex-start gap-1">
                      <h3 id="announcementContentTitleDB">{announcement.title}</h3>
                      <p id="announcementContentTextDB">{announcement.content}</p>
                      {announcement.image && (
                        <div id="announcementContentPicConDB">
                          <img id="announcementContentPicDB" src={announcement.image} alt="Announcement 1 picture" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
