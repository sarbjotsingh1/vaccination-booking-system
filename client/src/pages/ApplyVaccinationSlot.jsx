import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const ApplyVaccinationSlot = () => {
  const { centerId } = useParams();
  const [vaccinationCenter, setVaccinationCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccinationCenter = async () => {
      try {
        const response = await api.get(`/vaccination-centers/${centerId}`);
        setVaccinationCenter(response.data.vaccinationCenter);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vaccination center:", error);
        setLoading(false);
      }
    };

    fetchVaccinationCenter();
  }, [centerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Apply for Vaccination Slot</h2>
      {vaccinationCenter ? (
        <p>
          Vaccination Center: {vaccinationCenter.name} (ID: {centerId})
        </p>
      ) : (
        <p>Vaccination Center not found</p>
      )}
      {/* Additional form elements for selecting date and time */}
      {/* Apply button */}
    </div>
  );
};

export default ApplyVaccinationSlot;
