import { AxiosResponse } from "axios";
import $ from "../../index"; // Assuming this is your axios instance

type ResponsTypes = Promise<{
  success?: boolean;
  message?: string;
  code?: string;
  serverResponse?: {
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
}>;

export function registerAPI(data: {
  dob: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone_number: string;
  residential_address: string;
}): ResponsTypes {
  return $({
    url: "/users",
    method: "post",
    data: data,
  });
}
export function loginAPI(data: {
  email: string;
  password: string;
}): ResponsTypes {
  return $({
    url: "/users/auth",
    method: "post",
    data: data,
  });
}

export function verifyEmailAPI(data: {
  email: string;
  otp: string;
}): ResponsTypes {
  return $({
    url: "/users/verify-email",
    method: "post",
    data: data,
  });
}

export function verifyAccountLoginAPI(data: {
  email: string;
  otp: string;
}): ResponsTypes {
  return $({
    url: "/users/verify-auth",
    method: "post",
    data: data,
  });
}

export function resendCodeAPI(data: {
  email: string;
  is_auth: boolean;
}): ResponsTypes {
  return $({
    url: "/users/generate-otp",
    method: "post",
    data: data,
  });
}

// export function resendCodeAPI(data: { email: string; is_auth: boolean }) {
//   return $({
//     url: "/users/generate-otp",
//     method: "get",
//     data: {
//       email: "zach@gmail.com",
//       is_auth: true,
//     }, // Pass the body as `data`
//     headers: {
//       "Content-Type": "application/json",
//     },
//     transformRequest: [
//       (data, headers) => {
//         headers["Content-Type"] = "application/json";
//         return JSON.stringify(data); // Ensure the data is stringified
//       },
//     ],
//   });
// }

export function logoutAPI(): ResponsTypes {
  return $({
    url: "/auth/logout",
    method: "post",
  });
}
