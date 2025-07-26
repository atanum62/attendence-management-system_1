import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const LeaveRequestForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("CASUAL"); // default value
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [applicationText, setApplicationText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        employee_id: employeeId,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        application_text: applicationText,
      };

      const response = await axios.post(
        "http://localhost:8000/api/leaves/",
        payload
      );
      console.log("Success:", response.data);
      setMessage("Leave application submitted successfully!");

      // Clear form
      setEmployeeId("");
      setLeaveType("CASUAL");
      setStartDate("");
      setEndDate("");
      setApplicationText("");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage("Failed to submit leave application.");
    }
  };

  return (
    <>
      <div
        className="card shadow p-5"
        style={{ maxWidth: "440px", width: "100%", minHeight: "300px" }}
      >
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3">Leave Request Form</h4>

          {message && <div className="alert alert-info">{message}</div>}

          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="number"
              className="form-control"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Leave Type</label>
            <select
              className="form-select"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="casual">CASUAL</option>
              <option value="sick">SICK</option>
              <option value="earned">EARNED</option>
              <option value="maternity">MATERNITY</option>
              <option value="paternity">PATERNITY</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Reason / Application Text</label>
            <textarea
              className="form-control"
              rows={3}
              value={applicationText}
              onChange={(e) => setApplicationText(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">
            Submit Application
          </button>

          <NavLink
            to="/"
            className="btn btn-outline-secondary w-100 mt-2"
            style={{ textDecoration: "none" }}
          >
            Back to HomePage
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default LeaveRequestForm;
