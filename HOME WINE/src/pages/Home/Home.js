import { useEffect } from "react";
import classNames from "classnames/bind";

import Header from "../../components/Header/Header";
import Brand from "../../components/Brand/Brand";
import Banner from "../../components/Banner/Banner";
import Products from "../../components/Products/Products";
import BlogComponent from "../../components/BlogComponent/Blog";
import Featured from "../../components/Featured/Featured";
import Choose from "../../components/Choose/Choose";
import Testimonial from "../../components/Testimonial/Testimonial";
import { useSelector } from "react-redux";

import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
function Home() {
  const user = useSelector((state) => state?.auth.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user?.username]);
  return (
    <section className={cx("home-section")}>
      <Header />
      <Brand />
      <Banner />
      <Products />
      <BlogComponent />
      <Featured />
      <Choose />
      <Testimonial />
    </section>
  );
}
export default Home;