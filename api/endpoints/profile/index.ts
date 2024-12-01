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

export function getProfileAPI(): ResponsTypes {
  return $({
    url: "/users",
    method: "get",
  });
}
