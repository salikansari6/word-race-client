import React,{useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import './Sidebar.css'
import Logo from '../../assets/icons/Logo'
const Sidebar = ({isAuth,setIsAuth,...props}) => {
    const [user,setUser] = useState('')
    const history = useHistory()
    const logOut = e =>{
        e.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('token')
        history.push('/')
    }

    useEffect(() =>{
        if(isAuth){            
            fetch('https://word-race-backend.herokuapp.com/api/user',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(data => setUser(data))
        }
        },[isAuth])


    return (
        <div className={`sidebar ${props.className}`}>
            <Logo/>
            <h1 className="word-race">WORD RACE</h1>
            {user && isAuth && <div className="user">Welcome {user.name}</div>}
            <ul className="sidebar-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li> {isAuth ? <div className="logout" style={{cursor:'pointer'}} onClick={logOut}>Log Out</div> : <Link to="/login">Log In</Link> }</li>
                <li><Link to='/leaderboard'>Leaderboard</Link></li>
                <li>{isAuth && <Link to="/user-stats">Your stats</Link>}</li>
            </ul>
        </div>
    )
}

export default Sidebar
