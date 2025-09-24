import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { toastifyError } from "../../shared/Toastify/Toastify";
import { FaRegHeart } from "react-icons/fa";
import ProductBox from "../../shared/ProductBox/ProductBox";
import useAxiosJWT from "../../config/axiosConfig";

import styles from "./WishList.module.scss";

const cx = classNames.bind(styles);
function WishList() {
  const user = useSelector((state) => state.auth?.user);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const getFavorites = async () => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/favorite/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      setFavoriteItems(result.data);
    } catch (error) {
      return toastifyError(error.response?.data?.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites();
  }, [user?.username]);

  
  return (
    <section className={cx("wishlist-section")}>
      <div className={cx("wishlist-container")}>
        {user?.username && favoriteItems.length > 0 ? (
          <div className={cx("wishlist-product")}>
            {favoriteItems.map((favorite) => (
              <ProductBox
                refetchData={getFavorites}
                product={favorite.wineId}
                key={favorite._id}
              />
            ))}
          </div>
        ) : (
          <div className={cx("empty-container")}>
            <div className={cx("empty-content")}>
              <span className={cx("heart-icon")}>
                <FaRegHeart />
              </span>
              <h1>Wishlist is empty.</h1>
              <p>
                You don't have any products in the wishlist yet. <br></br> You
                will find a lot of interesting products on our "Shop" page.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WishList;
