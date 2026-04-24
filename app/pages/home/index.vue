<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { authService } from '~/services/auth'

definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const toast = useToast()
const { user, clearAuth } = useAuth()
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'เอกสาร',
  to: '/docs/getting-started',
  icon: 'i-lucide-book-open',
  active: route.path.startsWith('/docs/getting-started')
}, {
  label: 'Components',
  to: '/docs/components',
  icon: 'i-lucide-box',
  active: route.path.startsWith('/docs/components')
}, {
  label: 'Figma',
  icon: 'i-simple-icons-figma',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}])

async function logout() {
  try {
    clearAuth()
    toast.add({
      title: 'Success',
      description: 'Logout successful',
      color: 'success',
    })
    await router.push('/login')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Logout failed',
      color: 'error',
    })
  }
}
</script>

<template>
  <UHeader>
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>

      <div class="flex items-center gap-3 border-l border-gray-200 pl-3 dark:border-gray-800">
        <div class="text-sm">{{ user?.email }}</div>
        <UButton
          color="error"
          variant="ghost"
          icon="i-lucide-log-out"
          @click="logout"
          aria-label="Logout"
        />
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
  <div class="p-4">
    ทดสอบ UI ของ Nuxt 3
  </div>
</template>

