import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { toastifySuccess, toastifyError } from "../../shared/Toastify/Toastify";
import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";

import { BASE_URL } from "../../config/utils";
import useAxios from "../../hooks/useAxios";
import useAxiosJWT from "../../config/axiosConfig";
import ReviewBox from "../../shared/ReviewBox/ReviewBox";

import styles from "./Review.module.scss";
const cx = classNames.bind(styles);
function Review({ name, id }) {
  const { data: wine, refetch } = useAxios(`${BASE_URL}/wines/${id}`);
  const user = useSelector((state) => state.auth?.user);
  const reviewRef = useRef();
  const usernameRef = useRef();
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewRef.current.value;
    const username = usernameRef.current.value;
    setLoading(true);
    try {
      const reviewObj = {
        username: username,
        reviewText: reviewText,
        rating: rating,
      };
      const res = await axiosJWT.post(
        `${BASE_URL}/reviews/${id}`,
        JSON.stringify(reviewObj),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.data) {
        setLoading(false);
        toastifySuccess("Review Submitted");
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error.response?.data?.message);
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className={cx("review-container")}>
      <h2>
        {wine?.reviews?.length} Reviews {name}
      </h2>
      <div className={cx("review-list")}>
        {wine?.reviews?.map((review, index) => (
          <ReviewBox key={index} review={review} />
        ))}
      </div>
      <h2>Add a review</h2>
      <p className={cx("email")}>
        Your email address will not be published. Required fields are marked *
      </p>
      <div className={cx("rate-box")}>
        <p>Your rating:</p>
        {[...Array(5).keys()].map((_, index) => {
          index += 1;
          return (
            <span
              key={index}
              onClick={() => setRating(index)}
              onMouseOver={() => setHover(index)}
              onMouseOut={() => setHover(rating)}
              className={cx(index <= hover || index <= rating ? "active" : "")}
            >
              <FaStar key={index} />
            </span>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={cx("input-box")}>
          <label>Your name:</label>
          <input ref={usernameRef}></input>
        </div>
        <div className={cx("input-box")}>
          <label>Your review:</label>
          <textarea cols={45} rows={8} ref={reviewRef}></textarea>
        </div>
        <div className={cx("input-box")}>
          <button type="submit">
            {loading ? (
              <ClipLoader
                color="var(--dark-color)"
                cssOverride={{}}
                loading
                size={13}
                speedMultiplier={1}
              />
            ) : (
              "submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Review;