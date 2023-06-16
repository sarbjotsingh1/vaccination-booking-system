import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddVaccinationCenter from "./pages/AddVaccinationCenter";
import VaccinationCenter from "./pages/VaccinationCenter";
import SearchVaccinationCenter from "./pages/SearchVaccinationCenter";
import ApplyVaccinationSlot from "./pages/ApplyVaccinationSlot";
import ErrorBoundary from "./errorBoundary";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/add-vaccination-center"
              element={<AddVaccinationCenter />}
            />
            <Route
              path="/vaccination-centers"
              element={<VaccinationCenter />}
            />
            <Route
              path="/search-vaccination-center"
              element={
                <ErrorBoundary>
                  <SearchVaccinationCenter />
                </ErrorBoundary>
              }
            />
            <Route
              path="/apply-vaccination-slot"
              element={<ApplyVaccinationSlot />}
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
