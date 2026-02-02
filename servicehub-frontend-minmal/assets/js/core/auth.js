import api from "./api.js";
import { setUser, clearUser } from "./state.js";

export async function login(email, password) {
  const response = await api.post("/auth/login", { email, password });

  localStorage.setItem("access_token", response.data.access_token);
  setUser(response.data.user);

  return response.data.user;
}

export function logout() {
  localStorage.clear();
  clearUser();
  window.location.href = "/pages/auth/login.html";
}

export async function loadCurrentUser() {
  try {
    const res = await api.get("/me");
    setUser(res.data);
    return res.data;
  } catch {
    logout();
  }
}
