import React from 'react'
import {Link} from 'react-router-dom'
import './StartScreen.css'

const StartScreen = () => {
    return (
        <div className="container">
            <h1 className="title">WORD RACE</h1>
            <img className="hero-image" src="/images/pngjoy.com_adobe-photoshop-icon-typing-keyboard-clip-art-transparent_9197071.png" alt=""/>
            <ul className="instructions">
                <li>Player has to type the words present in the stack. The stack size of size 5</li>
                <li>Once the stack fills up, the game is over</li>
                <li>If the player wishes to save their scores, they would have to sign up</li>
                <li>As the level progresses the word-appearing rate increases</li>
                <li>The score is calculated on the basis of WPM of the typed word</li>
                <li>For every correct word the multiplier of score increases and on every mistype it resets</li>
            </ul>

            <Link className="start-button" to="/game" >Start Game</Link>
        </div>
    )
}

export default StartScreen
