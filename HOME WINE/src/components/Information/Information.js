import classNames from "classnames/bind";

import styles from "./Information.module.scss";
const cx = classNames.bind(styles);
function Information() {
  return (
    <div className={cx("info-container")}>
      <h2>additional information</h2>
      <table>
        <tbody>
          <tr>
            <th>cask-type:</th>
            <td>Bourbon</td>
          </tr>
          <tr>
            <th>age:</th>
            <td>10 years</td>
          </tr>
          <tr>
            <th>size:</th>
            <td>25cl, 50cl, 75cl</td>
          </tr>
          <tr>
            <th>strength:</th>
            <td>46% Vol</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Information;