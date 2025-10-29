import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";

import { BASE_URL } from "../../config/utils";
import { icons } from "../../assets/data/Data";
import {
  FaStar,
  FaShoppingCart,
  FaBalanceScale,
  FaHeart,
} from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";
import Description from "../../components/Decription/Decription";
import Informaion from "../../components/Information/Information";
import Review from "../../components/Review/Review";
import Address from "../../shared/Address/Address";
import useAxios from "../../hooks/useAxios";
import ProductBox from "../../shared/ProductBox/ProductBox";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from "./WineDetail.module.scss";
const cx = classNames.bind(styles);
function WineDetail() {
  const [active, setActive] = useState("desc");
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart, loading } = useContext(CartContext);
  const { id } = useParams();
  const breakpoints = {
    1024: {
      spaceBetween: 50,
      slidesPerView: 4,
    },
    800: {
      spaceBetween: 100,
      slidesPerView: 3,
    },
    700: {
      spaceBetween: 100,
      slidesPerView: 2,
    },
    600: {
      spaceBetween: 100,
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    300: {
      slidesPerView: 1,
    },
    200: {
      slidesPerView: 1,
    },
    100: {
      slidesPerView: 1,
    },
  };
  const { data: wineDetail } = useAxios(`${BASE_URL}/wines/${id}`);
  const { data: wines } = useAxios(`${BASE_URL}/wines`);

  const randomWines = (wines) => {
    const shuffled = [...wines];
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  };
  const getRandomWines = randomWines(wines);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <section className={cx("wine-section")}>
      <Address address={wineDetail?.name} />
      <div className={cx("wine-detail")}>
        <div className={cx("wine-container")}>
          <div className={cx("wine-image")}>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              modules={[Navigation, Pagination]}
              pagination={{ el: ".swiper-pagination", clickable: true }}
            >
              {wineDetail?.detailImage?.map((image, index) => (
                <SwiperSlide key={index}>
                  <TransformWrapper initialScale={1}>
                    <TransformComponent>
                      <img src={image} alt="" className={cx("image")}></img>
                    </TransformComponent>
                  </TransformWrapper>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={cx("swiper-pagination")}></div>
            <ul
              className={cx(
                "sub-image",
                wineDetail?.detailImage?.length <= 1 ? "disappear" : ""
              )}
            >
              {wineDetail?.detailImage?.map((image, idnex) => (
                <li key={idnex}>
                  <img src={image} alt=""></img>
                </li>
              ))}
            </ul>
          </div>
          <div className={cx("wine-info")}>
            {wineDetail?.isSale ? (
              <span className={cx("sale-tag")}>Sale!</span>
            ) : (
              ""
            )}
            <h1>{wineDetail?.name}</h1>
            <div className={cx("price")}>
              {wineDetail?.isSale ? (
                <span className={cx("price")}>
                  ${parseInt(wineDetail?.price).toFixed(2)}
                </span>
              ) : (
                ""
              )}
              <span className={cx("new-price")}>
                ${parseInt(wineDetail?.newPrice).toFixed(2)}
              </span>
            </div>
            <div className={cx("rate-box")}>
              <div className={cx("star-box")}>
                {[...Array(wineDetail?.star).keys()].map((_, index) => (
                  <FaStar className={cx("star")} key={index} />
                ))}
              </div>
              <p>({wineDetail?.reviews?.length} customer reviews)</p>
            </div>
            <p>
              If you are a true alcohol expert – on the website you’ll find a
              detailed description of the flavours that will also help you make
              the best decision possible.
            </p>
            <div className={cx("option-box")}>
              <p>Size:</p>
              <select>
                <option>Choose an option</option>
                <option>25cl</option>
                <option>50cl</option>
                <option>70cl</option>
              </select>
            </div>
            <div className={cx("add-box")}>
              <input
                type="number"
                min={1}
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
              <button onClick={() => handleAddToCart(id, quantity)}>
                <i>
                  {loading ? (
                    <ClipLoader
                      color="var(--primary-color)"
                      cssOverride={{}}
                      loading
                      size={13}
                      speedMultiplier={1}
                    />
                  ) : (
                    <FaShoppingCart />
                  )}
                </i>
                add to cart
              </button>
            </div>
            <div className={cx("buttons")}>
              <div className={cx("button", "compare-button")}>
                <FaBalanceScale />
                <span>add to compare</span>
              </div>
              <div className={cx("button", "wishlist-button")}>
                <FaHeart />
                <span>add to wishlist</span>
              </div>
            </div>
            <div className={cx("icons")}>
              {icons.map((icon, index) => (
                <Link key={index} to={icon.link}>
                  <icon.name />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("wine-options")}>
          <span
            onClick={() => setActive("desc")}
            className={cx(active === "desc" ? "active" : "")}
          >
            {" "}
            description{" "}
          </span>
          <span
            onClick={() => setActive("info")}
            className={cx(active === "info" ? "active" : "")}
          >
            {" "}
            additional information
          </span>
          <span
            onClick={() => setActive("review")}
            className={cx(active === "review" ? "active" : "")}
          >
            {" "}
            reviews ({wineDetail?.reviews?.length})
          </span>
        </div>
        <div className={cx("wine-content")}>
          {active === "desc" && <Description />}
          {active === "info" && <Informaion />}
          {active === "review" && <Review name={wineDetail?.name} id={id} />}
        </div>
        <div className={cx("related-wine")}>
          <h2>related products</h2>
          <div className={cx("wine-list")}>
            <Swiper
              spaceBetween={50}
              slidesPerView={4}
              loop={true}
              modules={[Navigation]}
              breakpoints={breakpoints}
            >
              {getRandomWines.map((wine) => (
                <SwiperSlide key={wine._id}>
                  <ProductBox product={wine} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WineDetail;