import classNames from "classnames/bind";

import brand1 from "../../assets/images/brands/brand-01.webp";
import brand2 from "../../assets/images/brands/brand-02.webp";
import brand3 from "../../assets/images/brands/brand-03.webp";
import brand4 from "../../assets/images/brands/brand-04.webp";
import brand5 from "../../assets/images/brands/brand-05.webp";
import brand6 from "../../assets/images/brands/brand-06.webp";

import styles from "./Brand.module.scss";
const cx = classNames.bind(styles);
function Brand() {
  return (
    <div className={cx("brand-container")}>
      <div className={cx("image-box")}>
        <img src={brand1} alt=""></img>
      </div>
      <div className={cx("image-box")}>
        <img src={brand2} alt=""></img>
      </div>
      <div className={cx("image-box")}>
        <img src={brand3} alt=""></img>
      </div>
      <div className={cx("image-box")}>
        <img src={brand4} alt=""></img>
      </div>
      <div className={cx("image-box")}>
        <img src={brand5} alt=""></img>
      </div>
      <div className={cx("image-box")}>
        <img src={brand6} alt=""></img>
      </div>
    </div>
  );
}

export default Brand;
