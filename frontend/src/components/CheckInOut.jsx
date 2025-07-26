import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";

const CheckInOut = () => {
  const [uniqueId, setUniqueId] = useState(""); // Using unique_id instead of database ID
  const [action, setAction] = useState("time_in");
  const [clock, setClock] = useState(dayjs().format("hh:mm:ss A"));

  // ⏰ Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setClock(dayjs().format("hh:mm:ss A"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🧾 Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔍 Fetch employee based on unique_id
      const employeeRes = await axios.get(
        "http://localhost:8000/api/employees/"
      );
      const employee = employeeRes.data.find(
        (emp) => emp.unique_id === uniqueId
      );

      if (!employee) {
        alert("Employee not found");
        return;
      }

      // ✅ Submit attendance
      await axios.post("http://localhost:8000/api/attendance/", {
        employee_id: employee.id,
        action: action,
      });

      alert("✅ Attendance marked!");
      setUniqueId("");
    } catch (error) {
      console.error("❌ Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div
        className="card shadow p-5"
        style={{ maxWidth: "440px", width: "100%", minHeight: "300px" }}
      >
        <h4 className="text-center mb-3">
          {dayjs().format("dddd, MMMM D, YYYY")}
        </h4>
        <h5 className="text-center text-primary mb-4 fw-semibold">{clock}</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee Unique ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Unique ID (e.g., 852730)"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Action</label>
            <select
              className="form-select"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="time_in">Time In</option>
              <option value="time_out">Time Out</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">
            Submit Attendance
          </button>

          <NavLink
            to="/leave_application"
            className="btn btn-outline-primary w-100 mt-3 text-decoration-none"
          >
            Leave Request
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default CheckInOut;
