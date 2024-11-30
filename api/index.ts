import { fmtResponse, getToken, hasToken, removeToken } from "@/utils/auth";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
// import { redirect } from "next/navigation";

// Setup baseURL depending on environment
let baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_STAGING
    : process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION;

const service = axios.create({
  baseURL,
  //   withCredentials: false,
});

// Request Interceptor
service.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // Ensure headers is an instance of AxiosHeaders
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (hasToken() && getToken() !== false) {
      config.headers.set("Authorization", `Bearer ${String(getToken())}`);
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response; // If you need only the data part of the response
  },

  (error: AxiosError) => {
    const { response } = error;

    // const unauthorized = [
    //     "User not authorized!",
    //     "No token provided",
    //     "There was a problem retrieving your profile",
    // ];

    // if (unauthorized.includes(response?.data?.message)) {
    //     removeToken();
    // }
    //@ts-ignore
    if (response?.data?.status == "401" || response?.status == "401") {
      removeToken();
      // redirect("/auth/sign-in");
    }

    if (!response) {
      return Promise.reject(error);
    } else {
      return Promise.reject(response);
    }
  }
);

export default service;
