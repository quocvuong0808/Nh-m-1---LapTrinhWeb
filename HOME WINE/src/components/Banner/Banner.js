import classNames from "classnames/bind";


import styles from "./Banner.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Banner() {
  return (
    <div className={cx("banner-container")}>
      <Link to='#' className={cx("banner-1", "banner")}></Link>
      <Link to='#' className={cx("banner-2", "banner")}></Link>
    </div>
  );
}

export default Banner;
