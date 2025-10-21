import { useContext } from "react";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import useAxios from "../../hooks/useAxios";
import Slider from "react-slider";
import Title from "../../shared/Title/Title";
import ProductBox from "../../shared/ProductBox/ProductBox";
import { FilterContext } from "../../contexts/FilterContext";

import styles from "./SideBar.module.scss";
const cx = classNames.bind(styles);

function SideBar() {
  const { size, setSize, age, setAge, values, setValues, MAX, MIN } =
    useContext(FilterContext);
  const { data: topWines } = useAxios(`${BASE_URL}/wines/top-rated`);
  return (
    <aside className={cx("side-bar")}>
      <div className={cx("filter-box")}>
        <Title title={"Filter by Price"} />
        <span>Price</span>
        <Slider
          className={cx("slider")}
          min={MIN}
          max={MAX}
          value={values}
          onChange={setValues}
        />
        <div className={cx("price-box")}>
          <span>${values[0]}</span>
          <span> - </span>
          <span>${values[1]}</span>
        </div>
      </div>
      <div className={cx("filter-size")}>
        <Title title={"Filter by Size"} />
        <ul>
          <li>
            <p
              onClick={() => setSize(25)}
              className={cx(size === 25 ? "active" : "")}
            >
              25 cl
            </p>
          </li>
          <li>
            <p
              onClick={() => setSize(50)}
              className={cx(size === 50 ? "active" : "")}
            >
              50 cl
            </p>
          </li>
          <li>
            <p
              onClick={() => setSize(70)}
              className={cx(size === 70 ? "active" : "")}
            >
              70 cl
            </p>
          </li>
        </ul>
      </div>
      <div className={cx("filter-age")}>
        <Title title={"Filter by Age"} />
        <ul>
          <li>
            <p
              onClick={() => setAge(10)}
              className={cx(age === 10 ? "active" : "")}
            >
              10 years
            </p>
          </li>
          <li>
            <p
              onClick={() => setAge(12)}
              className={cx(age === 12 ? "active" : "")}
            >
              12 years
            </p>
          </li>
          <li>
            <p
              onClick={() => setAge(15)}
              className={cx(age === 15 ? "active" : "")}
            >
              15 years
            </p>
          </li>
          <li>
            <p
              onClick={() => setAge(18)}
              className={cx(age === 18 ? "active" : "")}
            >
              18 years
            </p>
          </li>
        </ul>
      </div>
      <div className={cx("top-rated")}>
        <Title title={"Top rated products"} />
        <div className={cx("top-products")}>
          {topWines.map((wine) => (
            <div key={wine._id}>
              <ProductBox product={wine} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;