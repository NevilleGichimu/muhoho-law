<script setup lang="ts">
defineProps<{ isOpen: boolean }>();

const emit = defineEmits(["toggle"]);

const sidebarItems = [
  {
    section: "General",
    items: [
      { label: "Dashboard", icon: "mdi:home", to: "/dashboard" },
      { label: "Orders", icon: "mdi:cart", to: "/orders" },
      { label: "Payments", icon: "mdi:credit-card", to: "/payments" },
    ],
  },
  {
    section: "People",
    items: [
      { label: "Clients", icon: "mdi:account", to: "/clients" },
      { label: "Employees", icon: "mdi:account-group", to: "/employees" },
      {
        label: "Attendance",
        icon: "mdi:calendar-check", // MDI equivalent of calendar-check
        to: "/attendance",
      },
    ],
  },
  {
    section: "Workshop",
    items: [
      { label: "Inventory", icon: "mdi:clipboard-list", to: "/inventory" },
      { label: "Products", icon: "mdi:package", to: "/products" },
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
  {
    section: "System",
    items: [
      {
        label: "Authenticated Users",
        icon: "mdi:account-circle",
        to: "/users",
      },
      { label: "Images Storage", icon: "mdi:image", to: "/images-storage" },
      { label: "Documents Storage", icon: "mdi:file", to: "/documents-storage" },

    ],
  },
];

</script>
<template>
  <aside
    class="fixed inset-y-0 left-0 h-screen border-r p-4 transition-all duration-300 ease-in-out overflow-y-auto"
    :class="[
      isOpen ? 'w-64' : 'w-20',
      'bg-background dark:bg-stone-800', // Background color for both modes
      'border-r dark:border-stone-700', // Border color for dark mode
    ]"
    style="z-index: 200"
  >
    <!-- Logo & Title -->
    <NuxtLink to="/dashboard" class="flex items-center gap-2 mb-6">
      <img src="/la-logo.png" class="h-12" />
      <span
        class="text-lg font-semibold transition-opacity duration-200"
        :class="isOpen ? 'opacity-100' : 'opacity-0'"
      >
        Muhoho-Law
      </span>
    </NuxtLink>

    <!-- Navigation Items -->
    <div class="flex-1 overflow-y-auto mb-6">
      <div v-for="section in sidebarItems" :key="section.section" class="mb-6">
        <!-- Hide section titles if sidebar is collapsed -->
        <p v-if="isOpen" class="text-xs font-bold mb-2 text-gray-500 uppercase">
          {{ section.section }}
        </p>
        <div class="space-y-1">
          <NuxtLink
            v-for="link in section.items"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200"
            :class="[
              $route.path === link.to
                ? 'bg-primary text-white'
                : 'hover:bg-primary/10 dark:hover:bg-stone-700 dark:hover:text-white hover:text-primary',
              'text-gray-700 dark:text-gray-300',
            ]"
          >
            <Icon :name="link.icon" class="w-5 h-5 flex-shrink-0" />
            <!-- Only show label if sidebar is expanded -->
            <span
              v-if="isOpen"
              class="transition-opacity duration-200 opacity-100"
            >
              {{ link.label }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>
