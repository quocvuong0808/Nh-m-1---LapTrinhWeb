import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toastifyError } from "../../shared/Toastify/Toastify";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { FaTrash, FaStar } from "react-icons/fa";
import { BASE_URL } from "../../config/utils";
import useAxiosJWT from "../../config/axiosConfig";
import Address from "../../shared/Address/Address";

import styles from "./Compare.module.scss";
const cx = classNames.bind(styles);
function Compare() {
  const { compareList, getCompareList } = useContext(AuthContext);
  const user = useSelector((state) => state?.auth?.user);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const handleRemoveCompareList = async (id) => {
    try {
      await axiosJWT.post(
        `${BASE_URL}/compare/remove`,
        { wineId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      );
      getCompareList();
    } catch (error) {
      return toastifyError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("compare-section")}>
      <Address address={"compare"} />
      <div className={cx("compare-content")}>
        <h3>product comparison</h3>
        <div className={cx("table-container")}>
          <table style={compareList.length === 1 ? { width: "60%" } : {}}>
            <tbody>
              <tr className={cx("remove-item")}>
                <th>remove</th>
                {compareList.map((compare, index) => (
                  <td key={index}>
                    <span onClick={() => handleRemoveCompareList(compare._id)}>
                      <FaTrash style={{ cursor: "pointer" }} />
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={cx("product-image")}>
                <th>product image</th>
                {compareList.map((compare, index) => (
                  <td key={index}>
                    <Link to="#" className={cx("image-container")}>
                      <img src={compare?.image} alt=""></img>
                    </Link>
                  </td>
                ))}
              </tr>
              <tr className={cx("product-name")}>
                <th>product name</th>
                {compareList.map((compare, index) => (
                  <td key={index}>{compare?.name}</td>
                ))}
              </tr>
              <tr className={cx("rate")}>
                <th>rate</th>
                {compareList.map((compare) => (
                  <td key={compare._id}>
                    {[...Array(compare?.star).keys()].map((_, index) => (
                      <FaStar key={index} style={{ color: "#b1b1b1" }} />
                    ))}
                  </td>
                ))}
              </tr>
              <tr className={cx("size")}>
                <th>size</th>
                {compareList.map((compare, index) => (
                  <td key={index}>{compare?.size}cl</td>
                ))}
              </tr>
              <tr className={cx("age")}>
                <th>age</th>
                {compareList.map((compare, index) => (
                  <td key={index}>{compare?.age} years</td>
                ))}
              </tr>
              <tr className={cx("price")}>
                <th>price</th>
                {compareList.map((compare, index) => (
                  <td key={index}>
                    $ {parseInt(compare?.newPrice).toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className={cx("stock-status")}>
                <th>stock status</th>
                {compareList.map((_, index) => (
                  <td key={index}>#</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Compare;