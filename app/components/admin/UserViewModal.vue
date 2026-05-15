<script setup lang="ts">
import type { AdminUser, MembershipTier, UserStatus } from '~/types/admin'

defineProps<{
  open: boolean
  user: AdminUser | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  edit: []
}>()

type BadgeColor = 'warning' | 'primary' | 'neutral' | 'success' | 'error'

const tierColor: Record<MembershipTier, BadgeColor> = {
  DIAMOND: 'warning',
  PREMIUM: 'primary',
  STANDARD: 'neutral',
}

const statusColor: Record<UserStatus, BadgeColor> = {
  active: 'success',
  inactive: 'neutral',
  suspended: 'error',
}

const statusLabel: Record<UserStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  suspended: 'Suspended',
}
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="p-6 space-y-5">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">User Profile</h2>
          <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="emit('update:open', false)" />
        </div>

        <div class="border-t border-gray-200 dark:border-[#1a3028]" />

        <template v-if="user">
          <!-- Avatar + name -->
          <div class="flex items-center gap-4">
            <div
              class="size-16 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0 ring-2 ring-primary/30"
              :class="user.avatarBg"
            >
              {{ user.initials }}
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 dark:text-white">{{ user.name }}</h3>
              <p class="text-sm text-gray-500">{{ user.email }}</p>
              <div class="flex items-center gap-2 mt-1.5">
                <UBadge :color="tierColor[user.membershipTier]" variant="soft" size="sm">
                  {{ user.membershipTier }}
                </UBadge>
                <UBadge :color="statusColor[user.status]" variant="soft" size="sm">
                  {{ statusLabel[user.status] }}
                </UBadge>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Stats grid -->
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
              <p class="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                {{ user.totalBookings.toLocaleString() }}
              </p>
              <p class="text-[10px] text-gray-500 mt-0.5">Total Bookings</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
              <p class="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                ฿{{ user.totalSpent.toLocaleString() }}
              </p>
              <p class="text-[10px] text-gray-500 mt-0.5">Total Spent</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
              <p class="text-xs font-semibold text-gray-900 dark:text-white leading-snug">
                {{ user.lastActive }}
              </p>
              <p class="text-[10px] text-gray-500 mt-0.5">Last Active</p>
            </div>
          </div>

          <!-- Meta details -->
          <dl class="space-y-3 text-sm">
            <div class="flex items-center justify-between">
              <dt class="text-gray-500">User ID</dt>
              <dd class="font-mono text-xs text-gray-700 dark:text-gray-300">{{ user.id }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-gray-500">Member Since</dt>
              <dd class="text-gray-700 dark:text-gray-300 font-medium">{{ user.joinedLabel }}</dd>
            </div>
          </dl>
        </template>

        <div class="border-t border-gray-200 dark:border-[#1a3028]" />

        <!-- Footer -->
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="outline" @click="emit('update:open', false)">Close</UButton>
          <UButton color="primary" icon="i-lucide-pencil" @click="emit('edit')">Edit User</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
