import { FaListAlt } from "react-icons/fa";

const ProblemTracking = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaListAlt className="mr-2 text-green-500" /> Problem Tracking
      </h2>
      <p className="text-gray-700">View and manage your solved and pending problems.</p>
    </div>
  );
};

export default ProblemTracking;
