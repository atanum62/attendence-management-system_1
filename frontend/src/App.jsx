import React from "react";
import CheckInOut from "./components/CheckInOut";
import CalendarComponent from "./components/Calender";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center align-items-start g-4">
        {/* Check-In/Out Form */}
        <div className="col-12 col-md-6">
          <div className="h-100 d-flex flex-column justify-content-center">
            <CheckInOut />
          </div>
        </div>

        {/* Calendar Component */}
        <div className="col-12 col-md-6">
          <div className="h-100 d-flex flex-column justify-content-center">
            <CalendarComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
