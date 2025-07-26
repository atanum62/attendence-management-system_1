import React from "react";
import LeaveRequestFrom from "../components/LeaveRequestFrom";
import EmplooyeLeaveDetails from "../components/EmplooyeLeaveDetails";

const LeaveRequest = () => {
  return (
    <>
      <div className="container py-4">
        <div className="row justify-content-center align-items-start g-4">
          {/* Check-In/Out Form */}
          <div className="col-12 col-md-4">
            <div className="h-100 d-flex flex-column justify-content-center">
              <LeaveRequestFrom />
            </div>
          </div>

          {/* Calendar Component */}
          <div className="col-12 col-md-8">
            <div className="h-100 d-flex flex-column justify-content-center">
              <EmplooyeLeaveDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequest;
