import React, { useContext, useState, } from 'react'
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios'
import "./login.css"
// import { Link } from 'react-router-dom'
// import Srujan from "./images/Srujan.png"
// import images(16).jpeg from "../login/images/images(16).jpeg"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    });
    const {loading,error,dispatch} = useContext(AuthContext);
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setCredentials((prev)=> ({...prev,[e.target.id]: e.traget.value}));
    }
        const handleClick = async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
          const res = await axios.post("/auth/login", credentials);
          dispatch({ type: "LOGIN_SUCCESS",payload:res.data.details});
          navigate("/")
        }catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    }    
    // console.log(user)
  return (
   <div className="login">
    <div className="lContainer">
    {/* <img className="logol" src={Srujan} alt="" /> */}
    {/* <img className='logol' src="../../Hotelsimage/image (16).jpeg"alt=''/> */}
    <h1 className='hotel'>Hotel Booking</h1>
    <label>email</label>
        <input type="text" placeholder='username' id='username' onChange={handleChange} className="linput"/>
        <label htmlFor="">password</label>
        <input type="password" placeholder='password' id='password' onChange={handleChange} className="linput"/>
        <button disabled={loading} onClick={ handleClick } className="lButton">Login</button> 
        {error && <span>{error.message}</span>}
    </div>
    <p>-------or-------</p>
    <button><Link to="/singup"  style={{ color: "inherit", textDecoration: "none" }}></Link></button>
   </div>
  )
}

export default Login
