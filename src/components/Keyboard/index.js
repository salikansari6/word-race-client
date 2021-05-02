import React from 'react'
import "./Keyboard.css"
import {sound} from '../../assets/sounds'



const Keyboard = ({input,setInput,showGameOver}) => {
    const [activeKey,setActiveKey] = React.useState("")
    const inputRef = React.useRef()

    const handleChange = e =>{
        if(e.key === " "){
            e.preventDefault();
        }
        setInput(e.target.value)
    }


    const handleKeyUp = e =>{
        setActiveKey("")
    }

    const handleKeyDown = e =>{
        if(e.key === " "){
            e.preventDefault();
        }
        setActiveKey(e.key)
        sound.play()
    }

    return (
        <div className="keyboard">
            <input type="text" value={input}
                className="keyboard-input" 
                onChange={handleChange} 
                placeholder="Type here..."
                disabled={showGameOver}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                />
            <div className="keyboard-wrapper">
                <div className="first-row">{"qwertyuiop".split("").map((letter,index) =>{
                    return <div className="key" 
                    style={{
                        backgroundColor:activeKey === letter ? "#fed34e": null,
                        transform : activeKey === letter ? 'scale(1.2)' : null
                    }}>{letter}</div>
                })}
                </div>
                <div className="second-row">{"asdfghjkl".split("").map((letter,index) =>{
                    return <div className="key" 
                    style={{
                        backgroundColor:activeKey === letter ? "#fed34e": null,
                        transform : activeKey === letter ? 'scale(1.2)' : null
                    }}>{letter}</div>
                })}</div>
                <div className="third-row">{"zxcvbnm".split("").map((letter,index) =>{
                    return <div className="key" 
                    style={{
                        backgroundColor:activeKey === letter ? "#fed34e": null,
                        transform : activeKey === letter ? 'scale(1.2)' : null
                    }}>{letter}</div>
                })}</div>
            </div>
        </div>
    )
}

export default Keyboard
