import React, { useContext, useEffect, useState } from "react";
import AppointmentContext from "../Context/mainContext";

function BookingAppForm({ value }) {
  const { addAppointment, appointment ,editAppointment} = useContext(AppointmentContext); // Destructure addAppointment function and appointment state from context
  const [uName, setUname] = useState("");
  const [Pnumb, setPnumb] = useState("");
  const [Eml, setEml] = useState("");

  // useEffect to update input fields when value changes
  useEffect(() => {
    if (value) {
      const appointmentToEdit = appointment.find((appt) => appt.id === value);
      if (appointmentToEdit) {
        setUname(appointmentToEdit.username);
        setPnumb(appointmentToEdit.phonenumber);
        setEml(appointmentToEdit.email);
      }
    }
  }, [value]);

  const submitForm = () => {
    const newAppointment = {
      userName: uName,
      phoneNum: Pnumb,
      email: Eml,
    };
    console.log("New appointment is ", newAppointment);
    
    if (value) {
      // If editing an appointment, call editAppointment function
      if (uName && Pnumb && Eml) { // Ensure all fields are present
        editAppointment(value, newAppointment);
      } else {
        console.error("All fields (name, number, email) are required for updating.");
      }
    } else {
      // If adding a new appointment, call addAppointment function
      if (uName && Pnumb && Eml) { // Ensure all fields are present
        addAppointment(newAppointment);
      } else {
        console.error("All fields (name, number, email) are required.");
      }
    }
    // Reset input fields after submission
    setUname("");
    setPnumb("");
    setEml("");
  };

  function submitHandler(e) {
    e.preventDefault();
    submitForm();
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h2 style={{ fontFamily: "cursive" }}>BOOKING APPOINTMENT APP</h2>
        <span>UserName</span>
        <br />
        <input
          value={uName}
          onChange={(e) => setUname(e.target.value)}
          required
          type="text"
          name="username"
        />
        <br />
        <span>Phone Number</span>
        <br />
        <input
          value={Pnumb}
          onChange={(e) => setPnumb(e.target.value)}
          required
          type="number"
          name="phonenum"
        />
        <br />
        <span>Email</span>
        <br />
        <input
          value={Eml}
          onChange={(e) => setEml(e.target.value)}
          required
          type="email"
          name="email"
        />
        <br />

        <button type="submit">{value ? "Update" : "Submit"}</button>
      </form>
    </>
  );
}

export default BookingAppForm;
