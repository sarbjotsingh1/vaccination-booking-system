import { Link } from "react-router-dom";

const AdminDashboard = () => {
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
          <Link to="/admin/vaccination-slots">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md">
              Vaccination Slots
            </button>
          </Link>
          <Link to="/">
            <button className="bg-red-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
