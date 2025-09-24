import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";

import { BASE_URL } from "../../config/utils";
import { toastifyError, toastifySuccess } from "../Toastify/Toastify";
import useAxiosJWT from "../../config/axiosConfig";

import styles from "./Form.module.scss";
const cx = classNames.bind(styles);
function Form({ open, setOpen, refetchData = {}, address }) {
  const user = useSelector((state) => state.auth?.user);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("home");
  const [isChecked, setIsChecked] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    fullName: "",
    cityName: "",
    streetName: "",
    phone: "",
    label: label,
    addressDefault: isChecked,
  });

  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const handleChange = (e) => {
    setAddressInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/address/add`,
        JSON.stringify(addressInfo),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result) {
        setLoading(false);
        setOpen(false);
        toastifySuccess(result.message);
        refetchData();
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error?.response?.data?.message);
    }
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/address/update/${address?._id}`,
        JSON.stringify(addressInfo),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result) {
        setLoading(false);
        setOpen(false);
        toastifySuccess(result.message);
        refetchData();
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (address) {
      setLabel(address.label);
      setIsChecked(address.addressDefault);
      setAddressInfo({
        fullName: address.fullName,
        cityName: address.cityName,
        streetName: address.streetName,
        phone: address.phone,
        label: address.label,
        addressDefault: address.addressDefault,
      });
    } else {
      setLabel("home");
      setIsChecked(false);
      setAddressInfo({
        fullName: "",
        cityName: "",
        streetName: "",
        phone: "",
        label: "home",
        addressDefault: false,
      });
    }
  }, [address]);

  useEffect(() => {
    setAddressInfo((prev) => ({ ...prev, label: label }));
  }, [label]);
  
  useEffect(() => {
    setAddressInfo((prev) => ({ ...prev, addressDefault: isChecked }));
  }, [isChecked]);
  
  return (
    <div className={cx("form-page", open ? "active" : "")}>
      <form onSubmit={address ? handleSubmitUpdate : handleSubmitAdd}>
        <div className={cx("first-line")}>
          <div className={cx("input-box", "half")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              value={addressInfo.fullName}
            ></input>
          </div>
          <div className={cx("input-box", "half")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Phone Number"
              id="phone"
              required
              value={addressInfo.phone}
            ></input>
          </div>
        </div>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="City, District, Ward"
            id="cityName"
            required
            value={addressInfo.cityName}
          ></input>
        </div>
        <div className={cx("input-box")}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Street name, Building, Home number, ..."
            id="streetName"
            required
            value={addressInfo.streetName}
          ></input>
        </div>
        <label>Label as:</label>
        <div className={cx("tag")}>
          <span
            onClick={() => setLabel("home")}
            className={cx(addressInfo.label === "home" ? "active" : "")}
          >
            home
          </span>
          <span
            onClick={() => setLabel("work")}
            className={cx(addressInfo.label === "work" ? "active" : "")}
          >
            work
          </span>
        </div>
        <div
          className={cx("checkbox-container")}
          style={
            address?.addressDefault !== undefined
              ? { cursor: "not-allowed", opacity: ".7" }
              : {}
          }
        >
          <input
            type="checkbox"
            value={addressInfo.addressDefault}
            onChange={(e) => setIsChecked(e.target.checked)}
          ></input>
          <p>set as default address</p>
        </div>
        <div className={cx("buttons")}>
          <button type="button" onClick={() => setOpen((prev) => !prev)}>
            cancel
          </button>
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

export default Form;
