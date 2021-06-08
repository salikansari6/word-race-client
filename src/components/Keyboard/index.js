import React, { useState, useEffect } from "react";
import "./Keyboard.css";
import { sound } from "../../assets/sounds";

const Keyboard = ({ input, setInput, showGameOver }) => {
  const [activeKey, setActiveKey] = useState("");
  const inputRef = React.useRef();
  const [showKeyboard, setShowKeyboard] = useState(false);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.type = "text";
  }, [input]);

  useEffect(() => {
    if (screenWidth > 800) {
      setShowKeyboard(true);
    }
  }, [screenWidth]);

  const handleChange = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
    setInput(e.target.value);
  };

  const handleKeyUp = (e) => {
    setActiveKey("");
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
    setActiveKey(e.key);
    sound.play();
  };

  return (
    <div className="keyboard">
      <input
        type="password"
        value={input}
        autoCapitalize="none"
        className="keyboard-input"
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        onChange={handleChange}
        placeholder="Type here..."
        disabled={showGameOver}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      {showKeyboard && (
        <div className="keyboard-wrapper">
          <div className="first-row">
            {"qwertyuiop".split("").map((letter, index) => {
              return (
                <div
                  className="key"
                  key={letter}
                  style={{
                    backgroundColor: activeKey === letter ? "#fed34e" : null,
                    transform: activeKey === letter ? "scale(1.2)" : null,
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
          <div className="second-row">
            {"asdfghjkl".split("").map((letter, index) => {
              return (
                <div
                  className="key"
                  key={letter}
                  style={{
                    backgroundColor: activeKey === letter ? "#fed34e" : null,
                    transform: activeKey === letter ? "scale(1.2)" : null,
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
          <div className="third-row">
            {"zxcvbnm".split("").map((letter, index) => {
              return (
                <div
                  className="key"
                  key={letter}
                  style={{
                    backgroundColor: activeKey === letter ? "#fed34e" : null,
                    transform: activeKey === letter ? "scale(1.2)" : null,
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Keyboard;
