import React, { useContext, useEffect, useState } from "react";
import AppointmentContext from "../Context/mainContext";
import BookingAppForm from "./form.takingInput";

function ShowingOutput() {
  const { appointment, deleteAppointment, getAppointments } =
    useContext(AppointmentContext);
  const [edit, setEdit] = useState(false);

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log("Editing appointment with ID:", id);
    setEdit(id); // Set the edit state to the ID of the appointment being edited
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log("id for delete", id);
    deleteAppointment(id);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      {edit !== false && <BookingAppForm value={edit} />} {/* Render the BookingAppForm component only if editing is enabled */}
      <ul>
        {appointment.map((appt) => (
          <li key={appt.id}>
            <span>{`${appt.username} - ${appt.email} - ${appt.phonenumber}`}</span>
            <button onClick={() => handleEdit(appt.id)}>Edit</button>
            <button onClick={() => handleDelete(appt.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShowingOutput;
