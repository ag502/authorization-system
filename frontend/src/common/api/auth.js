import axios from "./base";
import { requestMessage } from "../constants";
import { getTokenfromLocalStorage } from "../manageToken";

// 로그인
export const requestLogin = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", params)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { response } = err;
        let errorMessage = "";
        if (response.status === 401) {
          errorMessage = requestMessage.ACCOUNT_NOT_EXIST;
        } else {
          errorMessage = requestMessage.SERVER_ERROR;
        }

        reject(errorMessage);
      });
  });
};

// 로그인 검증
export const checkLogin = () => {
  let errorMessage = "";
  return new Promise((resolve, reject) => {
    const token = getTokenfromLocalStorage();
    if (!token) {
      reject(requestMessage.NOT_AUTHORIZED);
    }
    axios
      .get("/check", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 401) {
          errorMessage = requestMessage.NOT_AUTHORIZED;
        } else {
          errorMessage = requestMessage.SERVER_ERROR;
        }
        reject(errorMessage);
      });
  });
};

// 회원가입
export const requestRegister = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/register", params)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { response } = err;
        let errorMessage = "";
        if (response.status === 409) {
          errorMessage = requestMessage.ALREADY_EXISTED;
        } else {
          errorMessage = requestMessage.SERVER_ERROR;
        }
        reject(errorMessage);
      });
  });
};
