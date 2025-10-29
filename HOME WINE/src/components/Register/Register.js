import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerError,
} from "../../redux/authSlice";
import classNames from "classnames/bind";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import {
  toastifyError,
  toastifyWarn,
  toastifySuccess,
} from "../../shared/Toastify/Toastify";
import { BASE_URL } from "../../config/utils";
import Address from "../../shared/Address/Address";

import styles from "./Register.module.scss";
const cx = classNames.bind(styles);
function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(state=>state?.auth?.isLoading)
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: 0,
    age: 0,
  });
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      if (
        user.username === "" ||
        user.email === "" ||
        user.password === "" ||
        user.phone === "" ||
        user.age === ""
      ) {
        return toastifyWarn("All fields are required");
      }
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = res.data;
      if (result.data) {
        toastifySuccess(result.message);
      }
      dispatch(registerSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(registerError());
      toastifyError(error.response?.data?.message);
    }
  };

  return (
    <section className={cx("form-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>register</h1>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="UserName"
              id="username"
              required
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              id="email"
              required
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              id="password"
              required
            ></input>
            {showPass ? (
              <FaEye
                className={cx("icon-eye")}
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <FaEyeSlash
                className={cx("icon-eye")}
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
          <div className={cx("input-box")}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              minLength={10}
              id="phone"
              required
            ></input>
            <input
              onChange={handleChange}
              type="number"
              placeholder="Age"
              id="age"
              min={18}
              required
            ></input>
          </div>
          <div className={cx("input-box")}>
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
                "Register"
              )}
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;