import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppointmentContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [appointment, setAppointment] = useState([]);

  const addAppointment = async (newAppointment) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/add-user",
        newAppointment
      );
      setAppointment([...appointment, response.data]);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const getAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");

      console.log("Response => ", response);
      setAppointment(response.data[0]);
    } catch (error) {
      console.error("Error getting appointments:", error);
    }
  };
  console.log("appointment=> ", appointment);

  const editAppointment = async (id, updatedAppointment) => {
    console.log(
      "ID and updated appointment in editapp ",
      id,
      updatedAppointment
    );
    try {
      await axios.patch(
        `http://localhost:3000/users/${id}`,
        updatedAppointment
      );
      const updatedAppointments = appointment.map((item) =>
        item.id === id ? updatedAppointment : item
      );
      setAppointment(updatedAppointments);
      // setAppointment(JSON.stringify(updatedAppointments));
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete-user/${id}`);
      const updatedAppointments = appointment.filter((item) => item.id !== id);
      setAppointment(updatedAppointments);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        setAppointment,
        addAppointment,
        getAppointments,
        editAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
