import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import CountUp from "react-countup";

import { BiSupport } from "react-icons/bi";
import { FaTruck } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import SubTitle from "../../shared/SubTitle/SubTitle";
import Address from "../../shared/Address/Address";

import styles from "./About.module.scss";
const cx = classNames.bind(styles);
function About() {
  const location = useLocation();
  window.scrollTo(0,0)
  return (
    <section className={cx("about-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("about-us")}>
        <SubTitle subtitle={"about us"} />
        <p className={cx("paragraph")}>
          During the last 5 years, our liquor store has grown to Elitario – a
          company with a lifetime of experience in the elite alcoholic beverage
          distribution industry. We consider it an honor to represent the finest
          producers of wine, beer, and spirits to the people all over the world.
        </p>
        <p>
          Our highly-educated and driven sales staff know all the assortment of
          our store and can advise the best choice for you. We pride ourselves
          in carefully evaluating every potential brand and beverage for
          quality, sales and mutual growth potential before they’re selected for
          a place in our portfolio. With the goal of providing accurate and
          efficient deliveries to our customers, Elitario canvasses the state
          daily in reliable box and refrigerated trucks – from the downtown bars
          and restaurants to retail stores, and just about everywhere in between
        </p>
      </div>
      <div className={cx("count-up")}>
        <div className={cx("group")}>
          <span>
            <CountUp
              start={0}
              end={225}
              delay={0}
              scrollSpyOnce={true}
            ></CountUp>
          </span>
          <p>Distribution Stores</p>
        </div>
        <div className={cx("group")}>
          <span>
            <CountUp
              start={0}
              end={2314}
              delay={0}
              scrollSpyOnce={true}
            ></CountUp>
          </span>
          <p>Bottles in Stock</p>
        </div>
        <div className={cx("group")}>
          <span>
            <CountUp
              start={0}
              end={14}
              delay={0}
              scrollSpyOnce={true}
            ></CountUp>
          </span>
          <p>Kinds of Whisky</p>
        </div>
        <div className={cx("group")}>
          <span>
            <CountUp
              start={0}
              end={632}
              delay={0}
              scrollSpyOnce={true}
            ></CountUp>
          </span>
          <p>Brands of Beverages</p>
        </div>
      </div>
      <div className={cx("about-banner")}>
        <div className={cx("banner")}>
          <i className={cx("delivery")}>
            <FaTruck />
          </i>
          <span>free shipping</span>
          <p>
            Wholesale orders can be shipped free of charge all over the USA and
            Canada (except overseas regions)
          </p>
        </div>
        <div className={cx("banner")}>
          <i className={cx("support")}>
            <BiSupport />
          </i>
          <span>24/7 support</span>
          <p>
            Our Support team will gladly answer all your questions and resolve
            any issues occurred round the clock
          </p>
        </div>
        <div className={cx("banner")}>
          <i className={cx("payment")}>
            <FaCreditCard />
          </i>
          <span>payment process</span>
          <p>
            Any questions regarding payment methods and payment status will be
            handled by our Billing department.
          </p>
        </div>
      </div>
      <div className={cx("skills")}>
        <SubTitle subtitle={"what we can do"} />
        <p>
          We have a rich collections of elite liquors and regularly restock it
          and add new items to our assortment. We sell exclusive beverages
          either to individuals, commercials, supermarkets and wholesale buyers.
        </p>
        <div className={cx("skills-box")}>
          <span>fine wines</span>
          <div className={cx("line")}>
            <div className={cx("value", "first")}>90%</div>
          </div>
        </div>
        <div className={cx("skills-box")}>
          <span>luxury fine spirits</span>
          <div className={cx("line")}>
            <div className={cx("value", "second")}>80%</div>
          </div>
        </div>
        <div className={cx("skills-box")}>
          <span>irish wishky</span>
          <div className={cx("line")}>
            <div className={cx("value", "third")}>70%</div>
          </div>
        </div>
      </div>
      <div className={cx("motto-container")}>
        <div className={cx("motto")}>
          <SubTitle subtitle={"our motto"} />
          <p>
            Good alcohol is something that highlights your individuality and
            status among others. When you feel elite taste, fragrance and
            bouquet you will return to this beverage again and again… So, you
            will return to Elitario and enjoy its exclusive collection!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
