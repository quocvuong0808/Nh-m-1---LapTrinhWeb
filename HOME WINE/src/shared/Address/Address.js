import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { IoHomeSharp } from "react-icons/io5";

import styles from "./Address.module.scss";
const cx = classNames.bind(styles);
function Address({ address }) {
  return (
    <div className={cx("address-container")}>
      <div className={cx("address")}>
        <span>you are here:</span>
        <div className={cx("wrap")}>
          <span className={cx("item")}>
            <Link to="/">
              <IoHomeSharp className={cx("home-icon")} />
            </Link>
          </span>
          <span className={cx("item")}>/</span>
          <span className={cx("item")}>
            <Link to="#" className={cx("target")}>
              {address}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Address;
