import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { removeUser } from "./store/authSlice";
import React, { useState, useEffect } from "react";

function Navbar() {

    const user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    
    function logout(){
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
               headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/Login');
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
       <div className="navbar-brand">
            <h4 style={{ color: "#15a6b4", display: "inline-block", marginRight: "12px" }}>
                Medscape
            </h4>
        </div>
        <button
        className="ts navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto">

            {user && (<p style={{fontSize:"15px",color:"#15a6b4", display: "inline-block", marginTop:"9.5px", marginRight:"12px"}}>Welcome,{user.email}  &nbsp;{currentTime.toLocaleTimeString()}</p>)}
                
                <li className="nav-item">
                <NavLink 
                to={"/"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Home
                </NavLink>
                </li>

                <li className="nav-item">
                <NavLink 
                to={"/aboutus"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    About us
                </NavLink>
                </li>

                {user && (user.id !== null || user.username === "guest") ? 
                (
                <li className="nav-item">
                    <NavLink to={"/Drugs/posts"} className={'nav-link ' + (status => status.isActive ? 'active' : '')}>
                        Drugs
                    </NavLink>
                </li>
                ) : null}

                {!user &&
                <li className="nav-item">
                <NavLink 
                to={"/Signup"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Signup
                </NavLink>
                </li>
                }

                {user?
                    <li className="nav-item">
                        <span className="nav-link lo" onClick={logout}>Logout</span>
                    </li>:

                    <li className="nav-item">
                        <NavLink 
                        to={"/Login"} 
                        className={
                        'nav-link '+
                        (status => status.isActive ? 'active' : '')
                        } 
                    >
                    Login
                        </NavLink>
                    </li>
                }
                
            </ul>
            
        </div>
    </nav>
    );
}

export default Navbar;