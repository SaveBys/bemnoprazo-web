import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({}, { status: 401 })
  }

  try {
    const response = await axios.post(
      `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    const { access_token, refresh_token } = response.data

    const res = NextResponse.json({ success: true })

    res.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
    })

    res.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      path: "/",
    })

    return res
  } catch {
    return NextResponse.json({}, { status: 401 })
  }
}
