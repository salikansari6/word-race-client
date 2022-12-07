import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineProgress } from "react-preloader-tmnt";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://word-race-2si3.onrender.com/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table className="leaderboard__table">
        <thead>
          <tr>
            <th>Sr. no</th>
            <th>User</th>
            <th>Score</th>
            <th>Max Level</th>
          </tr>
        </thead>
        <tbody>
          {stats?.map((stat, index) => {
            return (
              <tr key={stat._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/user-stats/${stat.user._id}`}>
                    {stat.user.name}
                  </Link>
                </td>
                <td>{stat.score}</td>
                <td>{stat.level}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <LineProgress loading={loading} color="blue" />
    </div>
  );
};

export default Leaderboard;
