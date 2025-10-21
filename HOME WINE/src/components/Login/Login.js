import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { loginStart, loginSuccess, loginFailed } from "../../redux/authSlice";

import { BASE_URL } from "../../config/utils";
import {
  toastifyError,
  toastifySuccess,
  toastifyWarn,
} from "../../shared/Toastify/Toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Address from "../../shared/Address/Address";

import styles from "./Login.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.isLoading);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      if (user.email === "" || user.password === "") {
        return toastifyWarn("All fields are requied");
      }
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      dispatch(loginSuccess(result.data));
      if (result) {
        toastifySuccess("Login success");
      }
      navigate("/");
    } catch (error) {
      dispatch(loginFailed());
      toastifyError(error.response?.data?.message);
    }
  };
  return (
    <section className={cx("form-section")}>
      <Address address={"login"} />
      <div className={cx("form-container")}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={cx("input-box")}>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              id="email"
            ></input>
          </div>
          <div className={cx("input-box")}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              id="password"
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
          <div className={cx("remember-forgot")}>
            <div className={cx("remember")}>
              <input type="checkbox"></input>
              <p>Remember me</p>
            </div>
            <div className={cx("forgot")}>
              <Link to="/recovery-email">Forgot password</Link>
            </div>
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
                "Login"
              )}
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;