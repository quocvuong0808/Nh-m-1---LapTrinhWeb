import { useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { CartContext } from "../../contexts/CartContext";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";
import CartItem from "../CartItem/CartItem";

import styles from "./CartContainer.module.scss";
const cx = classNames.bind(styles);
function CartContainer() {
  const { openCart, setOpenCart, clearProduct, totalPrice, products } =
    useContext(CartContext);

  return (
    <div className={cx("cart-container", openCart ? "" : "close")}>
      <div className={cx("cart-header")}>
        <h3>my cart</h3>
        <FaArrowRight
          className={cx("prev-icon")}
          onClick={() => setOpenCart(false)}
        />
      </div>
      <div className={cx("cart-body")}>
        {products?.map((cartItem, index) => (
          <CartItem item={cartItem.wine} key={index} wine={cartItem} />
        ))}
      </div>
      <div className={cx("cart-footer")}>
        <div className={cx("total-box")}>
          <div className={cx("total")}>
            TOTAL: <p>$ {parseInt(totalPrice).toFixed(2)}</p>
          </div>
          <div className={cx("delete")} onClick={clearProduct}>
            <FaTrashAlt />
          </div>
        </div>
        <div className={cx("pay-box")}>
          <Link to="#" className={cx("view-cart")}>
            View cart
          </Link>
          <Link to="#" className={cx("checkout")}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
