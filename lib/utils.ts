import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: string) {
  if (!date) return "";

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function expirationDateValidator(value: string) {
  if (!value) return false;

  const [day, month, year] = value.split("/");

  const expiration = new Date(Number(year), Number(month) - 1, Number(day));

  if (isNaN(expiration.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date();
  minDate.setDate(today.getDate() + 90);
  minDate.setHours(0, 0, 0, 0);

  return expiration >= minDate;
}