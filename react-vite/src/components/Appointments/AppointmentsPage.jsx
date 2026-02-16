import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateAppointmentModal from "./CreateAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import { fetchAppointments } from "../../redux/appointment";
import { nameToString } from "../../utils/TypeConvertion";
import "./Appointments.css";

export default function AppointmentsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const appointments = useSelector((state) => state.appointment.appointments) || [];
  const [isLoaded, setIsLoaded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`;
  };

  useEffect(() => {
    dispatch(fetchAppointments()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div id="appointmentsCon" className="flex flex-col justify-start items-center gap-4 py-5">
          <div id="appointmentsHeaderCon" className="whiteBox w-[70%] p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Appointments</h1>
              <OpenModalButton
                buttonText={
                  <div className="flex items-center gap-2">
                    <FiPlus className="text-xl" />
                    <span>Schedule Appointment</span>
                  </div>
                }
                modalComponent={<CreateAppointmentModal />}
                cssClasses={'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2'}
              />
            </div>
          </div>

          <div id="appointmentsListCon" className="whiteBox w-[70%] p-4">
            {appointments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg">No appointments scheduled</p>
                <p className="text-sm mt-2">Click &quot;Schedule Appointment&quot; to create one</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="appointmentItemCon border border-gray-300 rounded p-4 hover:bg-blue-50 transition-colors duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="appointmentDateCon">
                            <h3 className="text-xl font-bold text-blue-600">
                              {formatDate(appointment.appointment_date)}
                            </h3>
                            <p className="text-lg text-gray-700">
                              {formatTime(appointment.appointment_time)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="appointmentParticipantsCon mt-3">
                          {user?.type === 'teacher' ? (
                            <div>
                              <p className="text-sm text-gray-500">Student:</p>
                              <p className="text-base font-semibold">
                                {nameToString(appointment.student_first_name, appointment.student_last_name)}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-gray-500">Teacher:</p>
                              <p className="text-base font-semibold">
                                {nameToString(appointment.teacher_first_name, appointment.teacher_last_name)}
                              </p>
                            </div>
                          )}
                        </div>

                        {appointment.notes && (
                          <div className="appointmentNotesCon mt-3">
                            <p className="text-sm text-gray-500">Notes:</p>
                            <p className="text-base text-gray-700">{appointment.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="appointmentActionsCon flex items-center gap-2">
                        <OpenModalButton
                          buttonText={<MdEdit className="text-xl" />}
                          modalComponent={<EditAppointmentModal appointment={appointment} />}
                          cssClasses={'text-blue-500 hover:text-blue-700 p-2 rounded hover:bg-blue-100 transition-colors duration-300'}
                        />
                        <OpenModalButton
                          buttonText={<MdDelete className="text-xl" />}
                          modalComponent={<DeleteAppointmentModal appointment={appointment} />}
                          cssClasses={'text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-100 transition-colors duration-300'}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
