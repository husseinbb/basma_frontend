import React ,{ useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard"
import Register from "../Register/Register";
import Logout from "../Logout/Logout";

const Navbar = (props) => {

    let [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoggedIn = (isLoggedIn) => {
        setIsLoggedIn(isLoggedIn)
    }

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <Link className='navbar-brand' to="/dashboard">Dashboard</Link>

                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/register">Register</Link>
                    </li> 
                    <li className='nav-item'>
                        {isLoggedIn ? 
                            <Link className='nav-link' to="/logout">Logout</Link>
                             : 
                            <Link className='nav-link' to="/login">Login</Link>
                        } 
       
                    </li> 
                </ul>
            </nav>

            <Switch>
                <Route exact path="/login">
                    <Login  onChange={(newValue)=>{
                        handleLoggedIn(newValue)
                        }}
                    /> 
                </Route>
                <Route exact path="/register" component={Register} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute path="/logout">
                <Logout  onChange={(newValue)=>{
                        handleLoggedIn(newValue)
                        }}
                    /> 
                </ProtectedRoute>  
            </Switch>
        </Router>

    );
}

export default Navbar;