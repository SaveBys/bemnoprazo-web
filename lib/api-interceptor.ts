import { Message } from "@/components/layout/dialog";
import { api } from "./axios";

export function setupApiInterceptor(showError: (msg: Message) => void) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      showError({
        title: "Ocorreu um erro",
        description:
          error?.response?.data?.message || error?.response?.data?.error || "Erro inesperado",
      });

      return Promise.reject(error);
    },
  );
}
