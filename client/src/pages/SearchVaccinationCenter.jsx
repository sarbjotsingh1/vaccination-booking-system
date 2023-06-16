import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const SearchVaccinationCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {vaccinationCenters.map((center) => (
            <div key={center._id}>
              <h3>{center.name}</h3>
              <p>{center.address}</p>
              <p>{center.city}</p>
              <p>{center.workingHours}</p>
              <button onClick={() => handleSelectCenter(center)}>
                Select Center
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedCenter && (
        <div>
          <h4>Selected Center: {selectedCenter.name}</h4>
          {/* Render the available slots for the selected center */}
          {selectedCenter.slots.map((slot) => (
            <div key={slot._id}>
              <p>Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
              <button onClick={() => handleSelectSlot(slot)}>
                Select Slot
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedSlot && (
        <div>
          <h4>Selected Slot:</h4>
          <p>Date: {selectedSlot.date}</p>
          <p>Time: {selectedSlot.time}</p>
          {/* Include your logic here for applying for the selected slot */}
          <button>Apply for Slot</button>
        </div>
      )}
    </div>
  );
};

export default SearchVaccinationCenter;
