export const admin = [
  {
    section: "General",
    items: [{ label: "Dashboard", icon: "mdi:home", to: "/dashboard" }],
  },
  {
    section: "People",
    items: [
      { label: "Clients", icon: "mdi:account", to: "/clients" },
      { label: "Staff", icon: "mdi:account-group", to: "/staff" },
      { label: "Teams", icon: "mdi:account", to: "/teams" },
    ],
  },
  {
    section: "Cases",
    items: [
      { label: "All Cases", icon: "mdi:clipboard-list", to: "/inventory" },
      { label: "Tasks & Todos", icon: "mdi:check", to: "/tasks" },
      { label: "Appointments", icon: "mdi:calendar", to: "/appointments" },
    ],
  },
  {
    section: "Documents",
    items: [
      { label: "Manage Documents", icon: "mdi:file", to: "/documents" },
      { label: "Notes & Memos", icon: "mdi:note", to: "/notes" },
    ],
  },
  {
    section: "Finance",
    items: [{ label: "Payments", icon: "mdi:credit-card", to: "/payments" }],
  },
  {
    section: "System",
    items: [
      {
        label: "Authenticated Users",
        icon: "mdi:account-circle",
        to: "/users",
      },
      { label: "Images Storage", icon: "mdi:image", to: "/images-storage" },
      {
        label: "Documents Storage",
        icon: "mdi:file",
        to: "/documents-storage",
      },
      { label: "Analytics & Reports", icon: "mdi:chart-bar", to: "/reports" },
    ],
  },
  {
    section: "Your Profile",
    items: [
      { label: "Notifications", icon: "mdi:bell", to: "/notifications" },
      { label: "Settings", icon: "mdi:cogs", to: "/settings" },
      { label: "Profile", icon: "mdi:account", to: "/profile" },
    ],
  },
];

export const lawyer = [
  {
    section: "General",
    items: [{ label: "Dashboard", icon: "mdi:home", to: "/dashboard" }],
  },
  {
    section: "People",
    items: [
      { label: "Clients", icon: "mdi:account", to: "/clients" },
      { label: "Teams", icon: "mdi:account-group", to: "/staff" },
    ],
  },
  {
    section: "My Work",
    items: [
      { label: "Cases", icon: "mdi:clipboard-list", to: "/inventory" },
      { label: "Tasks & Todos", icon: "mdi:check", to: "/tasks" },
      { label: "Appointments", icon: "mdi:calendar", to: "/appointments" },
      { label: "Documents", icon: "mdi:file", to: "/documents" },
    ],
  },
  {
    section: "Finance",
    items: [{ label: "Payments", icon: "mdi:credit-card", to: "/payments" }],
  },
  {
    section: "Your Profile",
    items: [
      { label: "Notifications", icon: "mdi:bell", to: "/notifications" },
      { label: "Settings", icon: "mdi:cogs", to: "/settings" },
      { label: "Profile", icon: "mdi:account", to: "/profile" },
    ],
  },
];

export const client = [
  {
    section: "General",
    items: [{ label: "Dashboard", icon: "mdi:home", to: "/dashboard" }],
  },
  {
    section: "Cases",
    items: [
      { label: "All Cases", icon: "mdi:clipboard-list", to: "/inventory" },
      { label: "Appointments", icon: "mdi:calendar", to: "/appointments" },
    ],
  },
  {
    section: "Finance",
    items: [{ label: "Payments", icon: "mdi:credit-card", to: "/payments" }],
  },
  {
    section: "Your Profile",
    items: [
      { label: "Notifications", icon: "mdi:bell", to: "/notifications" },
      { label: "Settings", icon: "mdi:cogs", to: "/settings" },
      { label: "Profile", icon: "mdi:account", to: "/profile" },
    ],
  },
];
