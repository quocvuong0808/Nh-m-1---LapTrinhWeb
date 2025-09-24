/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toastifyError } from "../shared/Toastify/Toastify";
import axios from "axios";

const useAxios = (url, method = "get", payload = null, headers = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefetch, setIsRefetch] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      const config = { headers };
      if (method === "get") {
        res = await axios.get(url, config);
      } else if (method === "post") {
        res = await axios.post(url, payload, config);
      } else {
        throw new Error("Unsupported method");
      }
      const result = res.data;
      setData(result.data);
      setLoading(false);
    } catch (error) {
      toastifyError(error?.response?.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isRefetch) {
      fetchData();
      setIsRefetch(false);
    }
  }, [isRefetch, fetchData]);
  const refetch = () => {
    setIsRefetch(true);
  };
  return { data, loading, refetch };
};

export default useAxios;
