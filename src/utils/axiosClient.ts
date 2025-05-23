import axios from "axios";

import { SERVER_URL } from "./config";

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

const getInstance = () => axiosClient;

export default getInstance();
