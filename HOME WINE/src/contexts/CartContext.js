import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { toastifyError, toastifySuccess } from "../shared/Toastify/Toastify";
import { BASE_URL } from "../config/utils";
import useAxiosJwt from "../config/axiosConfig";

export const CartContext = createContext();
function CartProvider({ children }) {
  const user = useSelector((state) => state?.auth?.user);

  const [products, setProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const getAxios = useAxiosJwt();
  const axiosJwt = getAxios();

  const getProducts = async () => {
    try {
      const res = await axiosJwt.get(`${BASE_URL}/cart/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      setProducts(result.data.products);
    } catch (error) {
      return toastifyError(error?.response?.data?.message);
    }
  };
  const handleAddToCart = async (wineId, quantity) => {
    if (!user || user === undefined || user === null) {
      return toastifyError("You're not authenticated. Please sign in !!");
    }
    setLoading(true);
    try {
      const res = await axiosJwt.post(
        `${BASE_URL}/cart/add/${user._id}`,
        JSON.stringify({ wineId: wineId, quantity: quantity }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result) {
        getProducts();
        setLoading(false);
        toastifySuccess(result.message);
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error?.resonse?.data?.message);
    }
  };
  const increaseProduct = async (id) => {
    try {
      await axiosJwt.put(
        `${BASE_URL}/cart/increase/${user._id}`,
        JSON.stringify({ wineId: id }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      getProducts();
    } catch (error) {
      return toastifyError(error?.resonse?.data?.message);
    }
  };
  const decreaseProduct = async (id) => {
    try {
      await axiosJwt.put(
        `${BASE_URL}/cart/decrease/${user._id}`,
        JSON.stringify({ wineId: id }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      getProducts();
    } catch (error) {
      return toastifyError(error?.resonse?.data?.message);
    }
  };
  const clearProduct = async () => {
    try {
      const res = await axiosJwt.put(`${BASE_URL}/cart/clear/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result) {
        getProducts();
      }
    } catch (error) {
      return toastifyError(error?.resonse?.data?.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      await axiosJwt.put(
        `${BASE_URL}/cart/remove/${user._id}`,
        JSON.stringify({ wineId: id }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      );
      getProducts();
    } catch (error) {
      return toastifyError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [user]);
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = products.reduce((total, item) => {
        return total + item.quantity * item.wine.newPrice;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        openCart,
        totalPrice,
        products,
        loading,
        setOpenCart,
        handleAddToCart,
        increaseProduct,
        decreaseProduct,
        clearProduct,
        removeProduct,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
