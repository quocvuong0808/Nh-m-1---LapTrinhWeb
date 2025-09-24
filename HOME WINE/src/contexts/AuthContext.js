import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosJWT from "../config/axiosConfig";

import { toastifyError } from "../shared/Toastify/Toastify";
import { BASE_URL } from "../config/utils";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [expiresAt, setExpiresAt] = useState();
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state?.auth?.user);
  const getAxiosJWT = useAxiosJWT();
  const axiosJWT = getAxiosJWT();
  const getCompareList = async () => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/user/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        withCredentials: true,
      });
      const result = res.data;
      setCompareList(result.data);
    } catch (error) {
      return toastifyError(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getCompareList();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        expiresAt,
        setExpiresAt,
        compareList,
        setCompareList,
        getCompareList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
