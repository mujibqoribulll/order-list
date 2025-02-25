import { useState } from "react";

const initialState = {
  loading: "idle",
  message: "",
  data: {},
};

export const useGetService = () => {
  const [state, setState] = useState(initialState);
  const reset = () => {
    setState({ ...initialState });
  };

  const service = async (repository) => {
    try {
      setState((prev) => ({ ...prev, loading: "pending" }));
      const data = await repository();

      if (data) {
        setState((prev) => ({
          ...prev,
          loading: "succeeded",
          data: data?.data,
        }));

        return Promise.resolve(data?.data);
      } else {

        setState((prev) => ({ ...prev, loading: "failed", message: "gagal" }));

        return Promise.reject(data);
      }
    } catch (error) {

      setState((prev) => ({ ...prev, loading: "failed", message: error }));
      return Promise.reject(error);
    }
  };

  return { state, service, reset };
};
