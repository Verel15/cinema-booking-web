<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');
function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}

interface NavItem {
  label: string;
  icon: string;
  to: string;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        icon: 'i-lucide-layout-dashboard',
        to: '/admin/dashboard',
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        label: 'Users',
        icon: 'i-lucide-users',
        to: '/admin/users',
        badge: '12.8K',
      },
      { label: 'Staff', icon: 'i-lucide-user-cog', to: '/admin/staff' },
      {
        label: 'Movies',
        icon: 'i-lucide-clapperboard',
        to: '/admin/movie-management',
      },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Bookings', icon: 'i-lucide-ticket', to: '/admin/bookings' },
      { label: 'Showtimes', icon: 'i-lucide-calendar', to: '/admin/showtimes' },
      { label: 'Promotions', icon: 'i-lucide-tag', to: '/admin/promotions' },
    ],
  },
];

function isActive(to: string) {
  if (to === '/admin/dashboard') return route.path === to;
  return route.path.startsWith(to);
}

const pageName = computed(() =>
  route.path
    .split('/')
    .filter(Boolean)
    .slice(1)
    .map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(' › '),
);
</script>

<template>
  <div
    class="flex min-h-screen bg-gray-100 dark:bg-[#040e08]"
    style="font-family: 'Prompt', sans-serif"
  >
    <!-- ─── Sidebar ──────────────────────────────────────────────── -->
    <aside
      class="w-[260px] shrink-0 flex flex-col bg-white dark:bg-[#060f0b] border-r border-gray-200 dark:border-[#1a3028] sticky top-0 h-screen z-20"
    >
      <!-- Logo -->
      <div
        class="h-16 flex items-center px-5 border-b border-gray-200 dark:border-[#1a3028] shrink-0"
      >
        <NuxtLink to="/">
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
        </NuxtLink>
        <UBadge color="neutral" variant="outline" size="sm" class="ml-auto"
          >Admin</UBadge
        >
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        <div v-for="group in navGroups" :key="group.label">
          <p
            class="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600"
          >
            {{ group.label }}
          </p>
          <ul class="space-y-0.5">
            <li v-for="item in group.items" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border"
                :class="
                  isActive(item.to)
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 border-transparent'
                "
              >
                <!-- Icon box -->
                <span
                  class="size-7 rounded-md flex items-center justify-center shrink-0 transition-colors"
                  :class="
                    isActive(item.to)
                      ? 'bg-primary/15 text-primary'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
                  "
                >
                  <UIcon :name="item.icon" class="size-3.5" />
                </span>

                <span class="flex-1 truncate">{{ item.label }}</span>

                <!-- Optional badge -->
                <span
                  v-if="item.badge"
                  class="text-[10px] text-gray-500 px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5"
                >
                  {{ item.badge }}
                </span>

                <!-- Active dot -->
                <span
                  v-if="isActive(item.to)"
                  class="size-1.5 rounded-full bg-primary shrink-0"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Footer: settings + user profile -->
      <div class="shrink-0 border-t border-gray-200 dark:border-[#1a3028]">
        <div class="px-3 py-2">
          <NuxtLink
            to="/admin/settings"
            class="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent transition-all"
          >
            <span
              class="size-7 rounded-md flex items-center justify-center bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10"
            >
              <UIcon name="i-lucide-settings" class="size-3.5" />
            </span>
            Settings
          </NuxtLink>
        </div>

        <div
          class="p-4 flex items-center gap-3 border-t border-gray-200 dark:border-[#1a3028] bg-gray-50 dark:bg-[#040e08]"
        >
          <UAvatar
            text="AD"
            size="sm"
            class="shrink-0 ring-2 ring-primary/20"
          />
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate"
            >
              Admin User
            </p>
            <p class="text-xs text-gray-500 truncate">admin@cinex.com</p>
          </div>
          <UButton
            icon="i-lucide-log-out"
            color="neutral"
            variant="ghost"
            size="xs"
            title="Logout"
            @click="router.push('/login')"
          />
        </div>
      </div>
    </aside>

    <!-- ─── Main Area ────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Header -->
      <header
        class="h-16 shrink-0 flex items-center gap-4 px-6 bg-white/95 dark:bg-[#060f0b]/95 border-b border-gray-200 dark:border-[#1a3028] sticky top-0 z-10 backdrop-blur-sm"
      >
        <div class="flex-1 flex items-center gap-2 min-w-0">
          <UIcon
            name="i-lucide-panel-left"
            class="size-4 text-gray-400 dark:text-gray-600 shrink-0"
          />
          <span
            class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"
            >{{ pageName }}</span
          >
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <!-- Search hint -->
          <UButton
            icon="i-lucide-search"
            label="Quick search…"
            color="neutral"
            variant="outline"
            size="sm"
            class="hidden md:flex w-[200px]"
            trailing
          >
            <template #trailing>
              <UKbd>⌘K</UKbd>
            </template>
          </UButton>

          <!-- Theme toggle -->
          <UTooltip :text="isDark ? 'Light mode' : 'Dark mode'">
            <UButton
              :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="toggleColorMode"
              class="h-[28px]"
            />
          </UTooltip>

          <!-- Notifications -->
          <UChip color="error" size="2xs" position="top-right">
            <UButton
              icon="i-lucide-bell"
              color="neutral"
              variant="ghost"
              size="sm"
              class="h-[28px]"
            />
          </UChip>

          <div class="h-5 w-px bg-gray-200 dark:bg-[#1a3028]" />

          <UAvatar
            text="AD"
            size="sm"
            class="cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
          />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
