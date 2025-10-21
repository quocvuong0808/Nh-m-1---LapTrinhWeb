import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config/utils";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames/bind";

import { loginSuccess } from "../../redux/authSlice";
import { toastifyError, toastifySuccess } from "../../shared/Toastify/Toastify";
import useAxiosJWT from "../../config/axiosConfig";
import userImg from "../../assets/images/user.png";

import styles from "./Profile.module.scss";
const cx = classNames.bind(styles);
function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [information, setInformation] = useState({
    username: user?.username,
    phone: user?.phone,
    email: user?.email,
    age: user?.age,
  });
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleChange = (e) => {
    setInformation((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", information.email);
    formData.append("username", information.username);
    formData.append("age", information.age);
    formData.append("phone", information.phone);
    formData.append("avatar", file);
    try {
      const res = await axiosJWT.put(
        `${BASE_URL}/user/${user?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      const refreshUser = { ...result.data, accessToken: user?.accessToken };
      if (result.data) {
        dispatch(loginSuccess(refreshUser));
        setLoading(false);
        toastifySuccess(result.message);
        setUrl(null);
      }
    } catch (error) {
      setLoading(false);
      toastifyError(error.response?.data?.message);
    }
  };
  return (
    <div className={cx("profile")}>
      <div className={cx("account-title")}>
        <h2>my profile</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={cx("form-container")}>
          <div className={cx("left")}>
            <div className={cx("input-box")}>
              <label>user name</label>
              <input
                type="text"
                value={information.username}
                id="username"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className={cx("input-box")}>
              <label>email</label>
              <input
                type="text"
                value={information.email}
                id="email"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className={cx("input-box")}>
              <label>phone number</label>
              <input
                type="text"
                value={information.phone}
                id="phone"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className={cx("input-box")}>
              <label>age</label>
              <input
                type="number"
                value={information.age}
                id="age"
                min={0}
                required
                onChange={handleChange}
              ></input>
            </div>
            <div
              className={cx("input-box")}
              style={{ justifyContent: "center" }}
            ></div>
          </div>
          <div className={cx("right")}>
            <img src={url ? url : userImg} alt=""></img>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
            ></input>
          </div>
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
            "save"
          )}
        </button>
      </form>
    </div>
  );
}

export default Profile;