import { NextRequest, NextResponse } from "next/server";

const KEYCLOAK_URL = process.env.KEYCLOAK_URL!;
const REALM = process.env.KEYCLOAK_REALM!;
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID!;
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET!;

// Rotas públicas que não precisam de autenticação
const publicPaths = [
  "/user",                              // todas as rotas /user/*
  "/api/backend/users/reset-password",  // reset-password
  "/api/backend/announcements",         // anúncios
  "/api/backend/users/update-password",
  "/api/login"
];

// Função para atualizar token
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
    );

    if (!res.ok) {
      console.error("[Middleware] Erro no refresh:", res.status);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("[Middleware] Erro fetch refresh:", err);
    return null;
  }
}

// Redireciona para login
function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/user/login", req.nextUrl.origin);
  return NextResponse.redirect(loginUrl);
}

// Atualiza cookies com novo token
async function handleRefreshToken(req: NextRequest, refreshToken: string) {
  const newTokens = await refreshAccessToken(refreshToken);
  if (!newTokens) return redirectToLogin(req);

  const res = NextResponse.next();
  const isProd = process.env.NODE_ENV === "production";

  res.cookies.set("access_token", newTokens.access_token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: newTokens.expires_in,
  });

  if (newTokens.refresh_token) {
    res.cookies.set("refresh_token", newTokens.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}

// Middleware principal
export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isApi = pathname.startsWith("/api");

  // Se a rota estiver na lista de públicas, libera
  console.log(pathname)
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    console.log('ok')
    return NextResponse.next();
  }

  // Sem token algum
  if (!accessToken && !refreshToken) {
    if (isApi) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    return redirectToLogin(req);
  }

  // Refresh token disponível mas access token vazio
  if ((!accessToken || accessToken === "") && refreshToken) {
    if (isApi) return NextResponse.json({ error: "Sessão expirada" }, { status: 401 });
    return handleRefreshToken(req, refreshToken);
  }

  // Verifica expiração do access token
  if (accessToken) {
    try {
      const [, payloadBase64] = accessToken.split(".");
      const payloadJson = new TextDecoder().decode(
        Uint8Array.from(atob(payloadBase64), (c) => c.charCodeAt(0))
      );
      const payload = JSON.parse(payloadJson);
      const exp = payload.exp * 1000;
      const now = Date.now();

      // Se o token expirar em menos de 30s, tenta refresh
      if (now > exp - 30_000 && refreshToken) {
        if (isApi) return NextResponse.json({ error: "Sessão expirada" }, { status: 401 });
        return handleRefreshToken(req, refreshToken);
      }

      return NextResponse.next();
    } catch {
      if (isApi) return NextResponse.json({ error: "Token inválido" }, { status: 401 });
      return redirectToLogin(req);
    }
  }

  // Fallback
  if (isApi) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  return redirectToLogin(req);
}

// Configuração do matcher
export const config = {
  matcher: ["/((?!_next/|favicon.ico|users).*)"], // aplica middleware a todas rotas, exceto estáticos
};
