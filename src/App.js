import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import { LineProgress } from "react-preloader-tmnt";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Game = React.lazy(() => import("./components/Game"));
const StartScreen = React.lazy(() => import("./components/StartScreen"));
const Leaderboard = React.lazy(() => import("./components/Leaderboard"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const UserStats = React.lazy(() => import("./components/UserStats"));
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
    <div className="App" id="App">
      <Router>
        <Sidebar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Switch>
          <Suspense fallback={<LineProgress loading={true} />}>
            <Route
              component={() => <Login setIsAuth={setIsAuth} isAuth={isAuth} />}
              exact
              path="/login"
            ></Route>
            <Route component={SignUp} exact path="/signup"></Route>
            <Route component={Leaderboard} exact path="/leaderboard"></Route>
            <Route component={StartScreen} exact path="/"></Route>
            <Route
              component={() => <Game isAuth={isAuth} />}
              exact
              path="/game"
            ></Route>
            <Route
              component={() => <UserStats isAuth={isAuth} />}
              exact
              path="/user-stats/:id?"
            ></Route>
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
