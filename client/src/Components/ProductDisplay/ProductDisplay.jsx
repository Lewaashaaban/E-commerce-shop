import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Navigate, Navigator, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import CustomModal from "../Alert/Custommodal";

const ProductDisplay = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const { user, logoutUser, loginUser } = useContext(ShopContext);
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleAddToCart = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        addToCart(product.id);
        console.log("User is logged in");
      } else {
        // alert("Please log in to add items to your cart.");
        setShowLoginModal(true);
      }
    });
  };

  const handleLogout = () => {
    // Call the logoutUser function to handle user logout
    logoutUser();
    // You can also redirect the user to a specific page after logout
    navigate("/"); // Redirect to the home page, for example
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close fitting{" "}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category: </span>Women, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>Modern, Latest
        </p>
        <CustomModal
          isOpen={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}
          message="Please log in to add items to your cart."
        />
      </div>
    </div>
  );
};

export default ProductDisplay;
