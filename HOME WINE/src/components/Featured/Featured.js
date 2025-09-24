import classNames from "classnames/bind";

import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../config/utils";
import SubTitle from "../../shared/SubTitle/SubTitle";
import ProductBox from "../../shared/ProductBox/ProductBox";

import styles from "./Featured.module.scss";
const cx = classNames.bind(styles);
function Featured() {
  // const [featured, setFeatured] = useState([]);
  const { data: featured } = useAxios(`${BASE_URL}/wines/featured`);


  return (
    <div className={cx("featured-container")}>
      <SubTitle subtitle={"featured products"} />
      <div className={cx("featured-list")}>
        {featured.map((product, index) => (
          <ProductBox product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Featured;
