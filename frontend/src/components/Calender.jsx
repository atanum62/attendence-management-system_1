import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Required for Calendar styling
import "bootstrap/dist/css/bootstrap.min.css";

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Attendance Calendar</h3>
        <Calendar
          onChange={setValue}
          value={value}
          className="w-100 border-0"
          tileClassName="text-center"
        />
        <p className="mt-3 text-center">
          <strong>Selected Date:</strong> {value.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default CalendarComponent;
