import { logout } from "../core/auth.js";

export function renderNavbar(user) {
  return `
    <nav class="navbar navbar-light bg-white shadow-sm px-4">
      <span class="navbar-brand fw-bold">ServiceHub</span>
      <div>
        <span class="me-3">${user.email}</span>
        <button class="btn btn-outline-danger btn-sm" id="logoutBtn">Logout</button>
      </div>
    </nav>
  `;
}

export function bindNavbarEvents() {
  document.getElementById("logoutBtn")?.addEventListener("click", logout);
}
