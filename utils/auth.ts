import Cookies from "js-cookie";
import { addDays, addHours, differenceInSeconds } from "date-fns";

export const ACCESS_TOKEN = "PD_Authorization";
export const REFRESH_TOKEN = "PD_AppSession";

export const ACCESS_TOKEN_EXPIRY = differenceInSeconds(
    addHours(new Date(), 1),
    new Date(),
);
export const REFRESH_TOKEN_EXPIRY = differenceInSeconds(
    addDays(new Date(), 30),
    new Date(),
);

export function saveToken(token: string) {
    Cookies.set(ACCESS_TOKEN, token);


    return true;
}

export function removeToken() {
    Cookies.remove(ACCESS_TOKEN);
    // console.log("token set");

    return true;
}

export function getToken() {
    let token = Cookies.get(ACCESS_TOKEN);
    if (token) {
        return token;
    } else {
        return false;
    }
}

export function hasToken() {
    let token = Cookies.get(ACCESS_TOKEN);
    if (token) {
        return true;
    } else {
        return false;
    }
}

//

export function hasNumber(strings: string) {
    // Regular expression to match at least one digit (number)
    const numberRegex = /\d/;

    // Iterate through each string in the array
    for (const str of strings) {
        if (numberRegex.test(str)) {
            return true; // Found at least one number in the current string
        }
    }

    return false; // No numbers found in any string
}

export function hasSpecialCharacters(strings: string) {
    // Regular expression to match any special character
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Iterate through each string in the array
    for (const str of strings) {
        if (specialCharRegex.test(str)) {
            return true; // Found a special character in the current string
        }
    }

    return false; // No special characters found in any string
}

export function fmtResponse(responseData: any, error: boolean, toast: any) {
    let { statusText, status, data } = responseData;

    if (error) {
        // toast.error(data.message);
        return {
            status,
            serverResponse: data,
            statusText,
            error: true,
        };
    } else {
        // toast.success(data.message);
        return {
            status,
            serverResponse: data,
            statusText,
            error: false,
        };
    }
}
