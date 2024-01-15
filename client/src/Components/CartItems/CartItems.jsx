import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  console.log(cartItems); // Log the cartItems state

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove </p>
      </div>
      <hr />{" "}
      {Object.keys(cartItems).map((cartItemKey) => {
        const cartItem = cartItems[cartItemKey];
        const quantity = cartItem?.quantity || 0;
        const [productId, selectedSize] = cartItemKey.split("_");

        if (quantity > 0) {
          const product = all_product.find((p) => String(p.id) === productId);
          if (product) {
            return (
              <div key={cartItemKey}>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    src={product.image}
                    alt=""
                    className="carticon-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>${product.new_price}</p>
                  <button className="cartitems-quantity">{quantity}</button>
                  <p>{selectedSize}</p>
                  <p>${product.new_price * quantity}</p>
                  <img
                    className="cartitems-remove-icon"
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(cartItemKey);
                    }}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
        }
        return null;
      })}
      {/* {Object.keys(cartItems).map((productId) => {
        const quantity = cartItems[productId]?.quantity || 0;
        if (quantity > 0) {
          const product = all_product.find(
            (p) => String(p.id) === String(productId)
          );
          if (product) {
            return (
              <div key={productId}>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    src={product.image}
                    alt=""
                    className="carticon-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>${product.new_price}</p>
                  <button className="cartitems-quantity">{quantity}</button>
                  <p>{cartItems[productId]?.size || "N/A"}</p>
                  <p>${product.new_price * quantity}</p>

                  <img
                    className="cartitems-remove-icon"
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(productId);
                    }}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
        }
        return null;
      })} */}
    
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed To Checkout</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" name="" id="" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
