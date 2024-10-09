import axios from "axios";

export const axiosPublicClient = axios.create({});

const baseURL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export const axiosPrivateClient = (token: string, data: unknown) =>
  axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
    data,
  });
