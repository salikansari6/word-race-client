import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./GameOver.css";

const GameOver = ({
  setLevel,
  setMultiplier,
  setScore,
  setShowGameOver,
  setWordStack,
  score,
  isAuth,
  level,
  setSpeed,
}) => {
  const [loading, setLoading] = useState(false);
  const saveButton = useRef(null);
  const history = useHistory();
  const restartGame = () => {
    setScore(0);
    setMultiplier(1);
    setShowGameOver(false);
    setLevel(1);
    setSpeed(3000);
    setWordStack([]);
  };

  const saveScore = () => {
    setLoading(true);
    fetch("https://word-race-2si3.onrender.com/api/stats", {
      method: "POST",
      body: JSON.stringify({
        score,
        level,
      }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        saveButton.current.disabled = true;
      });
  };

  return (
    <div className="game-over">
      <div className="game-over__body">
        {loading ? "Saving Score...." : null}
        <div className="header">Game Over !</div>
        <div className="game-over__body__score">
          <span>Your score is : </span>
          <span>{score}</span>
        </div>
        <div className="buttons">
          <button className="play-again" onClick={restartGame}>
            Play Again
          </button>
          <button className="exit" onClick={() => history.push("/")}>
            Exit
          </button>
          {isAuth && (
            <button className="save-score" ref={saveButton} onClick={saveScore}>
              Save Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOver;
