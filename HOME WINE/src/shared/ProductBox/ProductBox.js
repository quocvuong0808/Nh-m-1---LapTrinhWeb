import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames/bind";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaStar,
  FaShoppingCart,
  FaBalanceScale,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { toastifyError } from "../Toastify/Toastify";
import { BASE_URL } from "../../config/utils";
import useAxiosJWT from "../../config/axiosConfig";
import Notify from "../../components/Notify/Notify";

import styles from "./ProductBox.module.scss";
const cx = classNames.bind(styles);
function ProductBox({ product, refetchData = () => {} }) {
  const { handleAddToCart, loading } = useContext(CartContext);
  const { getCompareList } = useContext(AuthContext);
  const [heart, setHeart] = useState(product.isFavorite);
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const words = product.name.split(" ");
  const name = words.slice(0, 4).join(" ");
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  useEffect(() => {
    if (!user || user === undefined || user === null) {
      setHeart(false);
    }
  }, [user]);

  // handle toggle favorite
  const toggleFavorites = async (id) => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/favorite`,
        JSON.stringify({
          wineId: id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };
  const handleToggleFavorite = async (id) => {
    if (!user || user === undefined || user === null) {
      return toastifyError("You're not authenticated. Please sign in !!");
    }
    setLoadingFavorite(true);
    try {
      await toggleFavorites(id);
      setHeart((prev) => !prev);
      refetchData();
      setLoadingFavorite(false);
    } catch (error) {
      setLoadingFavorite(false);
      return toastifyError(error.resposne?.data?.message);
    }
  };

  //handle toggle compare
  const toggleCompare = async (id) => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/compare`,
        { wineId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };
  const handleToggleCompare = async (id) => {
    if (!user || user === undefined || user === null) {
      return toastifyError("You're not authenticated. Please sign in !!");
    }
    setLoadingCompare(true);
    try {
      const result = await toggleCompare(id);
      getCompareList();
      setMessage(result.message);
      setActive(true);
      setLoadingCompare(false);
    } catch (error) {
      setLoadingCompare(false);
      return alert(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Notify message={message} active={active} setActive={setActive} />
      <div className={cx("product-box")}>
        <div className={cx("product-image")}>
          <Link to="#">
            <img src={product.image} alt=""></img>
          </Link>
          {product.isSale ? (
            <div className={cx("sale-box")}>
              <span>sale</span>
            </div>
          ) : (
            ""
          )}
          <div className={cx("icons")}>
            <Link onClick={() => handleToggleCompare(product._id)}>
              {loadingCompare ? (
                <AiOutlineLoading3Quarters
                  className={cx("loading-compare_icon")}
                  style={{ color: "var(--primary-color)" }}
                />
              ) : (
                <FaBalanceScale />
              )}
            </Link>
            <Link
              onClick={() => handleToggleFavorite(product._id)}
              className={cx(heart ? "heart" : "")}
            >
              {loadingFavorite ? (
                <AiOutlineLoading3Quarters
                  className={cx("loading-favorite_icon")}
                  style={{ color: "var(--primary-color)" }}
                />
              ) : (
                <FaHeart />
              )}
            </Link>
            <Link to="#">
              <FaSearch />
            </Link>
          </div>
        </div>
        <div className={cx("product-content")}>
          <Link to={`/${product._id}`} className={cx("product-name")}>
            {name}...
          </Link>
          <div className={cx("rate-box")}>
            <div className={cx("price")}>
              {product.isSale ? (
                <p className={cx("old-pirce")}>
                  ${parseInt(product.price).toFixed(2)}
                </p>
              ) : (
                ""
              )}
              <p className={cx("product-price")}>
                ${parseInt(product.newPrice).toFixed(2)}
              </p>
            </div>
            <div className={cx("star")}>
              {[...Array(product.star).keys()].map((_, index) => (
                <FaStar key={index} className={cx("star-icon")} />
              ))}
            </div>
          </div>
        </div>
        <Link
          to="#"
          className={cx("btn", "option-btn")}
          onClick={() => handleAddToCart(product._id, 1)}
        >
          {loading ? (
            <ClipLoader
              color="var(--primary-color)"
              cssOverride={{}}
              loading
              size={13}
              speedMultiplier={1}
            />
          ) : (
            <FaShoppingCart />
          )}
          add to cart
        </Link>
      </div>
    </>
  );
}

export default ProductBox;
