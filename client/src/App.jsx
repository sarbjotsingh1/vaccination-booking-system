import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddVaccinationCenter from "./pages/AddVaccinationCenter";
import VaccinationCenter from "./pages/VaccinationCenter";
import SearchVaccinationCenter from "./pages/SearchVaccinationCenter";
import VaccinationApplications from "./pages/VaccinationApplications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard";
import UserDashBoard from "./pages/userDashBoard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin-dashboard/vaccination-center/add"
            element={<AddVaccinationCenter />}
          />
          <Route
            path="/admin/vaccination-center"
            element={<VaccinationCenter />}
          />
          <Route
            path="/search-vaccination-center"
            element={<SearchVaccinationCenter />}
          />
          <Route
            path="/admin/vaccination-applications"
            element={<VaccinationApplications />}
          />

          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/user-dashboard" element={<UserDashBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
