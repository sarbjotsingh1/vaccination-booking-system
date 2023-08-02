import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const SearchVaccinationCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    fetchVaccinationCenters();
  }, []);

  const fetchVaccinationCenters = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        "/vaccination-center"
        // , {
        //   // headers: {
        //   //   Authorization: `Bearer ${cookies.token}`,
        //   // },
        // }
      );
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
  };

  const handleApply = async () => {
    if (selectedCenter && selectedDate && name) {
      setLoading(true);
      try {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = selectedDate.toLocaleDateString("en-US", options);
        console.log(formattedDate);
        const response = await api.post(
          "/vaccination-applications/apply",
          {
            centerId: selectedCenter._id,
            centerName: selectedCenter.name,
            date: formattedDate,
            name: name,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${cookies.token}`,
          //   },
          // }
        );

        if (response.status === 201) {
          toast.success("Application submitted successfully!");
        } else {
          toast.error("Slots are full!");
        }

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
      <div className="max-w-full p-4 gap-4">
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
              placeholder="Enter your name"
              className="flex-grow px-4 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderDatePicker()}
            <button
              onClick={handleApply}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {vaccinationCenters.length === 0 ? (
              <p>No vaccination centers found.</p>
            ) : (
              <>
                {vaccinationCenters.map((center) => (
                  <div
                    key={center._id}
                    className="p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectCenter(center)}
                  >
                    <h3 className="text-lg font-bold mb-2">{center.name}</h3>
                    <p>
                      <strong>Address: </strong>
                      {center.address}, {center.city}
                    </p>
                    <p>
                      <strong>Working Hours: </strong>
                      {center.workingHours}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default SearchVaccinationCenter;
