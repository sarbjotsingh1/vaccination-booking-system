import { useEffect, useState } from "react";
import axios from "axios";
import { AdminNavBar } from "../componets/AdminNavBar";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const VaccinationCenter = () => {
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccinationCenters = async () => {
      try {
        const response = await api.get("/vaccination-center");
        setVaccinationCenters(response.data.vaccinationCenters);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vaccination centers:", error);
        setLoading(false);
      }
    };

    fetchVaccinationCenters();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/vaccination-center/remove/${id}`);
      setVaccinationCenters((prevCenters) =>
        prevCenters.filter((center) => center.ID !== id)
      );
    } catch (error) {
      console.error("Error removing vaccination center:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <AdminNavBar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Vaccination Centers</h2>
        <div className="flex justify-between mb-4">
          <Link
            to="/admin-dashboard/vaccination-center/add"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Vaccination Center
          </Link>
        </div>
        <ul className="space-y-4">
          {vaccinationCenters.map((center) => (
            <li key={center._id} className="border p-4 rounded">
              <p className="text-xl font-bold">Name: {center.name}</p>
              <p className="text-gray-700">Address: {center.address}</p>
              <p className="text-gray-700">City: {center.city}</p>
              <p className="text-gray-700">
                Working Hours: {center.workingHours}
              </p>
              <button
                onClick={() => handleRemove(center.ID)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VaccinationCenter;
