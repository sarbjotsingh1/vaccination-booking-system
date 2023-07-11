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
    <div>
      <h2>Vaccination Applications</h2>
      {applications.length === 0 ? (
        <p>No vaccination applications found.</p>
      ) : (
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              <p>Center: {application.center}</p>
              <p>Date: {application.date}</p>
              <p>Slots: {application.slots.join(", ")}</p>
              <p>Count: {application.count}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VaccinationApplications;
