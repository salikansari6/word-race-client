import React,{useState} from 'react'
import Keyboard from '../Keyboard'
import WordStack from '../WordStack'
import Progress from '../Progress';
import GameOver from '../GameOver';

const Game = ({isAuth}) => {
    const [input,setInput] = useState("")
    const [score,setScore] = useState(0)
    const [level,setLevel] = useState(1)
    const [multiplier,setMultiplier] = useState(1)
    const [showGameOver,setShowGameOver] = useState(false)
    const [WPM,setWPM] = useState("")
    const [wordStack,setWordStack] = useState([])
    const [speed,setSpeed] = useState(3000)

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
                                    
                                    setShowGameOver={setShowGameOver}
                                    setMultiplier={setMultiplier}
                                    setScore={setScore}
                                    score={score}
                                    setLevel={setLevel}
                                    isAuth={isAuth}
                                    level={level}
                                    setSpeed={setSpeed}
                                    setWordStack={setWordStack}
                                />
            }            
        </div>
    )
}

export default React.memo(Game)
