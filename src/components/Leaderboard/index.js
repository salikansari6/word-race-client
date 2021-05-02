import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Leaderboard.css'

const Leaderboard = () => {
    const [stats,setStats] = useState(null)

    useEffect(() =>{
        fetch('https://word-race-backend.herokuapp.com/api/stats')
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            setStats(data)
        }) 
    },[])

    return (
        <div className='leaderboard'>
            <h1>Leaderboard</h1>
            <table className="leaderboard__table">
                <th>Sr. no</th>
                <th>User</th>
                <th>Score</th>
                <th>Max Level</th>
                {
                    stats?.map(((stat,index) =>{
                        return (
                            <tr key={stat._id}>
                                <td>{index+1}</td>
                                <td><Link to={`/user-stats/${stat.user._id}`}>{stat.user.name}</Link></td>
                                <td>{stat.score}</td>
                                <td>{stat.level}</td>
                            </tr>
                        )
                    }))
                }
                {/* <tr>
                    
                    <td></td>
                    <td>dummy user</td>
                    <td>dummy score</td>
                    <td>dummy level</td>
                </tr> */}
            </table>
        </div>
    )
}

export default Leaderboard
