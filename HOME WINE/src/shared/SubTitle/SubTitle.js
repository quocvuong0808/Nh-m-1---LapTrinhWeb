import classNames from "classnames/bind";

import lineImg from "../../assets/images/slider-lines.webp";

import styles from "./SubTitle.module.scss";
const cx = classNames.bind(styles);
function SubTitle({ subtitle }) {
  return (
    <div className={cx("sub-container")}>
      <h2>{subtitle}</h2>
      <img src={lineImg} alt=""></img>
    </div>
  );
}

export default SubTitle;
