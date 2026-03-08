"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export default function TesteLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isADM, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isADM) {
      router.replace("/dashboard");
    } else {
      router.replace("/backoffice");
    }
  }, [isADM, isAuthenticated, router]);

  if (loading) return null;

  return (
    <main className="flex flex-col items-center justify-center">
      {loading && (
        <>
          <Header />
          <div className="my-4 w-fit">{children}</div>
          <Footer />
        </>
      )}
    </main>
  );
}
