import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// ROUTING

import Home from "./Routingg/Home";
import Header from "./Routingg/Header";
import Login from "./Routingg/Login";
import Profile from "./Routingg/Profile";
import Protectedroutes from "./Routingg/Auth/Protectedroutes";

// TO DO LIST

import AddTask from './TodoList/AddTask'
import ShowTask from "./TodoList/ShowTask";





function App() {


  return <div className="App">

{/* ================== [ TO DO LIST ] ================== */}

<AddTask/>

{/* <ShowTask/> */}

{/* ================== [ LOGIN AUTHENTICATION AND AUTHORIZATION ] ================== */}

    {/* <Router>
        <Header />
        <div>
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Protectedroutes exact path="/profile"  component={()=> <Profile />}  />

          

          </Switch>
        </div>
      </Router> */}



  </div>;
}

export default App;
