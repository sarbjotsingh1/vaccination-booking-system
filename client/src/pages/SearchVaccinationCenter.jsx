import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const SearchVaccinationCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState(""); // New state for the name input
  const [loading, setLoading] = useState(false);
  const [slotsBooked, setSlotsBooked] = useState(0);

  useEffect(() => {
    fetchVaccinationCenters();
  }, []);

  const fetchVaccinationCenters = async () => {
    setLoading(true);
    try {
      const response = await api.get("/vaccination-center");
      setVaccinationCenters(response.data.vaccinationCenters);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vaccination centers:", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get("/vaccination-center/search", {
        params: {
          searchQuery,
        },
      });
      setVaccinationCenters(response.data.vaccinationCenters);
      setLoading(false);
    } catch (error) {
      console.error("Error searching vaccination centers:", error);
      setLoading(false);
    }
  };

  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    if (selectedCenter) {
      fetchSlotsBooked(selectedCenter._id, date);
    }
  };

  const fetchSlotsBooked = async (centerId, date) => {
    try {
      const response = await api.get("/slots-booked", {
        params: {
          centerId,
          date,
        },
      });
      setSlotsBooked(response.data.slotsBooked);
    } catch (error) {
      console.error("Error retrieving slots booked:", error);
      setSlotsBooked(0);
    }
  };

  const handleApply = async () => {
    if (
      selectedCenter &&
      selectedDate &&
      slotsBooked < selectedCenter.maxCandidatesPerDay &&
      name // Check if name is provided
    ) {
      setLoading(true);
      try {
        const response = await api.post("/vaccination-center/apply", {
          centerId: selectedCenter._id,
          date: selectedDate,
          name: name, // Pass the name value to the API endpoint
        });
        toast.success("Application submitted successfully!");
        setLoading(false);
      } catch (error) {
        console.error("Error applying for vaccination slot:", error);
        setLoading(false);
      }
    }
  };

  const renderDatePicker = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleSelectDate}
        minDate={today}
        maxDate={nextWeek}
        placeholderText="Select a date"
        className="flex-grow px-4 py-2 mr-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  };

  return (
    <>
      <div className="max-w-md p-4 flex gap-4">
        <div className="flex mb-4">
          <Link to="/user-dashboard">
            <h1 className="text-3xl font-bold text-blue-700 cursor-pointer">
              VacciBook
            </h1>
          </Link>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or city"
            className="flex-grow px-4 py-2 mr-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Search
          </button>
        </div>

        {selectedCenter && (
          <div className="mb-4 p-4 bg-gray-100 rounded">
            <h4 className="text-lg font-bold mb-2">
              Selected Center: {selectedCenter.name}
            </h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name" // Added name input field
              className="flex-grow px-4 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderDatePicker()}
            <p>
              Slots Booked: {slotsBooked}/{selectedCenter.maxCandidatesPerDay}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              disabled={
                !selectedDate ||
                slotsBooked >= selectedCenter.maxCandidatesPerDay ||
                !name // Disable button if name is not provided
              }
              onClick={handleApply}
            >
              Select Date
            </button>
          </div>
        )}
        <Link
          to="/"
          className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-700 transition-colors duration-300 ease-in-out"
        >
          Logout
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid w-screen md:grid-cols-3 gap-4">
          {vaccinationCenters.slice(0, 6).map((center) => (
            <div key={center._id} className="p-4 bg-gray-100 rounded">
              <h3 className="text-xl font-bold mb-2">{center.name}</h3>
              <p className="text-gray-700">{center.address}</p>
              <p className="text-gray-700">{center.city}</p>
              <p className="text-gray-700">{center.workingHours}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                onClick={() => handleSelectCenter(center)}
              >
                Select Center
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SearchVaccinationCenter;
