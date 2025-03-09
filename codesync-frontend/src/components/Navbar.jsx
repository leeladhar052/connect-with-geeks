import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">CodeSync</h1>
      <div>
        <Link to="/settings" className="text-gray-700 hover:text-black px-4">
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
