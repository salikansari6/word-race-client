import React from 'react'
import Keyboard from '../Keyboard'
import WordStack from '../WordStack'
import Progress from '../Progress';
import GameOver from '../GameOver';

const Game = ({isAuth}) => {
    const [input,setInput] = React.useState("")
    const [score,setScore] = React.useState(0)
    const [level,setLevel] = React.useState(1)
    const [multiplier,setMultiplier] = React.useState(1)
    const [showGameOver,setShowGameOver] = React.useState(false)
    const [WPM,setWPM] = React.useState("")
    const [wordStack,setWordStack] = React.useState([])
    const [speed,setSpeed] = React.useState(3000)



    return(
        <div className="App">
            <Progress score={score} level={level} multiplier={multiplier} WPM={WPM} setWPM={setWPM}/>
            <WordStack 
                wordStack={wordStack}
                setWordStack={setWordStack}
                input={input} 
                setInput={setInput} 
                setShowGameOver={setShowGameOver}
                setLevel={setLevel}
                score={score}
                setWPM={setWPM}
                speed={speed}
                setSpeed={setSpeed}
                setMultiplier={setMultiplier}
                multiplier={multiplier}
                setScore={setScore}/>
            <Keyboard input={input} setInput={setInput} showGameOver={showGameOver}/>
            {
                showGameOver && <GameOver 
                                    isAuth={isAuth}
                                    setShowGameOver={setShowGameOver}
                                    setMultiplier={setMultiplier}
                                    setScore={setScore}
                                    score={score}
                                    setLevel={setLevel}
                                    level={level}
                                    setSpeed={setSpeed}
                                    setWordStack={setWordStack}
                                />
            }            
        </div>
    )
}

export default Game
