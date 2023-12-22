import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { SERVER_URL } from "./config";

interface AxiosData {
  [key: string]: any;
}

interface RefreshStorage {
  refresh_token?: string;
  users_id?: string;
}

const ERROR_MESSAGE_401 = "Request failed with status code 401";

interface RefreshStorage {
  refresh_token?: string;
  users_id?: string;
}

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
});

/**
 * 현재 서버에서 API 실패 시 응답 값으로 실패된 내용을 전달받는 것이 아닌, Exception 처리로 넘어 옴.
 * Exception 처리로 넘어온 응답 결과는 catch 빠지게 되어, message 만 확인 가능해지는 상태.
 */

// Axios 호출
// export const axiosCall = async (method: "get" | "delete" | "post" | "put", url: string, refCb: (message?: string) => void, data?: AxiosData, config?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> => {
//   try {
//     if (method === "get" || method === "delete") {
//       const result = await axiosClient[method](url, config);
//       count = 0;
//       return result;
//     }

//     const result = await axiosClient[method](url, data, config);

//     return result;

//   } catch (err: any) {
//     console.log(err);
//   }
// };

// 리프레시 토큰으로 액세스 재발급
// export const refreshAxios = async (body: AxiosData, refCb: () => void, config?: AxiosRequestConfig) => {
//   try {
//     const result = await axios.post(`${SERVER_URL}/api/common/v1/auth/jwt/reissue`, body, config);

//     if (result?.data?.list?.access_token) {
//       setAccessToken(result.data.list.access_token);
//       return;
//     }

//     throw { status: 401, message: "재발급에 실패했습니다. 다시 로그인하여 주세요." };
//   } catch (err: any) {
//     crashlytics().log(JSON.stringify(err));

//     if (err.message === ERROR_MESSAGE_401) {
//       initAxios();
//       refCb();
//       throw { status: 401, message: "로그인이 만료되었습니다. 다시 로그인하여 주세요." };
//     }

//     throw err;
//   }
// };

export const initAxios = () => {
  axiosClient.defaults.headers.common.Authorization = undefined;
};

const getInstance = () => axiosClient;

export default getInstance();
