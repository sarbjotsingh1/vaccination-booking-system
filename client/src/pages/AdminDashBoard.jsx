import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const AdminDashboard = () => {
  const [cookies, removeCookie] = useCookies(["token"]);

  const handleLogout = async () => {
    try {
      // Send a request to the backend API to perform logout
      await api.post("/auth/logout", null, { withCredentials: true });
      removeCookie("token");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome to Admin Dashboard
          </h1>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Link to="/admin/vaccination-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md">
              Vaccination Centers
            </button>
          </Link>
          <Link to="/admin/vaccination-applications">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md">
              Vaccination Applications
            </button>
          </Link>
          <Link
            to="/"
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
