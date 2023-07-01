import "../styles/tailwind.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 animate__animated animate__fadeIn">
          Welcome to VacciBook
        </h1>
        <p className="text-lg text-gray-600 mt-4 animate__animated animate__fadeInUp">
          Book your vaccination slots with ease and convenience
        </p>
      </div>
      <div className="mt-8 space-x-4">
        <Link to="/signup">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md animate__animated animate__bounce">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md animate__animated animate__bounce">
            User Login
          </button>
        </Link>
        <Link to="/admin-login">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md animate__animated animate__bounce">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
