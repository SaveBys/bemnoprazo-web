import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (refreshToken) {
      await fetch(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
            refresh_token: refreshToken,
          }),
        },
      );
    }
  } catch (error) {
    console.error("Erro logout:", error);
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  res.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return res;
}
