import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Login.css";
const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-fields">
          {/* <input type="text" placeholder="Your Name" /> */}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>

        {/* <div className="login-agree">
          <input type="checkbox" name="" id="" />
         
        </div> */}
        <p className="login-login">
          Don't have an account?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span> Sign up</span>
          </Link>
        </p>
        {/* <Link to="/signup" style={{ textDecoration: "none",color:'red',fontWeight:'600' }}>
            <span>Sign up </span>
          </Link> */}
      </div>
    </div>
  );
};

export default Login;
