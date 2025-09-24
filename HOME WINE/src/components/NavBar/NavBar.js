import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FiPhone } from "react-icons/fi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import {
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "../../redux/authSlice";
import { toastifyError } from "../../shared/Toastify/Toastify";
import { MenuContext } from "../../contexts/MenuContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import logoImg from "../../assets/images/logo.webp";
import userImg from "../../assets/images/user.png";

import styles from "./NavBar.module.scss";
const cx = classNames.bind(styles);
function NavBar() {
  const navigate = useNavigate();
  const { setOpenCart, openCart, products, setProducts } =
    useContext(CartContext);
  const { setOpenMenu } = useContext(MenuContext);
  const { compareList } = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const logout = async () => {
    dispatch(logoutStart());
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(logoutSuccess());
        setProducts([]);
        navigate("/");
      }
    } catch (error) {
      dispatch(logoutFailed());
      toastifyError(error.respons?.data?.message);
    }
  };

  return (
    <nav>
      <div className={cx("top")}>
        <div className={cx("info")}>
          <i>
            <FiPhone />
          </i>
          <Link to="#">+3(800)2345-6789</Link>
          <p>7 Days a week from 9:00 am to 7:00 pm</p>
        </div>
        <div className={cx("options")}>
          <ul>
            <li>
              {user ? (
                <button type="button" onClick={logout}>
                  <CiLogout style={{ fontSize: "18px" }} />
                  Logout
                </button>
              ) : (
                <Link to={"/login"}>
                  <CiLogin style={{ fontSize: "18px" }} />
                  Login
                </Link>
              )}
            </li>
            <li>
              <Link to="/compare">
                Compare{" "}
                {compareList.length > 0 ? `(${compareList.length})` : ""}
              </Link>
            </li>
            <li>
              <Link to="/account">My account</Link>
            </li>
            <li>
              <Link to="/wish-list">Wishlist</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("bottom")}>
        <div className={cx("bottom-content")}>
          <div className={cx("menu")}>
            <LuMenu onClick={() => setOpenMenu(true)} />
          </div>
          <Link
            to="/"
            className={cx("logo")}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            <img src={logoImg} alt=""></img>
          </Link>
          <div className={cx("links")}>
            <ul>
              <NavLink
                to="/"
                className={(navClass) => (navClass.isActive ? "active" : "")}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={(navClass) => (navClass.isActive ? "active" : "")}
              >
                About
              </NavLink>
              <NavLink
                to="/blog"
                className={(navClass) => (navClass.isActive ? "active" : "")}
              >
                Blog
              </NavLink>
              <NavLink
                to="/shop"
                className={(navClass) => (navClass.isActive ? "active" : "")}
              >
                Shop
              </NavLink>
              <NavLink
                to="/contact"
                className={(navClass) => (navClass.isActive ? "active" : "")}
              >
                Contacts
              </NavLink>
            </ul>
            <div className={cx("icons")}>
              <i
                className={cx("shopping-icon")}
                onClick={() => setOpenCart(!openCart)}
              >
                <FaShoppingCart />
                <span>{products.length}</span>
              </i>
              <div className={cx("avatar")}>
                <img
                  src={user?.avatar ? user?.avatar : userImg}
                  alt=""
                  className={cx("user-image")}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
