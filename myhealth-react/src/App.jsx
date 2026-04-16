import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home            from "./pages/Home";
import Doctors         from "./pages/Doctors";
import DoctorProfile   from "./pages/DoctorProfile";
import BookAppointment from "./pages/BookAppointment";
import Labtests        from "./pages/Labtests";
import Login           from "./pages/Login";
import Register        from "./pages/Register";
import Dashboard       from "./pages/Dashboard";
import ConnectionTest  from "./pages/ConnectionTest"; // 1. Added this

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/doctors"            element={<Doctors />} />
        <Route path="/doctors/:id"        element={<DoctorProfile />} />
        <Route path="/book/:doctorId"      element={<BookAppointment />} />
        <Route path="/lab-tests"           element={<Labtests />} />
        <Route path="/login"               element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/dashboard"           element={<Dashboard />} />
        <Route path="/test"                element={<ConnectionTest />} /> {/* 2. Added this */}
      </Routes>
    </BrowserRouter>
  );
}