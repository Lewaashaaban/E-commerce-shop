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
  const [selectedSize, setSelectedSize] = useState("");
  const { product } = props;

  const [cartItems, setCartItems] = useState(getDefualtCart());
  console.log(cartItems);
  const [user, setUser] = useState(null); // Include user state

  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   console.log(cartItems);
  // };

  const addToCart = (product, selectedSize) => {
    setCartItems((prev) => ({
      ...prev,
      [`${product.id}_${selectedSize}`]: {
        quantity: (prev[`${product.id}_${selectedSize}`]?.quantity || 0) + 1,
        size: selectedSize,
      },
    }));

    setSelectedSize(selectedSize);
  };

  const removeFromCart = (cartItemKey) => {
    setCartItems((prev) => {
      const cartItem = prev[cartItemKey];
      const updatedCart = { ...prev };

      if (cartItem?.quantity > 1) {
        updatedCart[cartItemKey] = {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      } else {
        // If quantity is 1 or less, remove the item from the cart
        delete updatedCart[cartItemKey];
      }

      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const cartItemKey in cartItems) {
      const cartItem = cartItems[cartItemKey];
      if (cartItem?.quantity > 0) {
        const [productId] = cartItemKey.split("_");
        const itemInfo = all_product.find(
          (product) => String(product.id) === productId
        );

        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem.quantity;
        }
      }
    }
    console.log("totalAmount:", totalAmount);
    return totalAmount;
  };

  // login fxn
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

  // logout function
  const logoutUser = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Handle logout error, e.g., show an alert or display an error message
    }
  };

  // get total items
  const getTotalItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item]?.quantity > 0) {
        totalItem += cartItems[item]?.quantity;
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
    selectedSize,
    setSelectedSize,
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
