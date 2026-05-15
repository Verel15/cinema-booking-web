# CLAUDE.md

This file defines coding conventions and guidelines for Claude when working on this project.

---

## Project Stack

- **Framework:** Nuxt.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript (preferred) or JavaScript

---

## UI Development Rules

### 1. Always Break UI into Components

Never write all UI in a single file. Always split into smaller components.

**❌ Don't do this:**
```vue
<!-- pages/dashboard.vue -->
<template>
  <div>
    <div class="flex items-center justify-between px-6 py-4 bg-white shadow">
      <span class="text-xl font-bold">Logo</span>
      <nav>...</nav>
    </div>
    <div class="grid grid-cols-3 gap-4 p-6">
      <div class="bg-white rounded-xl p-4 shadow">...</div>
      <div class="bg-white rounded-xl p-4 shadow">...</div>
    </div>
  </div>
</template>
```

**✅ Do this instead:**
```vue
<!-- pages/dashboard.vue -->
<template>
  <div>
    <AppNavbar />
    <div class="p-6">
      <StatsGrid :stats="stats" />
    </div>
  </div>
</template>

<script setup>
import AppNavbar from '~/components/AppNavbar.vue'
import StatsGrid from '~/components/StatsGrid.vue'
</script>
```

---

### 2. Component File Structure

Components must mirror the `pages/` directory structure. If a page lives at `pages/admin/users`, its components belong in `components/admin/users/`.

```
pages/                          components/
├── index.vue                   ├── app/
├── admin/                      │   ├── AppNavbar.vue
│   ├── index.vue               │   ├── AppSidebar.vue
│   └── users/                  │   └── AppFooter.vue
│       ├── index.vue           ├── ui/
│       └── [id].vue            │   ├── UiButton.vue
├── dashboard/                  │   ├── UiCard.vue
│   └── index.vue               │   ├── UiModal.vue
└── profile/                    │   ├── UiBadge.vue
    └── index.vue               │   └── UiInput.vue
                                ├── admin/
                                │   └── users/
                                │       ├── UserTable.vue
                                │       ├── UserFilters.vue
                                │       └── UserDetailModal.vue
                                ├── dashboard/
                                │   ├── StatsGrid.vue
                                │   └── RecentActivity.vue
                                └── profile/
                                    ├── ProfileForm.vue
                                    └── AvatarUpload.vue
```

**Rules:**
- Prefix `App` → global layout components (Navbar, Sidebar, Footer), lives in `components/app/`
- Prefix `Ui` → reusable UI primitives (Button, Card, Input), lives in `components/ui/`
- Module components → path matches `pages/` structure exactly
- Shared components used across multiple modules → place in the closest common parent folder

**Import example:**
```vue
<!-- pages/admin/users/index.vue -->
<script setup>
import UserTable from '~/components/admin/users/UserTable.vue'
import UserFilters from '~/components/admin/users/UserFilters.vue'
</script>
```

---

### 3. Component Rules

- **1 component = 1 file**, always
- If a component has complex logic, extract sub-components
- If a template exceeds **50 lines**, consider splitting into a new component
- Always use `defineProps` and `defineEmits` with TypeScript types

```vue
<script setup lang="ts">
interface Props {
  title: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
```

---

### 4. Tailwind CSS Rules

- Use Tailwind utility classes directly — avoid custom CSS unless absolutely necessary
- If a class string gets too long, use `:class` binding or a computed property
- Avoid `@apply` except in true base styles

```vue
<!-- ✅ Good: use computed for conditional classes -->
<script setup lang="ts">
const buttonClass = computed(() => [
  'px-4 py-2 rounded-lg font-medium transition-colors',
  props.variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  props.disabled && 'opacity-50 cursor-not-allowed',
])
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

---

### 5. Page vs Component Responsibility

| File | Responsibility |
|------|---------------|
| `pages/*.vue` | Compose layout, call composables, pass data down to components |
| `components/*.vue` | Receive props, render UI, emit events back up |
| `composables/*.ts` | Business logic, API calls, state management |

Pages should not contain heavy UI logic — delegate to components and composables.

---

### 6. Naming Conventions

- **Components:** PascalCase (`UserProfileCard.vue`)
- **Composables:** camelCase prefixed with `use` (`useAuth.ts`, `useCart.ts`)
- **Pages:** kebab-case per Nuxt convention (`user-profile.vue`)
- **Props/Emits:** camelCase
- **CSS classes:** Tailwind only — no custom class names