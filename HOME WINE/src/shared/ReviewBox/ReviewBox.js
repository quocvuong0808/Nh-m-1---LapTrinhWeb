import classNames from "classnames/bind";

import { FaStar } from "react-icons/fa";
import userImage from "../../assets/images/user.png";

import styles from "./ReviewBox.module.scss";
const cx = classNames.bind(styles);
function ReviewBox({ review }) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return (
    <div className={cx("review-box")}>
      <div className={cx("user-image")}>
        <img src={userImage} alt=""></img>
      </div>
      <div className={cx("review-content")}>
        {[...Array(review.rating).keys()].map((_, index) => (
          <FaStar className={cx("star")} key={index} />
        ))}
        <div>
          <span>{review.username}</span>
          <span> - </span>
          <span>
            {new Date(review.createdAt).toLocaleDateString("en-US", options)}
          </span>
        </div>
        <p>{review.reviewText}</p>
      </div>
    </div>
  );
}

export default ReviewBox;
