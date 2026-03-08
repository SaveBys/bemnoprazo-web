"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isADM, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (isADM) {
        router.replace("/backoffice");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isADM, isAuthenticated, loading, router]);

  if (loading) return null;

  return (
    <main className="flex flex-col items-center justify-center">
      {!loading && (
        <>
          <Header />
          <div className="my-4 w-fit">{children}</div>
          <Footer />
        </>
      )}
    </main>
  );
}
