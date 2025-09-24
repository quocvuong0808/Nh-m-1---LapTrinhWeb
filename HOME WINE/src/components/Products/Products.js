import classNames from "classnames/bind";

import useAxios from "../../hooks/useAxios";
import SubTitle from "../../shared/SubTitle/SubTitle";
import ProductBox from "../../shared/ProductBox/ProductBox";
import { BASE_URL } from "../../config/utils";

import styles from "./Products.module.scss";
const cx = classNames.bind(styles);
function Products() {;
  const {data:wines} = useAxios(`${BASE_URL}/wines`)
  const sliceWines = wines.slice(0,8)
  return (
    <div className={cx("product-container")}>
      <SubTitle subtitle={"recent products"} />
      <div className={cx("product-list")}>
        {sliceWines.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
