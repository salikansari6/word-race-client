import React,{useState,useEffect} from 'react'
import "./App.css"
import Game from './components/Game'
import StartScreen from './components/StartScreen'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Leaderboard from './components/Leaderboard'
import SignUp from './components/SignUp'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserStats from './components/UserStats'

const App = () =>{
    
    const [isAuth,setIsAuth] = useState(JSON.parse(localStorage.getItem('isAuth')) || false)
    useEffect(() =>{
        localStorage.setItem('isAuth',isAuth)
    },[isAuth])




    return (
       <div className="App">
        <Router>
                <Sidebar isAuth={isAuth} setIsAuth={setIsAuth}/>
                <Switch>
                    <Route component={() =>(
                        <Login setIsAuth={setIsAuth} isAuth={isAuth}/>
                    )} exact path='/login'></Route>
                    <Route component={SignUp} exact path='/signup'></Route>
                    <Route component={Leaderboard} exact path="/leaderboard"></Route>
                    <Route component={StartScreen} exact path="/"></Route>
                    <Route component={()=>(<Game isAuth={isAuth}/>)} exact path="/game"></Route>
                    <Route component={()=>(<UserStats isAuth={isAuth}/>)} exact path="/user-stats/:id?"></Route>
                </Switch>
            </Router>
       </div>

   )
}

export default App