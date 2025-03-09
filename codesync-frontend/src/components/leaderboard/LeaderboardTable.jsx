const LeaderboardTable = ({ data }) => {
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Rank</th>
            <th className="border p-2">Handle</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.handle}</td>
              <td className="border p-2">{user.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default LeaderboardTable;
  