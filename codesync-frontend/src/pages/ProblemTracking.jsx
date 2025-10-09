import { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";

const ProblemTracking = () => {
  const [gfgData, setGfgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handle = "leeladhar710"; // Replace with dynamic value later

  useEffect(() => {
    const fetchGfgData = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(
            `https://geeks-for-geeks-api.vercel.app/${handle}`
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch GFG data");
        const data = await response.json();
        setGfgData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchGfgData();
  }, []);

  if (loading)
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
        Loading problem data...
      </div>
    );

  if (error)
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center text-red-500">
        {error}
      </div>
    );

  if (!gfgData) return null;

  const { solvedStats } = gfgData;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaListAlt className="mr-2 text-green-500" /> Problem Tracking
      </h2>

      <p className="text-gray-700 mb-4">
        Total Problems Solved:{" "}
        <span className="font-semibold">
          {gfgData.info?.totalProblemsSolved || 0}
        </span>
      </p>

      {/* Loop through each difficulty group */}
      {Object.entries(solvedStats).map(([difficulty, data]) => (
        <div key={difficulty} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 capitalize text-gray-800">
            {difficulty} ({data.count})
          </h3>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.questions.map((q, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-sm hover:shadow-lg transition-all p-4 bg-gray-50"
              >
                {/* Title */}
                <a
                  href={q.questionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {q.question}
                </a>

                {/* Metadata */}
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Difficulty: {difficulty} </span>
                    <span
                      className={`${
                        q.difficulty === "Easy"
                          ? "text-green-600"
                          : q.difficulty === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      } font-semibold`}
                    >
                      {q.difficulty}
                    </span>
                  </p>
                  {q.accuracy && (
                    <p>
                      <span className="font-medium">Accuracy:</span>{" "}
                      {q.accuracy}
                    </p>
                  )}
                  {q.submissions && (
                    <p>
                      <span className="font-medium">Submissions:</span>{" "}
                      {q.submissions}
                    </p>
                  )}
                  {q.topicTags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {q.topicTags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemTracking;
