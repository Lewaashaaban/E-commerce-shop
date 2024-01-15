import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";
import CartItems from "../Components/CartItems/CartItems";
import { auth } from "../firebase";
export const ShopContext = createContext(null);
const getDefualtCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefualtCart());
  const [user, setUser] = useState(null); // Include user state
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += iteminfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const loginUser = async (email, password) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setUser(user);
        console.log(user);
        console.log("Logged in with ", user.email);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert(error.message);
      });
  };
  const logoutUser = async () => {
    try {
      // Log out the user with Firebase
      await auth().signOut();

      // Clear the user state
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Handle logout error, e.g., show an alert or display an error message
    }
  };

  const getTotalItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };
  const contextValue = {
    getTotalItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    logoutUser,
    loginUser,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
