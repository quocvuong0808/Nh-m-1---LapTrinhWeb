import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaMap, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";

import { BASE_URL } from "../../config/utils";
import {
  toastifyError,
  toastifySuccess,
  toastifyWarn,
} from "../../shared/Toastify/Toastify";
import useAxiosJWT from "../../config/axiosConfig";
import Address from "../../shared/Address/Address";
import SubTitle from "../../shared/SubTitle/SubTitle";
import Map from "../../shared/Map/Map";

import styles from "./Contacts.module.scss";
const cx = classNames.bind(styles);
function Contacts() {
  const user = useSelector((state) => state.auth?.user);

  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const location = useLocation();
  const inputRef = useRef();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        contact.name === "" ||
        contact.email === "" ||
        contact.message === ""
      ) {
        return toastifyWarn("All fields are required");
      }
      const res = await axiosJWT.post(
        `${BASE_URL}/contact`,
        JSON.stringify(contact),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (res.status >= 200 && res.status < 300) {
        setLoading(false);
        toastifySuccess(result.message);
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error.response?.data?.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);
  return (
    <section className={cx("contact-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("contact-us")}>
        <SubTitle subtitle={"contact us"} />
        <p>
          We are always ready to help you. There are many ways to contact us.
          You may drop us a line, give us a call or send an email, choose what
          suits you most.
        </p>
      </div>
      <div className={cx("info-container")}>
        <div className={cx("info")}>
          <div className={cx("info-box")}>
            <div className={cx("top")}>
              <FaMap className={cx("icon")} />
              <span>address</span>
            </div>
            <p>
              The Company Name Inc. 9870 St Vincent Place, Glasgow, DC 45 Fr 45.
            </p>
          </div>
          <div className={cx("info-box")}>
            <div className={cx("top")}>
              <FaPhoneAlt className={cx("icon")} />
              <span>phone</span>
            </div>
            <p>+1 800 603 6035</p>
          </div>
          <div className={cx("info-box")}>
            <div className={cx("top")}>
              <MdOutlineMail className={cx("icon")} />
              <span>email</span>
            </div>
            <p>example@gmail.com</p>
          </div>
        </div>
        <div className={cx("form")}>
          <Map />
          <form onSubmit={handleSubmit}>
            <h1>Get in Touch</h1>
            <div className={cx("input-box")}>
              <input
                type="text"
                placeholder="Name"
                id="name"
                onChange={handleChange}
                ref={inputRef}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                ref={inputRef}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <textarea
                cols="40"
                rows="10"
                type="text"
                placeholder="Here goes your message"
                id="message"
                onChange={handleChange}
                ref={inputRef}
              ></textarea>
            </div>
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
                "send message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacts;