import axios from "./base";
import { requestMessage } from "../constants";

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

        return reject(errorMessage);
      });
  });
};
