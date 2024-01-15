// import React, { useContext, useState } from "react";
// import "./Navbar.css";
// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
// const Navbar = () => {
//   const [menu, setMenu] = useState("shop");
//   const { getTotalItems } = useContext(ShopContext);
//   return (
//     <div className="navbar">
//       <div className="nav-logo">
//         <img src={logo} alt="" />
//         <p>Lewaa's Shop</p>
//       </div>
//       <ul className="nav-menu">
//         <li
//           onClick={() => {
//             setMenu("shop");
//           }}
//         >
//           <Link to="/" style={{ textDecoration: "none" }}>
//             {" "}
//             Shop
//           </Link>

//           {menu === "shop" ? <hr /> : <></>}
//         </li>
//         <li
//           onClick={() => {
//             setMenu("mens");
//           }}
//         >
//           <Link to="/mens" style={{ textDecoration: "none" }}>
//             {" "}
//             Men
//           </Link>
//           {menu === "mens" ? <hr /> : <></>}
//         </li>
//         <li
//           onClick={() => {
//             setMenu("womens");
//           }}
//         >
//           <Link to="/womens" style={{ textDecoration: "none" }}>
//             {" "}
//             Women
//           </Link>

//           {menu === "womens" ? <hr /> : <></>}
//         </li>
//         <li
//           onClick={() => {
//             setMenu("kids");
//           }}
//         >
//           <Link to="/kids" style={{ textDecoration: "none" }}>
//             {" "}
//             Kids
//           </Link>
//           {menu === "kids" ? <hr /> : <></>}
//         </li>
//       </ul>
//       <div className="nav-login-cart">
//         <Link to="/signup" style={{ textDecoration: "none" }}>
//           <button>Login</button>
//         </Link>
//         <Link to="/cart" style={{ textDecoration: "none" }}>
//           <img src={cart_icon} alt="" />
//         </Link>

//         <div className="nav-cart-count">{getTotalItems()}</div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { auth } from "../../firebase"; // Update the path based on your file structure

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalItems } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    // Show a confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        // If the user confirms, proceed with logout
        await auth.signOut();
        alert("Logged out successfully");
      } catch (error) {
        console.log("Error signing out");
      }
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Lewaa's Shop</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            Shop
          </Link>

          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link to="/mens" style={{ textDecoration: "none" }}>
            {" "}
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link to="/womens" style={{ textDecoration: "none" }}>
            {" "}
            Women
          </Link>

          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/kids" style={{ textDecoration: "none" }}>
            {" "}
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {user ? (
          // User is logged in, show logout button
          <button
            onClick={handleLogout}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Logout
          </button>
        ) : (
          // User is not logged in, show login button
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
