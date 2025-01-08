import axios from "axios";

import { SERVER_URL } from "./config";

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

export const initAxios = () => {
  axiosClient.defaults.headers.common.Authorization = undefined;
};

const getInstance = () => axiosClient;

export default getInstance();
