import React, { useEffect, useState } from "react";
import axios from "axios";

const EmplooyeLeaveDetails = () => {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/leaves/")
      .then((response) => {
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          setLeaveData(response.data);
        } else if (Array.isArray(response.data.results)) {
          setLeaveData(response.data.results); // In case of paginated result
        } else {
          setLeaveData([]); // fallback to empty array
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leave Details</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-white text-black">
          <thead>
            <tr className="bg-gray-800 text-sm uppercase text-left">
              <th className="py-3 px-4">Employee</th>
              <th className="py-3 px-4">Leave Type</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">End Date</th>
              <th className="py-3 px-4">Applied On</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave) => (
              <tr
                key={leave.id}
                className="border-t border-gray-600 hover:bg-gray-900 transition-all"
              >
                <td className="py-2 px-4 text-blue-400 font-medium">
                  {leave.employee.name} ({leave.employee.unique_id})
                </td>
                <td className="py-2 px-4">
                  {leave.leave_type.replace("_", " ")}
                </td>
                <td className="py-2 px-4">
                  {new Date(leave.start_date).toDateString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(leave.end_date).toDateString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(leave.applied_on).toLocaleString()}
                </td>
                <td className="py-2 px-4 font-semibold text-green-400">
                  {leave.status || "Pending"}
                </td>
              </tr>
            ))}
            {leaveData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No leave applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmplooyeLeaveDetails;
