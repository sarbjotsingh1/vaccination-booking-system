import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const VaccinationApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/vaccination-applications");
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error retrieving vaccination applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Vaccination Applications</h2>
      {applications.length === 0 ? (
        <p>No vaccination applications found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((application) => (
            <div className="bg-white rounded shadow p-4" key={application._id}>
              <h3 className="text-lg font-bold mb-2">
                Center Name: {application.centerName}
              </h3>
              <p className="mb-2">Date: {application.date}</p>
              <p className="mb-2">Slots: {application.slots.join(", ")}</p>
              <p className="mb-2">Count: {application.count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VaccinationApplications;
