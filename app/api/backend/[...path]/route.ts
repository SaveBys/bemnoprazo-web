import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.BACKEND_URL!
const KEYCLOAK_URL = process.env.KEYCLOAK_URL!
const REALM = process.env.KEYCLOAK_REALM!
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID!
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET!

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  })

  if (!res.ok) return null
  return res.json()
}


async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params
  const path = resolvedParams.path.join("/")
  if (!API_URL) return NextResponse.json({ error: "BACKEND_URL não definido" }, { status: 500 })
  const url = `${API_URL}/${path}${req.nextUrl.search}`

  let accessToken = req.cookies.get("access_token")?.value
  const refreshToken = req.cookies.get("refresh_token")?.value

  const makeRequest = async (token?: string) =>
    fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    })

  let response = await makeRequest(accessToken)

  if (response.status === 401 && refreshToken) {
    const newTokens = await refreshAccessToken(refreshToken)

    if (!newTokens) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      res.cookies.delete("access_token")
      res.cookies.delete("refresh_token")
      return res
    }

    accessToken = newTokens.access_token

    response = await makeRequest(accessToken)

    const res = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    })

    res.cookies.set("access_token", newTokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: newTokens.expires_in,
    })

    if (newTokens.refresh_token) {
      res.cookies.set("refresh_token", newTokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })
    }

    return res
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
