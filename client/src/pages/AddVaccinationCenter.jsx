import { useState } from "react";
import axios from "axios";
import { AdminNavBar } from "../componets/AdminNavBar";

const AddVaccinationCenter = () => {
  const [formData, setFormData] = useState({
    ID: "",
    name: "",
    address: "",
    city: "",
    workingHours: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/vaccination-center/add", formData);
      console.log(response.data); // Optionally, you can handle the success message or redirect the user to another page
      // Reset the form fields
      setFormData({
        ID: "",
        name: "",
        address: "",
        city: "",
        workingHours: "",
      });
    } catch (error) {
      console.error("Error adding vaccination center:", error);
      // Handle the error message or show an error notification
    }
  };

  return (
    <div
      className="flex
    "
    >
      <AdminNavBar></AdminNavBar>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add Vaccination Center</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ID" className="block font-bold mb-2">
              ID:
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-bold mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="workingHours" className="block font-bold mb-2">
              Working Hours:
            </label>
            <input
              type="text"
              id="workingHours"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Vaccination Center
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVaccinationCenter;
