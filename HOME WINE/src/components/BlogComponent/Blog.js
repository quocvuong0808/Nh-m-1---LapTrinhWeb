import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { blogs } from "../../assets/data/Data";

import styles from "./Blog.module.scss";
import SubTitle from "../../shared/SubTitle/SubTitle";
const cx = classNames.bind(styles);
function BlogComponent() {
  
  return (
    <div className={cx("blog-container")}>
      <SubTitle subtitle={"blog"} />
      <div className={cx("blog-list")}>
        {blogs.map((blog, index) => (
          <div className={cx("blog")} key={index}>
            <img src={blog.image} alt=""></img>
            <div className={cx("blog-content")}>
              <Link to="#">{blog.title}</Link>
              <time>{blog.date}</time>
              <p>{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogComponent;
