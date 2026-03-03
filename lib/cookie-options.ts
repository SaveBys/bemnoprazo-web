import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getAuthCookieOptions = (maxAge?: number): Partial<ResponseCookie> => {
  const isProd = process.env.NODE_ENV === "production";
  const options: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  };
  if (maxAge) {
    options.maxAge = maxAge;
  }
  return options;
};
