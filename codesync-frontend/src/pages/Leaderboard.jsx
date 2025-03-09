import { useState, useEffect } from "react";
import axios from "axios";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get("https://codeforces.com/api/user.ratedList?activeOnly=true")
      .then((res) => setLeaderboardData(res.data.result.slice(0, 10)))
      .catch((err) => console.error("Error fetching leaderboard", err));
  }, []);

  return (
    <div className="p-6">
      <LeaderboardTable data={leaderboardData} />
    </div>
  );
};

export default Leaderboard;
