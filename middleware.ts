// app/middleware.ts
import { NextRequest, NextResponse } from "next/server"

const KEYCLOAK_URL = process.env.KEYCLOAK_URL!
const REALM = process.env.KEYCLOAK_REALM!
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID!
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET!

// Função para fazer refresh do access token
async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    )

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

// Função middleware
export async function middleware(req: NextRequest) {
  console.log("[Middleware] chamada para:", req.nextUrl.pathname)

  const accessToken = req.cookies.get("access_token")?.value
  const refreshToken = req.cookies.get("refresh_token")?.value

  if (!accessToken) {
    console.log("[Middleware] Sem access token, passando...")
    return NextResponse.next()
  }

  try {
    // Decodifica JWT sem Buffer (Edge Runtime)
    const [, payloadBase64] = accessToken.split(".")
    const payloadJson = new TextDecoder().decode(
      Uint8Array.from(atob(payloadBase64), c => c.charCodeAt(0))
    )
    const payload = JSON.parse(payloadJson)
    const exp = payload.exp * 1000
    const now = Date.now()

    // Se token expirou ou vai expirar nos próximos 30s
    if (now > exp - 30_000 && refreshToken) {
      console.log("[Middleware] Token expirado, fazendo refresh...")
      const newTokens = await refreshAccessToken(refreshToken)

      if (!newTokens) {
        console.log("[Middleware] Refresh falhou, limpando cookies")
        const res = NextResponse.json({ error: "Sessão expirada" }, { status: 401 })
        res.cookies.delete("access_token")
        res.cookies.delete("refresh_token")
        return res
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

      console.log("[Middleware] Cookies atualizados com novo token")
      return res
    }

    // Token ainda válido
    return NextResponse.next()
  } catch (err) {
    console.error("[Middleware] Erro ao processar token:", err)
    return NextResponse.next()
  }
}

// Aplicar middleware em todas as rotas
export const config = {
  matcher: ["/:path*"], // roda em todas as rotas
}
