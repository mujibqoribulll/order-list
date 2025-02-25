import axios from "axios";
export const GetProducts = () => {
  return axios.get("https://recruitment-spe.vercel.app/api/v1/products", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im11aGFtYWRxb3JpYnVsbXVqaWJAZ21haWwuY29tIiwiaWF0IjoxNzQwNDg3NTM1LCJleHAiOjE3NDA0OTY1MzV9.FPqxXjKltFC6eFiou7N1mkNT63cj-iwHp340Hn0A6bg`,
    },
  });
};
