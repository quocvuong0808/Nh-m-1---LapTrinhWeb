import classNames from "classnames/bind";

import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import styles from "./Navigation.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Navigation() {
  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 400) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={cx("navigation", scroll ? "active" : "")} onClick={onTop}>
      <span>
        <MdOutlineKeyboardArrowUp />
      </span>
    </div>
  );
}

export default Navigation;
