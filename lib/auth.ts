export async function login(username: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Login inválido");
  }

  return true;
}

export async function logout() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer logout");
  }

  return true;
}
