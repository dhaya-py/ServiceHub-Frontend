import { login } from "../core/auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = email.value;
  const password = password.value;

  try {
    const user = await login(email, password);

    if (user.role === "admin") location.href = "/pages/admin/dashboard.html";
    if (user.role === "provider") location.href = "/pages/provider/dashboard.html";
    if (user.role === "customer") location.href = "/pages/customer/dashboard.html";
  } catch (err) {
    alert("Invalid credentials");
  }
});
