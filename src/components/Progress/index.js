import React,{useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'
import './Progress.css'

const Progress = ({score,level,multiplier,WPM,setWPM}) => {


    useEffect(() =>{
       
        const WPMTimeout = setTimeout(() =>{
            setWPM('')
        },2000)
        
        return(() =>{
            clearTimeout(WPMTimeout)
        })

    },[WPM,setWPM])

    return (
        <div className="progress">
            <div className="level">
                <div>
                {level}
                </div>
                <div>LEVEL</div>
            </div>
            <div className="score-wrap">
                <div className="score">
                    <div>
                        {score}
                    </div>
                    <div>SCORE</div>
                </div>
            </div>
            <CSSTransition
            in={!!WPM}
            timeout={2000}
            unmountOnExit
            classNames="wpm"
            >
                <div className="wpm">+{WPM} WPM</div>
            </CSSTransition>
            <div className="multiplier-wrap">
                <div className="multiplier">
                    {multiplier} x
                </div>
            </div>
        </div>
    )
}

export default Progress
