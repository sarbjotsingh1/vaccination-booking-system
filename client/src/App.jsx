import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddVaccinationCenter from "./pages/AddVaccinationCenter";
import VaccinationCenter from "./pages/VaccinationCenter";
import SearchVaccinationCenter from "./pages/SearchVaccinationCenter";
import ApplyVaccinationSlot from "./pages/ApplyVaccinationSlot";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-vaccination-center"
            element={<AddVaccinationCenter />}
          />
          <Route path="/vaccination-centers" element={<VaccinationCenter />} />
          <Route
            path="/search-vaccination-center"
            element={<SearchVaccinationCenter />}
          />
          <Route
            path="/apply-vaccination-slot/:centerId"
            element={<ApplyVaccinationSlot />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
