import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaCode, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-3 flex items-center">
          <FaHome className="mr-2" />
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-3 flex items-center">
          <FaChartBar className="mr-2" />
          <Link to="/leaderboard" className="hover:text-gray-300">Leaderboard</Link>
        </li>
        <li className="mb-3 flex items-center">
          <FaCode className="mr-2" />
          <Link to="/problems" className="hover:text-gray-300">Problems</Link>
        </li>
        <li className="flex items-center">
          <FaCog className="mr-2" />
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
