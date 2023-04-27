import axios from "axios";
import { toast } from "react-toastify";

export const withToken = (file) => {
  const { token } = JSON.parse(localStorage.getItem("archa_admin_token") || "");
  return {
    headers: {
      "Content-Type": file ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  };
};

export const getErrorMessage = (e) => {
  const { response = {} } = e;
  const { data = {} } = response;
  const { message = "Internal server error!" } = data;
  return message;
};

export const notify = (message, type) => {
  if (type === "success") {
    return toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  } else if (type === "error") {
    return toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  }
};

// export const redirectToLogin = (message) => {
//     notify(message, 'error');
//     window.localStorage.clear();
//     setTimeout(() => {
//         window.location.replace(`${window.location.hostname}/login`);
//     }, 6000);
// };

export const inputClear = () => {
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = null;
  }
  let textAreas = document.querySelectorAll("textarea");
  for (let i = 0; i < textAreas.length; i++) {
    textAreas[i].value = null;
  }
  let slects = document.querySelectorAll("select");
  for (let i = 0; i < slects.length; i++) {
    slects[i].value = "";
  }
};

export const IMAGE_URL = "https://admin.dipsag.uz/api/uploads/images/";

axios.defaults.baseURL = "https://admin.dipsag.uz/api/";
