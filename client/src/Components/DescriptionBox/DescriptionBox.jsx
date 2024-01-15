import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        {/* <div className="descriptionbox-nav-box fade">Reviews (122)</div> */}
      </div>
      <div className="descriptionbox-description">
        <p>
          Introducing our Classic Striped Cotton Shirt, a timeless wardrobe
          essential that seamlessly blends style and comfort. Crafted with care
          from high-quality cotton fabric, this shirt promises a soft,
          breathable feel for all-day wear.
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default DescriptionBox;
