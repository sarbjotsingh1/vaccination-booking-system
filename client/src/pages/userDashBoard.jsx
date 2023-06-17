import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const UserDashboard = () => {
  const handleLogout = async () => {
    try {
      // Send a request to the backend API to perform logout
      await api.post("/auth/logout", null, { withCredentials: true });

      // Redirect the user to the login page or homepage
      // You can use the useHistory hook from react-router-dom
      // to navigate to a specific route after logout
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error if logout fails
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl text-blue-700 font-bold mb-4">
        Welcome to VacciBook
      </h1>
      <p className="text-lg mb-8">
        Want to book a vaccine? Find the nearest vaccination center:
      </p>
      <Link
        to="/search-vaccination-center"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
      >
        Vaccination Centers
      </Link>
      <Link
        to="/"
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition-colors duration-300 ease-in-out"
      >
        Logout
      </Link>
    </div>
  );
};

export default UserDashboard;
