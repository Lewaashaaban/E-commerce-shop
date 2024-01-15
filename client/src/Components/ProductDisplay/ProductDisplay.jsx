// import React, { useContext } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase";
// import { useState } from "react";
// import CustomModal from "../Alert/Custommodal";

// const ProductDisplay = (props) => {
//   const navigate = useNavigate();
//   const { product } = props;
//   const { addToCart } = useContext(ShopContext);
//   const { user, logoutUser, loginUser } = useContext(ShopContext);
//   const [showLoginModal, setShowLoginModal] = React.useState(false);
//   const [selectedSize, setSelectedSize] = useState(product.selectedSize || "");

//   const handleAddToCart = () => {
//     auth.onAuthStateChanged(function (user) {
//       if (user) {
//         addToCart(product.id);
//         console.log("User is logged in");
//       } else {
//         // alert("Please log in to add items to your cart.");
//         setShowLoginModal(true);
//       }
//     });
//   };
//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//   };
//   const handleLogout = () => {
//     logoutUser();

//     navigate("/"); // Redirect to the home page, for example
//   };

//   return (
//     <div className="productdisplay">
//       <div className="productdisplay-left">
// <div className="productdisplay-img-list">
//   <img src={product.image} alt="" />
//   <img src={product.image} alt="" />
//   <img src={product.image} alt="" />
//   <img src={product.image} alt="" />
// </div>
//         <div className="productdisplay-img">
//           <img className="productdisplay-main-img" src={product.image} alt="" />
//         </div>
//       </div>
//       <div className="productdisplay-right">
// <h1>{product.name}</h1>
// <div className="productdisplay-right-star">
//   <img src={star_icon} alt="" />
//   <img src={star_icon} alt="" />
//   <img src={star_icon} alt="" />
//   <img src={star_icon} alt="" />
//   <img src={star_dull_icon} alt="" />
//   <p>(122)</p>
//         </div>
//         <div className="productdisplay-right-prices">
//           <div className="productdisplay-right-price-old">
//             ${product.old_price}
//           </div>
//           <div className="productdisplay-right-price-new">
//             ${product.new_price}
//           </div>
//         </div>
//         <div className="productdisplay-right-description">
//           A lightweight, usually knitted, pullover shirt, close fitting{" "}
//         </div>
//         <div className="productdisplay-right-size">
//           <h1>Select Size</h1>
//           <div className="productdisplay-right-sizes">
//             {/* <div>S</div>
//             <div>M</div>
//             <div>L</div>
//             <div>XL</div>
//             <div>XXL</div> */}
//             <div
//               onClick={() => handleSizeClick("S")}
//               className={selectedSize === "S" ? "selected" : ""}
//             >
//               S
//             </div>
//             <div
//               onClick={() => handleSizeClick("M")}
//               className={selectedSize === "M" ? "selected" : ""}
//             >
//               M
//             </div>
//             <div
//               onClick={() => handleSizeClick("L")}
//               className={selectedSize === "L" ? "selected" : ""}
//             >
//               L
//             </div>
//             <div
//               onClick={() => handleSizeClick("XL")}
//               className={selectedSize === "XL" ? "selected" : ""}
//             >
//               XL
//             </div>
//             <div
//               onClick={() => handleSizeClick("XXL")}
//               className={selectedSize === "XXL" ? "selected" : ""}
//             >
//               XXL
//             </div>
//           </div>
//         </div>
//         <button onClick={handleAddToCart}>ADD TO CART</button>
//         <p className="productdisplay-right-category">
//           <span>Category: </span>Women, T-shirt, Crop Top
//         </p>
//         <p className="productdisplay-right-category">
//           <span>Tags: </span>Modern, Latest
//         </p>
//         <CustomModal
//           isOpen={showLoginModal}
//           onRequestClose={() => setShowLoginModal(false)}
//           message="Please log in to add items to your cart."
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;
import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Fix import statement
import CustomModal from "../Alert/Custommodal";

const ProductDisplay = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const { addToCart, user, logoutUser } = useContext(ShopContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || "");

  const handleAddToCart = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        addToCart(product, selectedSize);
        // addToCart(product.id);
        console.log("Added to cart with size:", selectedSize);
      } else {
        setShowLoginModal(true);
      }
    });
  };

  const handleLogout = () => {
    logoutUser();

    navigate("/"); // Redirect to the home page, for example
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />{" "}
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
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => handleSizeClick(size)}
                className={selectedSize === size ? "selected" : ""}
              >
                {size}
              </div>
            ))}
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
