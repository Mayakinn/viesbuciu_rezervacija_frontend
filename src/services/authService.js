import api from "@/lib/api";

export async function login(email, password) {
  try {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    const { accessToken } = res.data;

    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}


export async function logout() {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } finally {
    // Always remove the token even if the request fails
    localStorage.removeItem("accessToken");
  }
}


export async function registerUser(username, email, password) {
  await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return true;
}

export async function registerHotelOwner(username, email, password) {
  const res = await api.post(
    "/auth/register-hotelowner",
    { username, email, password },
    { withCredentials: true }
  );

  const { accessToken } = res.data;
  localStorage.setItem("accessToken", accessToken);

  return accessToken;
}
