import classNames from "classnames/bind";

import styles from "./Map.module.scss";
const cx = classNames.bind(styles);
function Map() {
  return (
    <div className={cx("map")}>
      <iframe
        title="My store's map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8956.409145579939!2d-4.272075775872626!3d55.86089171960128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888469f95298201%3A0xda691d9d89d89aa!2zOTg3MCwgNDUgU3QgVmluY2VudCBQbCwgR2xhc2dvdywgVsawxqFuZyBRdeG7kWMgQW5o!5e0!3m2!1svi!2s!4v1713408843496!5m2!1svi!2s"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default Map;
