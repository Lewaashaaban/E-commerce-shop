import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import { auth } from "../firebase";
import CustomModal from "../Components/Alert/Custommodal";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleLogin = () => {
    if (!email || !password) {
      setShowLoginModal(true);
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        console.log("Logged in with ", user.email);
        setShowSuccessModal(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {

      if (user) {
        setShowSuccessModal(true);
      }
    });

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
      <CustomModal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        message="Please Fill in all Fields"
      />
      <CustomModal
        isOpen={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        message="User is logged in!"
      />
    </div>
  );
};

export default Login;
