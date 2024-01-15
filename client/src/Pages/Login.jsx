import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import "./CSS/Login.css";
import { auth } from "../firebase";
// import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies, setCookies] = useCookies(["access_token"]);

  const handleLogin = () => {
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        console.log("Logged in with ", user.email);
        
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert(error.message);
      });
  };

  useEffect(() => {
    // Set up an observer to check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User state changed:", user);

      if (user) {
        // User is logged in, you can set an alert or perform other actions
        alert("User is logged in!");
      }
    });

    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-fields">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Continue</button>

        <p className="login-login">
          Don't have an account?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span> Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
