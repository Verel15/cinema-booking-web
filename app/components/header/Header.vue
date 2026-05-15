<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
const toast = useToast();
const { user, clearAuth } = useAuth();
const route = useRoute();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Movies',
    to: '/home',
    icon: 'i-lucide-clapperboard',
    active: route.path.startsWith('/home'),
  },
  {
    label: 'Showtimes',
    to: '/showtimes',
    icon: 'i-lucide-tv-minimal',
    active: route.path.startsWith('/showtimes'),
  },
  {
    label: 'Cinamas',
    icon: 'i-lucide-film',
    to: '/cinamas',
    active: route.path.startsWith('/cinamas'),
  },
  {
    label: 'Promotions',
    icon: 'i-lucide-sparkles',
    to: '/promotions',
    active: route.path.startsWith('/promotions'),
  },
]);

async function logout() {
  try {
    clearAuth();
    toast.add({
      title: 'Success',
      description: 'Logout successful',
      color: 'success',
    });
  } catch (error) {
    console.error(error);
    toast.add({
      title: 'Error',
      description: 'Logout failed',
      color: 'error',
    });
  }
}
</script>
<template>
  <UHeader>
    <template #title>
      <img
        src="~/assets/images/CineXLogoWhite.png"
        alt="CineX"
        class="h-24 object-contain dark:block hidden"
      />
      <img
        src="~/assets/images/CineXLogo.png"
        alt="CineX"
        class="h-24 object-contain dark:hidden block"
      />
    </template>
    <UNavigationMenu :items="items" />
    <template #right>
      <UTooltip :text="isDark ? 'Light mode' : 'Dark mode'">
        <UButton
          :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
          color="neutral"
          variant="ghost"
          @click="toggleColorMode"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        />
      </UTooltip>
      <div
        class="flex items-center gap-3 border-l border-gray-200 pl-3 dark:border-gray-800"
      >
        <div class="text-sm">{{ user?.email }}</div>
        <UTooltip text="Log out">
          <UButton
            color="error"
            variant="ghost"
            icon="i-lucide-log-in"
            @click="logout"
            aria-label="Logout"
          />
        </UTooltip>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
