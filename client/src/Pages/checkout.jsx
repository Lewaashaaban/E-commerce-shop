// Checkout.js
import React from "react";
import "./CSS/Checkout.css";
import Footer from "../Components/Footer/Footer";
import { ShopContext } from "../Context/ShopContext";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

const Checkout = () => {
  const { all_product, getTotalCartAmount } = useContext(ShopContext);
  const location = useLocation();
  const { cartItems = {}, totalQuantity, totalAmount } = location.state || {};

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-items">
        {Object.keys(cartItems).map((cartItemKey) => {
          const cartItem = cartItems[cartItemKey];
          const quantity = cartItem?.quantity || 0;
          const [productId, selectedSize] = cartItemKey.split("_");

          // Assuming all_product is available in the context
          const product = all_product.find((p) => String(p.id) === productId);

          if (product) {
            return (
              <div key={cartItemKey}>
                <div className="checkout-item">
                  <img src={product.image} alt="" />
                  <div className="checkout-item-details">
                    <p>{product.name}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Size: {selectedSize}</p>
                    <p>Total: ${product.new_price * quantity}</p>
                  </div>
                </div>
                <hr />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Display item names and quantities */}
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="checkout-summary-item">
          <p>Subtotal:</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <div className="checkout-summary-item">
          <p>Shipping Fee:</p>
          <p>Free</p>
        </div>
        <div className="checkout-summary-item total">
          <p>Total:</p>
          <p>${getTotalCartAmount()}</p>{" "}
          {/* Use the totalAmount from location.state */}
        </div>

        {/* Add a form for payment details */}
        <form className="payment-form">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" />

          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" id="expirationDate" name="expirationDate" />

          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" />

          <button type="submit">Place Order</button>
        </form>
      </div>

     
    </div>
  );
};

export default Checkout;
