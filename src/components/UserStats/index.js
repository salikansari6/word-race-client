import React,{useEffect,useState} from 'react'
import {useHistory,useParams} from 'react-router'
import "./UserStats.css"

const UserStats = ({isAuth}) => {
    const [userStats,setUserStats] = useState()
    const history = useHistory()
    const { id } = useParams()
    useEffect(() =>{
        if(id){
            fetch(`https://word-race-backend.herokuapp.com/api/stats/${id}`)
            .then(res => res.json())
            .then(data =>{
                setUserStats(data)
            })
        }
        else{
            fetch(`https://word-race-backend.herokuapp.com/api/stats/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data =>{
                setUserStats(data)
            })
        }


    },[id])

    useEffect(() =>{
        if(!isAuth && !id){
            history.push('/')
        }
    },[isAuth,id,history])

    if(!userStats){
            
        return (
            <div className="user-stats"><h1>Loading....</h1></div>
        )
    }

    return (
        <div className="user-stats">
            { id && userStats.name && <h1>{userStats.name}'s stats</h1>}            
            {!id && userStats && <h1>Your stats</h1>}
            <div className="user-stats__body">
            {userStats && ( 
                <>
                <p>Average Score : {userStats.averageScore}</p>
                <p>Max Level Reached: {userStats.maxLevel}</p>
                <p>Total No. of Games Played : {userStats.noOfGamesPlayed}</p>
                </>
            )}
            </div>
        </div>
    )
}

export default UserStats
