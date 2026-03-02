import { NextRequest, NextResponse } from "next/server"

const KEYCLOAK_URL = process.env.KEYCLOAK_URL!
const REALM = process.env.KEYCLOAK_REALM!
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID!
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET!

const publicPaths = process.env.BFF_PUBLIC_ROUTES!.split(",")

async function refreshAccessToken(refreshToken: string) {
  try {
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

    if (!res.ok) {
      console.error("[Middleware] Erro no refresh:", res.status)
      return null
    }

    return res.json()
  } catch (err) {
    console.error("[Middleware] Erro fetch refresh:", err)
    return null
  }
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/user/login", req.nextUrl.origin)
  const res = NextResponse.redirect(loginUrl)

  res.cookies.delete("access_token")
  res.cookies.delete("refresh_token")

  return res
}

async function handleRefreshToken(req: NextRequest, refreshToken: string) {
  const newTokens = await refreshAccessToken(refreshToken)

  if (!newTokens) {
    return redirectToLogin(req)
  }

  const res = NextResponse.next()
  const isProd = process.env.NODE_ENV === "production"

  res.cookies.set("access_token", newTokens.access_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: newTokens.expires_in,
  })

  if (newTokens.refresh_token) {
    res.cookies.set("refresh_token", newTokens.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    })
  }

  return res
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const accessToken = req.cookies.get("access_token")?.value
  const refreshToken = req.cookies.get("refresh_token")?.value
  const isApi = pathname.startsWith("/api")

  if (publicPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    return NextResponse.next()
  }

  if (!accessToken && !refreshToken) {
    if (isApi) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    return redirectToLogin(req)
  }

  if ((!accessToken || accessToken === "") && refreshToken) {
    if (isApi) return NextResponse.json({ error: "Sessão expirada" }, { status: 401 })
    return handleRefreshToken(req, refreshToken)
  }

  if (accessToken) {
    try {
      const [, payloadBase64] = accessToken.split(".")
      const payloadJson = new TextDecoder().decode(
        Uint8Array.from(atob(payloadBase64), (c) => c.charCodeAt(0)),
      )
      const payload = JSON.parse(payloadJson)
      const exp = payload.exp * 1000
      const now = Date.now()

      if (now > exp - 30_000 && refreshToken) {
        if (isApi) return NextResponse.json({ error: "Sessão expirada" }, { status: 401 })
        return handleRefreshToken(req, refreshToken)
      }

      return NextResponse.next()
    } catch {
      if (isApi) return NextResponse.json({ error: "Token inválido" }, { status: 401 })
      return redirectToLogin(req)
    }
  }

  if (isApi) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  return redirectToLogin(req)
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|img/|users).*)"],
}
