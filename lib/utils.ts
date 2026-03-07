import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | undefined) => {
  if (!date) return;

  return date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
};

export const formatCurrency = (amount: number | undefined, locale = "pt-BR", currency = "BRL") => {
  if (!amount) return;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

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
