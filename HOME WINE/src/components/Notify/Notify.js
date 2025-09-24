import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import classNames from "classnames/bind";

import styles from "./Notify.module.scss";
const cx = classNames.bind(styles);
function Notify({ message, active, setActive = () => {} }) {
  return (
    <div
      className={cx("notify-section", active ? "active" : "")}
      onClick={() => setActive(false)}
    >
      <div className={cx("notify-container", active ? "active" : "")}>
        <span onClick={() => setActive(false)}>
          <IoIosClose style={{ cursor: "pointer" }} />
        </span>
        <h3>{message}</h3>
        <div className={cx("compare-button")}>
          <Link to="/compare">compare</Link>
        </div>
      </div>
    </div>
  );
}

export default Notify;
