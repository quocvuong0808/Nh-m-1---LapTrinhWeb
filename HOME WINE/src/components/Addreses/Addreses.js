import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import classNames from "classnames/bind";

import { BASE_URL } from "../../config/utils";
import { toastifyError, toastifySuccess } from "../../shared/Toastify/Toastify";
import useAxiosJWT from "../../config/axiosConfig";
import Form from "../../shared/Form/Form";

import styles from "./Addreses.module.scss";
const cx = classNames.bind(styles);
function Addresses() {
  const user = useSelector((state) => state.auth?.user);
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setOpen(true);
  };
  const handleAdd = () => {
    setCurrentAddress(null);
    setOpen(true);
  };
  const fetchData = async () => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/address`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      setAddressList(result.data);
    } catch (error) {
      return toastifyError(error?.response?.data?.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axiosJWT.delete(`${BASE_URL}/address/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      if (result) {
        fetchData();
      }
    } catch (error) {
      return toastifyError(error?.response?.data?.message);
    }
  };
  const handleDefault = async (id) => {
    try {
      const res = await axiosJWT.post(
        `${BASE_URL}/address/update/${id}`,
        JSON.stringify({ addressDefault: true }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result) {
        fetchData()
      }
    } catch (error) {
      toastifyError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={cx("addresses")}>
      <div className={cx("account-title")}>
        <h2>my addresses</h2>
        <span onClick={handleAdd}>
          <FaPlus />
          add new address
        </span>
      </div>
      <h1>Addreses</h1>
      <div className={cx("address-list")}>
        {addressList.map((address) => (
          <div className={cx("address-box")} key={address._id}>
            <div className={cx("address-info")}>
              <div className={cx("name-phone")}>
                <h2>{address?.fullName}</h2>
                <p>{address?.phone}</p>
              </div>
              <p>{address?.streetName}</p>
              <p>{address?.cityName}</p>
              {address?.addressDefault ? <span>default</span> : <></>}
            </div>
            <div className={cx("address-btn")}>
              <div>
                <p onClick={() => handleEdit(address)}>edit</p>
                {address?.addressDefault ? (
                  <></>
                ) : (
                  <p onClick={() => handleDelete(address._id)}>delete</p>
                )}
              </div>
              <span
                style={
                  address?.addressDefault
                    ? { cursor: "not-allowed", opacity: "0.7" }
                    : {}
                }
                onClick={() => handleDefault(address._id)}
              >
                set as default
              </span>
            </div>
          </div>
        ))}
      </div>
      <Form
        open={open}
        setOpen={setOpen}
        refetchData={fetchData}
        address={currentAddress}
      />
    </div>
  );
}

export default Addresses;