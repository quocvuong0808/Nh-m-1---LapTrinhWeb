import { useState } from "react";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { slideDatas } from "../../assets/data/Data";
import lineImg from "../../assets/images/slider-lines.webp";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/autoplay";

import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };
  return (
    <header>
      <Swiper
        onSlideChange={handleSlideChange}
        modules={[Navigation, Autoplay, EffectFade]}
        slidesPerView={1}
        navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2000}
      >
        {slideDatas?.map((data, index) => (
          <SwiperSlide key={index}>
            <div className={cx("slide-container")}>
              <div
                className={cx(
                  "slide-content",
                  activeIndex === index ? "active" : ""
                )}
              >
                <div className={cx("title")}>
                  <h1>{data.title}</h1>
                </div>
                <div className={cx("line")}>
                  <img src={lineImg} alt=""></img>
                </div>
                <div className={cx("desc")}>{data.desc}</div>
                <div className={cx("discount")}>
                  get {parseInt(data.discount)}% off
                </div>
                <div className={cx("button")}>
                  <Link to="#">shop now</Link>
                </div>
              </div>
              <div className={cx("slide-image")}>
                <img src={data.image} alt=""></img>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* slide buttons */}
        <div className={cx("slide-buttons")}>
          <div className={cx("slide-button", "prev-button")}>
            <GoChevronLeft />
          </div>
          <div className={cx("slide-button", "next-button")}>
            <GoChevronRight />
          </div>
        </div>
      </Swiper>
    </header>
  );
}

export default Header;
