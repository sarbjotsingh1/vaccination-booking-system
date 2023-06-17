export const AdminNavBar = () => {
  return (
    <>
      <nav className="bg-gray-900 text-white w-1/4 ">
        <ul className="py-6 flex flex-col gap-24 pt-40">
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/admin-dashboard">Dashboard</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/admin/vaccination-center">Vaccination Center</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/admin/vaccination-slots">Vaccination Slots</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
};
