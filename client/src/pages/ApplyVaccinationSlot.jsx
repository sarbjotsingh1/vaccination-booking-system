import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const ApplyVaccinationSlot = () => {
  const [centerId, setCenterId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    try {
      setLoading(true);
      const response = await api.post("/vaccination-center/apply", {
        centerId,
        slotId,
      });
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error applying for vaccination slot:", error);
      setMessage("Error applying for vaccination slot");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Apply for Vaccination Slot</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Vaccination Center ID"
          value={centerId}
          onChange={(e) => setCenterId(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="Slot ID"
          value={slotId}
          onChange={(e) => setSlotId(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleApply}
          disabled={!centerId || !slotId || loading}
        >
          Apply
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyVaccinationSlot;
