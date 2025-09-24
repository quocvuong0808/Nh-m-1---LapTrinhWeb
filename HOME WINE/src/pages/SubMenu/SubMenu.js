import classNames from "classnames/bind";
import { useContext } from "react";

import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../contexts/MenuContext";

import styles from "./SubMenu.module.scss";
const cx = classNames.bind(styles);
function SubMenu() {
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  return (
    <div className={cx("sub-section", openMenu ? "active" : "")}>
      <div className={cx("sub-menu")}>
        <span>
          <i>
            <IoClose onClick={() => setOpenMenu(false)} />
          </i>
        </span>
        <ul>
          <li>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active" : "")}
              to="/"
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
              className={(navClass) => (navClass.isActive ? "active" : "")}
              to="/blog"
            >
              blog
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active" : "")}
              to="/shop"
            >
              shop
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navClass) => (navClass.isActive ? "active" : "")}
              to="/contact"
            >
              contacts
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={cx("blank")} onClick={() => setOpenMenu(false)}></div>
    </div>
  );
}

export default SubMenu;
