import { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { FaUser } from "react-icons/fa6";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import {
  IoMdNotifications,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { GiTwoCoins } from "react-icons/gi";
import Profile from "../../components/Profile/Profile";
import userImg from "../../assets/images/user.png";
import Address from "../../shared/Address/Address";
import Addresses from "../../components/Addreses/Addreses";

import styles from "./MyAccount.module.scss";
const cx = classNames.bind(styles);
function MyAccount() {
  const user = useSelector((state) => state.auth?.user);
  const [option, setOption] = useState("profile");
  const [click, setClick] = useState(false);
  return (
    <section className={cx("account-section")}>
      <Address address={"my account"} />
      <div className={cx("account-container")}>
        <aside className={cx("account-sidebar")}>
          <div className={cx("top")}>
            <div className={cx("user-image")}>
              <img src={user?.avatar ? user?.avatar : userImg} alt=""></img>
            </div>
            <span>{user?.username ? user?.username : "User"}</span>
          </div>
          <div className={cx("bottom")}>
            <ul className={cx("options")}>
              <div className={cx("links")}>
                <div
                  className={cx("main-link")}
                  onClick={() => setClick((prev) => !prev)}
                >
                  <FaUser className={cx("icon")} />
                  <p>my account</p>
                  {click ? (
                    <IoMdArrowDropup
                      className={cx("menu-icon")}
                      style={{ fontSize: "20px" }}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      className={cx("menu-icon")}
                      style={{ fontSize: "20px" }}
                    />
                  )}
                </div>
                <div className={cx("sub-link", click ? "open" : "")}>
                  <li
                    onClick={() => setOption("profile")}
                    className={cx(option === "profile" ? "active" : "")}
                  >
                    profile
                  </li>
                  <li
                    onClick={() => setOption("address")}
                    className={cx(option === "address" ? "active" : "")}
                  >
                    addresses
                  </li>
                </div>
              </div>
              <div className={cx("links")}>
                <div className={cx("main-link")}>
                  <BiSolidPurchaseTagAlt className={cx("icon")} />
                  <p>my purchase</p>
                </div>
              </div>
              <div className={cx("links")}>
                <div className={cx("main-link")}>
                  <IoMdNotifications className={cx("icon")} />
                  <p>notifications</p>
                </div>
              </div>
              <div className={cx("links")}>
                <div className={cx("main-link")}>
                  <BsFillTicketPerforatedFill className={cx("icon")} />
                  <p>my voucher</p>
                </div>
              </div>
              <div className={cx("links")}>
                <div className={cx("main-link")}>
                  <GiTwoCoins className={cx("icon")} />
                  <p>my coins</p>
                </div>
              </div>
            </ul>
          </div>
        </aside>
        <div className={cx("account-content")}>
          {option === "profile" && <Profile />}
          {option === "address" && <Addresses />}
        </div>
      </div>
    </section>
  );
}

export default MyAccount;