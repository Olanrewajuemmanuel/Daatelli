import axios from "axios";

export const axiosPublicClient = axios.create({});

export const axiosPrivateClient = (token: string, data: unknown) =>
  axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
    data,
  });
