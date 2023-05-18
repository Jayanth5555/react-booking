import {useContext} from 'react'
import "./navbar.css"
import {Link, } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import Login from '../../pages/login/Login';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <div className="navbar">
        <div className="navcontainer">
          <Link to="/" style={{color:'inherit', textDecoration :"none"}}>
           <div className="logo">Booking Travels</div>
           </Link>
          {user ? user.username: ( <div className="navItems">
                <button className="navbutton">Register</button>
                <button className="navbutton">     <NavLink
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Login
            </NavLink></button>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Navbar
