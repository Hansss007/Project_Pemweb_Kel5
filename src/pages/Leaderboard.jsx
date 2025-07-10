import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [filteredGame, setFilteredGame] = useState("all");
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost/leaderboard-api/read.php")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const uniqueGames = [...new Set(data.map(item => item.game))];
        setGames(uniqueGames);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
      });
  }, []);

  const filteredData = filteredGame === "all"
    ? data
    : data.filter((item) => item.game === filteredGame);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🏆 Leaderboard</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2">Filter by Game:</label>
        <select
          className="bg-gray-800 text-white border border-gray-600 px-3 py-1 rounded"
          value={filteredGame}
          onChange={(e) => setFilteredGame(e.target.value)}
        >
          <option value="all">All</option>
          {games.map((game, idx) => (
            <option key={idx} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* List Leaderboard */}
      <ol className="list-decimal pl-6 space-y-1 text-lg">
        {filteredData.map((item, index) => (
          <li key={item.id}>
            {item.nama} - {item.skor}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
