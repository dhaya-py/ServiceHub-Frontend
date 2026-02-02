import { loadCurrentUser } from "./auth.js";

export async function protectPage(allowedRoles = []) {
  const user = await loadCurrentUser();

  if (!allowedRoles.includes(user.role)) {
    window.location.href = "/unauthorized.html";
  }
}
