export function renderSidebar(role) {
    const menus = {
      admin: ["Dashboard", "Categories", "Users", "Bookings"],
      provider: ["Dashboard", "Services", "Availability", "Earnings"],
      customer: ["Dashboard", "Search", "Bookings"],
    };
  
    return `
      <aside class="sidebar">
        <ul>
          ${menus[role]
            .map((item) => `<li class="sidebar-item">${item}</li>`)
            .join("")}
        </ul>
      </aside>
    `;
  }
  