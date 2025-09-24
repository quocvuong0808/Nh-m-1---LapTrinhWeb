import classNames from "classnames/bind";

import { FaBullhorn, FaClock, FaCreditCard } from "react-icons/fa";
import SubTitle from "../../shared/SubTitle/SubTitle";

import styles from "./Choose.module.scss";
const cx = classNames.bind(styles);
function Choose() {
  return (
    <div className={cx("choose-container")}>
      <SubTitle subtitle={"why choose us"} />
      <div className={cx("choose-content")}>
        <div className={cx("choose-box")}>
          <i>
            <FaBullhorn />
          </i>
          <span>quality</span>
          <p>
            All our beverages are supplied by proven manufacturers from all
            around the world. We guarantee the high-class quality.
          </p>
        </div>
        <div className={cx("choose-box")}>
          <i>
            <FaClock />
          </i>
          <span>domestic & commercial</span>
          <p>
            We ship all over USA as well as overseas. It takes 3-5 business days
            for package to be delivered right to your doors within US.
          </p>
        </div>
        <div className={cx("choose-box")}>
          <i>
            <FaCreditCard />
          </i>
          <span>best cost</span>
          <p>
            Prices on our products are fair and affordable. You will be gladly
            surprised once you get your package delivered!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Choose;
