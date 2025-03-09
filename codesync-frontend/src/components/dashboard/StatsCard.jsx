const StatsCard = ({ data }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold">Coding Stats</h2>
        <p>LeetCode Solved: {data.leetCodeData?.totalSolved || 0}</p>
        <p>Codeforces Rating: {data.codeforcesData?.rating || "N/A"}</p>
        <p>GFG Score: {data.gfgData?.score || "N/A"}</p>
      </div>
    );
  };
  
  export default StatsCard;
  