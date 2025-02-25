import { GetProducts } from "../../services/products";
import { useGetService } from "../fetch/useService";

export const useGetServiceProduct = () => {
  const { state, service, reset } = useGetService();

  return {
    getProducts: state,
    getServiceProducts: () => service(() => GetProducts()),
    productReset: reset,
  };
};
