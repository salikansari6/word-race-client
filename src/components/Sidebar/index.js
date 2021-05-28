import React,{useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import './Sidebar.css'
import Logo from '../../assets/icons/Logo'
const Sidebar = ({isAuth,setIsAuth,...props}) => {
    const [user,setUser] = useState('')
    const [showMenu,setShowMenu] = useState(true)
    const screenWidth = window.innerWidth

    useEffect(() =>{
        if(screenWidth > 800){
            setShowMenu(true)
        }
    },[screenWidth])

    const history = useHistory()
    const logOut = e =>{
        e.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('token')
        history.push('/')
    }

    useEffect(() =>{
        if(isAuth){            
            fetch('https://word-race-backend.herokuapp.com//api/user',{
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


        const handleClick = () =>{
            setShowMenu(!showMenu)
        }
    

    return (
        // <Router>
        <div className="sidebar">
             <div className='mobile-nav'>
                    <button className={`menu-button ${showMenu ? 'open' : ''}`} onClick={handleClick}>
                        <span></span><span></span><span></span>
                    </button>
                    <Logo/>
                </div>
            <Logo/>
            <h1 className="word-race">WORD RACE</h1>
            <div className={`list-wrapper  ${showMenu ? '' : 'hide-menu'}`}>
            {user && isAuth && <div className="user">Welcome {user.name}</div>}
                <ul className={`sidebar-list`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li> {isAuth ? <div className="logout" style={{cursor:'pointer'}} onClick={logOut}>Log Out</div> : <Link to="/login">Log In</Link> }</li>
                    <li><Link to='/leaderboard'>Leaderboard</Link></li>
                    <li>{isAuth && <Link to="/user-stats">Your stats</Link>}</li>
                </ul>
            </div>
        </div>
        /* </Router> */
    )
}

export default Sidebar
