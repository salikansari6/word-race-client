import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./UserStats.css";
import { Preloader } from "react-preloader-tmnt";

const UserStats = ({ isAuth }) => {
  const [userStats, setUserStats] = useState();
  const [zeroGames, setZeroGames] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch(`https://word-race-backend.herokuapp.com/api/stats/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserStats(data);
          setLoading(false);
        });
    } else {
      fetch(
        `https://word-race-backend.herokuapp.com/api/stats/${localStorage.getItem(
          "userId"
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.noOfGamesPlayed === 0) {
            setZeroGames(true);
            setLoading(false);
          } else {
            setUserStats(data);
            setLoading(false);
          }
        });
    }
  }, [id, zeroGames]);

  useEffect(() => {
    if (!isAuth && !id) {
      history.push("/");
    }
  }, [isAuth, id, history]);

  if (zeroGames) {
    return (
      <div
        className="container"
        style={{ fontSize: "2.5em", height: "70vh", fontWeight: "bold" }}
      >
        No games played yet
      </div>
    );
  }

  return (
    <div className="user-stats">
      {id && userStats && <h1>{userStats.name}'s stats</h1>}
      {!id && userStats && <h1>Your stats</h1>}
      <div className="user-stats__body">
        <Preloader loading={loading} />
        {userStats && (
          <>
            <p>Average Score : {userStats.averageScore.toFixed(2)}</p>
            <p>Max Level Reached: {userStats.maxLevel}</p>
            <p>Total No. of Games Played : {userStats.noOfGamesPlayed}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserStats;
