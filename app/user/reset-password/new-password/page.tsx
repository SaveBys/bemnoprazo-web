import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
