import { createContext, useEffect, useState } from "react";
import { customerFakeData, ourProducts } from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const AppContext = createContext(); // important

const API_PRODUCT = 'http://localhost:3000/api/product'; //temporary
export const AppContextProvider = ({ children }) => {


  const navigate = useNavigate();
  const [user, setUser] = useState(false) //login relate
  const [admin, setAdmin] = useState(true) //admin auth relate
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [wishItems, setWishItems] = useState({});
  const [allUsers, setAllUsers] = useState([]) //all users not completed


  const fetchProduct = async () => {
    const res = await axios.get(API_PRODUCT);
    setProducts(res.data)
    setSearchQuery(res.data)
  }

  useEffect(() => {
    // setProducts(ourProducts);
    // setSearchQuery(ourProducts);
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
      let itemInfo = products.find((product) => product._id === items);
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

  const addProduct = async (productData) => {
    try {
      const res = await axios.post(API_PRODUCT, productData);
      await fetchProduct();
      toast.success("Product Added Successfully");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await axios.put(`${API_PRODUCT}/${id}`, productData);
      await fetchProduct();
      toast.success("Product Updated");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_PRODUCT}/${id}`);
      fetchProduct();
      toast.success("Product deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <AppContext.Provider
      value={{
        products, navigate, user, setUser, admin, setAdmin, showUserLogin, setShowUserLogin, searchQuery, setSearchQuery,
        cartItems, addToCart, updateCartItem, removeCartItem, getCartCount, getCartAmount, forgotPass, addToWish, wishItems, setWishItems,
        allUsers, addProduct, updateProduct, deleteProduct, API_PRODUCT
      }}>
      {children}
    </AppContext.Provider>
  );
};
