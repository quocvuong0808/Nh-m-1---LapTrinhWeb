import classNames from "classnames/bind";

import styles from "./Title.module.scss";
const cx = classNames.bind(styles);
function Title({ title }) {
  return (
    <div className={cx("title")}>
      <h2>{title}</h2>
    </div>
  );
}

export default Title;
