import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // Import the auth object from your firebase.js file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Use Firebase auth to create a new user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("User signed up with ", user.email);
        // You can redirect to another page or perform other actions after signup
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert(error.message);
      });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
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
        <button onClick={handleSignup}>Continue</button>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        <p className="loginsignup-login">
          Already have an account?
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span> Login here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
