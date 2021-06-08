import React from "react";
import "./WordStack.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import wordList from "../../wordList";
import { errorSound, correctSound, gameOverSound } from "../../assets/sounds";

const STACK_LENGTH = 5;

let loopingWordList = [...wordList];
const WordStack = ({
  input,
  setInput,
  setScore,
  setLevel,
  setMultiplier,
  multiplier,
  setShowGameOver,
  wordStack,
  setWordStack,
  speed,
  setSpeed,
  setWPM,
}) => {
  const t1 = React.useRef();
  const t2 = React.useRef();
  const [consecutiveCorrect, setConsecutiveCorrect] = React.useState(0);

  React.useEffect(() => {
    let addWordsInterval;
    if (loopingWordList.length === 0) {
      loopingWordList = [...wordList];
    }

    addWordsInterval = setInterval(() => {
      setWordStack((wordStack) => [loopingWordList.pop(), ...wordStack]);
    }, speed);

    if (wordStack.length === STACK_LENGTH) {
      clearInterval(addWordsInterval);
      gameOverSound.play();
      setShowGameOver(true);
    }
    return () => {
      clearInterval(addWordsInterval);
    };
  }, [wordStack, setShowGameOver, setWordStack, speed]);

  React.useEffect(() => {
    if (wordStack.length === 0) {
      setWordStack((wordStack) => [loopingWordList.pop()]);
    }
  }, [wordStack, setWordStack]);

  React.useEffect(() => {
    if (consecutiveCorrect !== 0 && consecutiveCorrect % 3 === 0) {
      setSpeed((prev) => {
        if (prev !== 1500) {
          return prev - 100;
        } else {
          return prev;
        }
      });
      setLevel((level) => level + 1);
    }
  }, [consecutiveCorrect, setLevel, setSpeed]);

  React.useEffect(() => {
    if (wordStack.length !== 0) {
      if (!wordStack.some((word) => word.startsWith(input))) {
        setMultiplier(1);
        errorSound.play();
      }
    }

    if (wordStack.includes(input)) {
      t2.current = Date.now();
      setConsecutiveCorrect((consecutiveCorrect) => consecutiveCorrect + 1);
      setWordStack(wordStack.filter((word) => word !== input));
      setInput("");
      setMultiplier((multiplier) => multiplier + 1);
      correctSound.play();
      let timeInMin = (t2.current - t1.current) / 1000 / 60;
      let WPM = Math.floor(input.length / 5 / timeInMin);
      setWPM(WPM);
      setScore((score) => score + multiplier * WPM);
    }
  }, [
    input,
    multiplier,
    setInput,
    setMultiplier,
    setScore,
    setWPM,
    setWordStack,
    wordStack,
  ]);

  return (
    <div className="word-stack">
      <TransitionGroup component={null}>
        {wordStack.length !== 0 &&
          wordStack.map((word, index) => {
            return (
              <CSSTransition key={word} timeout={500} classNames="word">
                <div className="word">
                  {word?.split("").map((letter, index) => {
                    let color;
                    if (
                      input.split("")[index] === letter &&
                      word.startsWith(input)
                    ) {
                      if (input === word[0]) {
                        t1.current = Date.now();
                      }

                      color = "#8abe5e";
                    } else {
                      color = null;
                    }
                    return (
                      <span key={index} style={{ backgroundColor: color }}>
                        {letter}
                      </span>
                    );
                  })}{" "}
                </div>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    </div>
  );
};

export default WordStack;
