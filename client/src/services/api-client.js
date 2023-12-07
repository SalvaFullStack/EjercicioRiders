import axios from "axios";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({ baseURL });

const errorMessages = {
  post: "Registro creado",
  put: "Registro actualizado",
  delete: "Registro eliminado",
};

apiClient.interceptors.response.use(
  function (response) {
    const { method } = response.config;
    if (errorMessages[method]) {
      toast.success(errorMessages[method]);
    }
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
