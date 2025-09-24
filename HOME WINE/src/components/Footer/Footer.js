import classNames from "classnames/bind";

import { FaRegCopyright } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.webp";

import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
function Footer() {
  return (
    <footer>
      <div className={cx("footer-content")}>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        >
          <img src={logo} alt=""></img>
        </Link>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(navClass) => (navClass.isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active" : "")}
              to="/about"
            >
              about
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={(navClass) => (navClass.isActive ? "active" : "")}
            >
              blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={(navClass) => (navClass.isActive ? "active" : "")}
            >
              shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={(navClass) => (navClass.isActive ? "active" : "")}
            >
              contacts
            </NavLink>
          </li>
        </ul>
        <div className={cx("copyright")}>
          <Link to="#">Group 5</Link>
          <FaRegCopyright />.<p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
