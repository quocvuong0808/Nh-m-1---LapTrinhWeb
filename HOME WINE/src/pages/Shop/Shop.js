import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";

import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { FilterContext } from "../../contexts/FilterContext";
import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import { toastifyError } from "../../shared/Toastify/Toastify";
import useAxios from "../../hooks/useAxios";
import Address from "../../shared/Address/Address";
import SideBar from "../../components/SideBar/SideBar";
import ProductBox from "../../shared/ProductBox/ProductBox";

import styles from "./Shop.module.scss";
const cx = classNames.bind(styles);
function Shop() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState("default");
  const { data: wines } = useAxios(`${BASE_URL}/wines?type=${selectedValue}`);
  const [filterWines, setFilterWines] = useState([]);
  const { size, age, setSize, setAge, values, setValues, MIN, MAX } =
    useContext(FilterContext);
  const fetchDB = async () => {
    const id = toast.loading("Filtering...");
    try {
      const res = await fetch(
        `${BASE_URL}/wines/search?size=${size}&age=${age}&min=${values[0]}&max=${values[1]}&type=${selectedValue}`,
        {
          method: "get",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        return toast.update(id, {
          render: result.message,
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      }
      if (result) {
        setFilterWines(result.data);
      }
      result.data.length > 0
        ? toast.update(id, {
            render: result.message,
            type: "success",
            isLoading: false,
            autoClose: 1500,
            className: "transition",
          })
        : toast.update(id, {
            render: "Filter failed",
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
    } catch (error) {
      return toastifyError(error);
    }
  };
  const handleFilter = (e) => {
    e.preventDefault();
    fetchDB();
  };
  const sortFunc = (type) => {
    const arrayToSort = filterWines.length > 0 ? [...filterWines] : [...wines];

    arrayToSort.sort((a, b) => {
      if (type === "default" || type === "a-z") {
        return a.name.localeCompare(b.name); // Sort A to Z
      }
      if (type === "z-a") {
        return b.name.localeCompare(a.name); // Sort Z to A
      }
      if (type === "asc") {
        return Number(a.newPrice) - Number(b.newPrice); // Sort by price: low to high
      }
      if (type === "dsc") {
        return Number(b.newPrice) - Number(a.newPrice); // Sort by price: high to low
      }
      if (type === "popular") {
        return b.star - a.star; // Sort by popularity
      }
      return 0;
    });

    filterWines.length > 0 ? setFilterWines(arrayToSort) : setFilterWines(arrayToSort);
  };
  useEffect(() => {
    sortFunc(selectedValue);
  }, [selectedValue]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);
  
  return (
    <section className={cx("shop-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("shop-container")}>
        <SideBar />
        <div className={cx("shop-content")}>
          <div className={cx("shop-title")}>
            <h2>shop</h2>
          </div>
          <div className={cx("sort")}>
            <form>
              <select
                onChange={(e) => setSelectedValue(e.target.value)}
                value={selectedValue}
              >
                <option value="default">Sort A to Z</option>
                <option value="z-a">Sort Z to A </option>
                <option value="popular">Sort by popularity</option>
                <option value="asc">Sort by price: low to high</option>
                <option value="dsc">Sort by price: high to low</option>
              </select>
              <IoIosArrowDown className={cx("arrow-icon")} />
            </form>
          </div>
          <div className={cx("filter")}>
            <span>Active filters:</span>
            <div className={cx("filter-box", size === 0 ? "none" : "")}>
              <span>Size:</span>
              <div className={cx("value")} onClick={() => setSize(0)}>
                <p>{size}cl</p>
                <IoIosClose />
              </div>
            </div>
            <div className={cx("filter-box", age === 0 ? "none" : "")}>
              <span>Age:</span>
              <div className={cx("value")} onClick={() => setAge(0)}>
                <p>{age} years</p>
                <IoIosClose />
              </div>
            </div>
            <div className={cx("filter-box")}>
              <span>Price:</span>
              <div
                className={cx("value")}
                onClick={() => setValues([MIN, MAX])}
              >
                <p>
                  ${values[0]} - ${values[1]}
                </p>
                <IoIosClose />
              </div>
            </div>
            <button
              type="submit"
              className={cx("search-btn")}
              onClick={handleFilter}
            >
              Search
            </button>
          </div>
          <div className={cx("wine-list")}>
            {filterWines.length > 0
              ? filterWines.map((wine) => (
                  <ProductBox product={wine} key={wine._id} />
                ))
              : wines.map((wine) => (
                  <ProductBox product={wine} key={wine._id} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;