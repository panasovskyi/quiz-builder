import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const HTTP_ERRORS: Record<number, string> = {
  400: "Bad request. Check input.",
  401: "Unauthorized. Check your permissions.",
  403: "Access denied.",
  404: "Not found.",
  429: "Too many request. Try again later.",
  500: "Internal server error. Try again later.",
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "Сталася неочікувана помилка";

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      errorMessage =
        (status && HTTP_ERRORS[status]) ||
        data?.error ||
        data?.message ||
        error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  },
);
