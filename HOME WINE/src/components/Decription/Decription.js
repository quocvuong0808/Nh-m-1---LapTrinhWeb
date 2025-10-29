import classNames from "classnames/bind";

import styles from "./Decription.module.scss";
const cx = classNames.bind(styles);
function Decription() {
  return (
    <div className={cx("description-container")}>
      <h2>description</h2>
      <div className={cx("description")}>
        <p>
          Something of a cult legend in Ireland, Redbreast Single Pot Still
          Whiskey is quickly achieving the same elusive status in the U.S. To be
          a single pot still whiskey, malted barley is combined with un-malted
          barley. It was a very traditional method of making whiskey in Ireland
          and although it is no longer common, Redbreast is keeping the
          tradition alive.
        </p>
        <p>
          Prominent vanilla layered around Bananas Foster, drizzled with wild
          honey & freshly picked apples. The palate adds more vanilla with a
          velvety, whipped spice creaminess, rich and layered on the tongue. The
          finish is moderate to long for this full-bodied dram with subtle
          citrus notes followed by dark caramel & more vanilla.
        </p>
      </div>
    </div>
  );
}

export default Decription;