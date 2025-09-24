import classNames from "classnames/bind";

import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "../../assets/data/Data";
import SubTitle from "../../shared/SubTitle/SubTitle";

import styles from "./Testimonial.module.scss";
const cx = classNames.bind(styles);
function Testimonial() {
  const breakpoints = {
    1024: {
      spaceBetween: 50,
      slidesPerView: 3,
    },
    800: {
      spaceBetween: 100,
      slidesPerView: 2,
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
  return (
    <div className={cx("testimonial-container")}>
      <SubTitle subtitle={"memberlist"} />
      <div className={cx("testimonial-list")}>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          loop={true}
          breakpoints={breakpoints}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className={cx("testimonial-box")}>
                <div className={cx("testimonial-desc")}>
                  <p>{testimonial.desc}</p>
                </div>
                <div className={cx("testimonial-info")}>
                  <div className={cx("avatar")}>
                    <img src={testimonial.avatar} alt=""></img>
                  </div>
                  <div className={cx("info")}>
                    <span className={cx("name")}>{testimonial.name}</span>
                    <span className={cx("job")}>{testimonial.job}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonial;
