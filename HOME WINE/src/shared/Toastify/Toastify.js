import { toast } from "react-toastify";

export const toastifyWarn = (message) => {
  return toast.warn(message, {
    position: "top-right",
    autoClose: 1500,
    pauseOnHover: false,
  });
};
export const toastifySuccess = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    pauseOnHover: false,
  });
};
export const toastifyError = (error) => {
  return toast.error(error, {
    position: "top-right",
    autoClose: 1500,
    pauseOnHover: false,
  });
};
