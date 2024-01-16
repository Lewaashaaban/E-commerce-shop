import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { auth } from "../../firebase";
import CartItems from "../CartItems/CartItems";
import CustomModal from "../Alert/Custommodal";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { getTotalItems } = useContext(ShopContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleloginauthor = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/cart");
      } else {
        setShowLoginModal(true);
      }
    });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [CartItems]);

  const resetUserData = () => {
    setUser({
      ...user,
      shoppingCart: [],
    });
  };
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      try {
        await auth.signOut();
        alert("Logged out successfully");
        navigate("/");
      } catch (error) {
        console.log("Error signing out");
      }
    }
  };

  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Lewaa's Shop</p>
      </div>
      <ul className="nav-menu">
        <li className={isMenuItemActive("/") ? "active" : ""}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>
          {isMenuItemActive("/") && <hr />}
        </li>
        <li className={isMenuItemActive("/mens") ? "active" : ""}>
          <Link to="/mens" style={{ textDecoration: "none" }}>
            Men
          </Link>
          {isMenuItemActive("/mens") && <hr />}
        </li>
        <li className={isMenuItemActive("/womens") ? "active" : ""}>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Women
          </Link>
          {isMenuItemActive("/womens") && <hr />}
        </li>
        <li className={isMenuItemActive("/kids") ? "active" : ""}>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>
          {isMenuItemActive("/kids") && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <button
            onClick={handleLogout}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button>Login</button>
          </Link>
        )}
        {/* <Link
          to="/cart"
          onClick={handleloginauthor}
          style={{ textDecoration: "none" }}
        > */}
        <img src={cart_icon} alt="" onClick={handleloginauthor} />
        {/* </Link> */}
        <div className="nav-cart-count">{getTotalItems()}</div>
      </div>
      <CustomModal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        message="Please log in to Proceed"
      />
    </div>
  );
};

export default Navbar;
