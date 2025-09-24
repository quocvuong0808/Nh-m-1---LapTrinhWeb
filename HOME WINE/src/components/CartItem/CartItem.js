import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";

import styles from "./CartItem.module.scss";
import { useContext } from "react";
const cx = classNames.bind(styles);
function CartItem({ item, wine }) {
  const { increaseProduct, decreaseProduct, removeProduct } =
    useContext(CartContext);
  const words = item.name.split(" ");
  const name = words.slice(0, 4).join(" ");
  return (
    <div className={cx("cart")}>
      <Link to="#">
        <img src={item.image} alt="" className={cx("cart-image")}></img>
      </Link>
      <div className={cx("cart-content")}>
        <div className={cx("cart-title")}>
          <Link to="#">{name} ...</Link>
          <IoIosClose
            className={cx("delete-icon")}
            onClick={() => removeProduct(item._id)}
          />
        </div>
        <div className={cx("price-container")}>
          <div className={cx("amount")}>
            <div
              className={cx("minus")}
              onClick={() => decreaseProduct(item._id)}
            >
              <FaMinus />
            </div>
            <div className={cx("number")}>{wine.quantity}</div>
            <div
              className={cx("plus")}
              onClick={() => increaseProduct(item._id)}
            >
              <FaPlus />
            </div>
          </div>
          <div className={cx("item-price")}>
            <p className={cx("price")}>
              $ {parseInt(item.newPrice).toFixed(2)}
            </p>
          </div>
          <div className={cx("total-price")}>
            <p className={cx("price")}>
              $ {parseInt(item.newPrice * wine.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
