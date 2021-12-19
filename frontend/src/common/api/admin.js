import axios from "./base";
import { requestMessage } from "../constants";

// 전체 회원조회
export const requestAllUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/all-users")
      .then((res) => resolve(res.data))
      .catch((err) => {
        const { response } = err;
        let errorMessage = "";
        if (response.status === 500) {
          errorMessage = requestMessage.SERVER_ERROR;
        }

        reject(errorMessage);
      });
  });
};
