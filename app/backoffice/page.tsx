import { redirect } from "next/navigation";

export default function BackofficePage() {
  return redirect("/backoffice/products");
}
