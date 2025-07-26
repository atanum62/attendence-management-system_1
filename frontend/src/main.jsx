import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LeaveRequest from "./pages/LeaveRequest.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/leave_application" element={<LeaveRequest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
