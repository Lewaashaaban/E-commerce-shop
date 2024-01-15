import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // Import the auth object from your firebase.js file
import CustomModal from "../Components/Alert/Custommodal";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [errormsg, setErrorMessage] = React.useState(false);
  var err = "";
  const handleSignup = () => {
    if (!email || !password) {
      setShowLoginModal(true);

      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("User signed up with ", user.email);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        // alert(error.message);
        err = error.message;
        setErrorMessage(true);
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
      <CustomModal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        message="Please Fill in all Fields"
      />
      <CustomModal
        isOpen={errormsg}
        onRequestClose={() => setErrorMessage(false)}
        message={err}
      />
    </div>
  );
};

export default Signup;
