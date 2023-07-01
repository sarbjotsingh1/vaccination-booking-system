const UserNavBar = () => {
  return (
    <>
      <nav className="bg-gray-900 text-white w-1/4 h-screen">
        <ul className="py-6 flex flex-col gap-24 pt-40">
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/user-dashboard">Dashboard</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/user-dashboard/vaccination-center">Vaccination Center</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/admin-dashboard/vaccination-slots">Vaccination Slots</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserNavBar;
