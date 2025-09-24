import classNames from "classnames/bind";

import styles from "./PreLoader.module.scss";
const cx = classNames.bind(styles);
function Loader() {
  return (
    <div className={cx("center")}>
      <div className={cx("ring")}></div>
      <span>loading...</span>
    </div>
  );
}

export default Loader;
