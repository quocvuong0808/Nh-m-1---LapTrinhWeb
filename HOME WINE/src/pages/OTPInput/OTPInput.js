import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { toastifySuccess, toastifyError } from "../../shared/Toastify/Toastify";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../config/utils";
import Address from "../../shared/Address/Address";

import styles from "./OTPInput.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);
function OTPInput() {
  const { email, expiresAt } = useContext(AuthContext);
  const input1Ref = useRef();
  const navigate = useNavigate();
  const timer = Math.floor(
    (new Date(expiresAt).getTime() - new Date().getTime()) / 1000
  );
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(timer);
  const [toggle, setToggle] = useState(false);
  const [values, setValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const otp = Number(Object.values(values).join(""));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {
    if (time === 0) {
      setToggle(true);
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/otp/check`,
        JSON.stringify({ otp, email }),
        {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result) {
        toastifySuccess(result.message);
        setLoading(false);
        navigate("/change");
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error.response?.data?.message);
    }
  };
  const resendOTP = async () => {
    const id = toast.loading("Loading...", { pauseOnHover: false });
    try {
      const res = await axios.post(
        `${BASE_URL}/otp/send`,
        JSON.stringify({ email }),
        {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.data) {
        toast.update(id, {
          type: "success",
          render: result.message,
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
        setToggle(false);
        setTime(60);
        setValues({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        });
        input1Ref.current.focus();
      }
    } catch (error) {
      return toast.update(id, {
        type: "success",
        render: error.message,
        isLoading: false,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };
  return (
    <section className={cx("form-section")}>
      <Address address={"otp input"} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>Email Verification</h1>
          <p>We have sent a code to {email}</p>
          <div className={cx("input-otp")}>
            <div className={cx("input-box")}>
              <input
                name="input1"
                value={values.input1}
                type="number"
                onChange={handleChange}
                ref={input1Ref}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                name="input2"
                value={values.input2}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                name="input3"
                value={values.input3}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
            <div className={cx("input-box")}>
              <input
                name="input4"
                value={values.input4}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className={cx("button")}>
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
                "Verify Account"
              )}
            </button>
          </div>
          <div className={cx("timer")}>
            {toggle ? (
              <p>
                Didn't have code? <span onClick={resendOTP}>Resend</span>
              </p>
            ) : (
              <p>
                Code will expire in{" "}
                <span style={{ textDecoration: "none" }}>{time}s</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default OTPInput;