import { createContext, useEffect, useState } from "react";
import { customerFakeData, ourProducts } from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.BACKEND_URL;

export const AppContext = createContext(); // important

export const AppContextProvider = ({ children }) => {


  const navigate = useNavigate();
  const [user, setUser] = useState(false)
  const [admin, setAdmin] = useState(true)
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [wishItems, setWishItems] = useState({});
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    setProducts(ourProducts);
    setSearchQuery(ourProducts);
    setAllUsers(customerFakeData)
  }, []);

  // product add to cart
  const addToCart = (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      updated[itemId] = (updated[itemId] || 0) + 1;
      return updated;
    });
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => ({
      ...prev,
      [itemId]: quantity,
    }));
    toast.success("Cart updated");
  };

  const removeCartItem = (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
    toast.success("Removed from cart");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      totalCount += cartItems[productId];
    }
    return totalCount;
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  const forgotPass = () => {
    toast.error("Working on progress!")
  }

  const addToWish = (itemId) => {
    setWishItems(prev => {
      const wishupdated = { ...prev };

      if (wishupdated[itemId]) {
        delete wishupdated[itemId];
        toast.success("Removed from wishlist");
      } else {
        wishupdated[itemId] = true;
        toast.success("Added to wishlist");
      }
      return wishupdated;
    });
  };

  // all alert => adding to single function
  const notificationsAll = () => {

  }

  return (
    <AppContext.Provider
      value={{
        products, navigate, user, setUser, admin, setAdmin, showUserLogin, setShowUserLogin, searchQuery, setSearchQuery,
        cartItems, addToCart, updateCartItem, removeCartItem, getCartCount, getCartAmount, forgotPass, addToWish, wishItems, setWishItems,
        allUsers
      }}>
      {children}
    </AppContext.Provider>
  );
};
