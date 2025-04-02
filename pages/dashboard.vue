<script setup lang="ts">
useSeoMeta({
  title: "Dashboard",
  ogTitle: "Dashboard",
  description: "View your dashboard overview.",
  ogDescription: "Stay updated with your dashboard insights.",
});

const { counts, fetchCounts } = useDashboard();

// Fetch the counts when the component is mounted
onMounted(async () => {
  await fetchCounts();
});

const charts = ref([
  {
    title: "Employees",
    icon: "mdi:account-group",  // MDI icon for "Employees"
    subTitle: "All employees",
    total: counts.value.employees,
    link: "/staff",
  },
  {
    title: "Inventory",
    icon: "mdi:clipboard-list",  // MDI icon for "Inventory"
    subTitle: "All inventory",
    total: counts.value.inventory,
    link: "/inventory",
  },
  {
    title: "Suppliers",
    icon: "mdi:truck",  // MDI icon for "Suppliers"
    subTitle: "All suppliers",
    total: counts.value.suppliers,
    link: "/suppliers",
  },
  {
    title: "Products",
    icon: "mdi:package",  // MDI icon for "Products"
    subTitle: "All products",
    total: counts.value.products,
    link: "/products",
  },
]);

</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Dashboard</h1>
    </div>
    <!-- /* ------------------------------- Charts Data ------------------------------ */ -->
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <div
        class="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3"
        v-for="item in charts"
      >
        <NuxtLink :to="item.link">
          <UCard class="h-full flex flex-col justify-center">
            <div class="flex gap-2">
              <div
                class="rounded-full bg-primary h-8 w-8 flex items-center justify-center text-black"
              >
                <Icon :name="item.icon" />
              </div>
              <p class="mb-0 text-lg opacity-60">{{ item.title }}</p>
            </div>

            <div class="mt-3 mb-14">
              <p class="opacity-60 text-sm">{{ item.subTitle }}</p>
              <p class="text-foreground font-normal text-2xl -mt-1">
                {{ Intl.NumberFormat().format(item.total) }}
              </p>
            </div>
            <Chart></Chart>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
