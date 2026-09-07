"use client";

import { useEffect } from "react";
import { useError } from "@/context/error-context";
import { setupApiInterceptor } from "@/lib/api-interceptor";

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { showError } = useError();

  useEffect(() => {
    setupApiInterceptor(showError);
  }, [showError]);

  return children;
}
