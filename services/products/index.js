import axios from "axios";

export const GetProducts = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
};
