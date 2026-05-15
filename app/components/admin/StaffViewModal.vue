<script setup lang="ts">
import type { AdminStaff, StaffRole, StaffStatus, ShiftType } from '~/types/admin'

defineProps<{
  open: boolean
  staff: AdminStaff | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  edit: []
}>()

type BadgeColor = 'warning' | 'success' | 'primary' | 'info' | 'neutral' | 'error'

const roleColor: Record<StaffRole, BadgeColor> = {
  'General Manager': 'warning',
  'Branch Manager': 'warning',
  Supervisor: 'primary',
  Cashier: 'info',
  Projectionist: 'success',
  'Security Officer': 'neutral',
  Technician: 'success',
  'Concessions Staff': 'error',
}

const statusColor: Record<StaffStatus, BadgeColor> = {
  active: 'success',
  on_leave: 'warning',
  part_time: 'info',
}

const statusLabel: Record<StaffStatus, string> = {
  active: 'Active',
  on_leave: 'On Leave',
  part_time: 'Part-Time',
}

const shiftIcon: Record<ShiftType, string> = {
  morning: 'i-lucide-sunrise',
  afternoon: 'i-lucide-sun',
  evening: 'i-lucide-sunset',
  night: 'i-lucide-moon',
}

const shiftLabel: Record<ShiftType, string> = {
  morning: 'Morning · 6AM–2PM',
  afternoon: 'Afternoon · 2PM–10PM',
  evening: 'Evening · 4PM–12AM',
  night: 'Night · 10PM–6AM',
}

function perfColor(score: number) {
  if (score >= 90) return 'text-emerald-500'
  if (score >= 75) return 'text-amber-500'
  return 'text-red-500'
}

function perfBarColor(score: number) {
  if (score >= 90) return 'bg-emerald-500'
  if (score >= 75) return 'bg-amber-500'
  return 'bg-red-500'
}
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="p-6 space-y-5">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Staff Profile</h2>
          <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="emit('update:open', false)" />
        </div>

        <div class="border-t border-gray-200 dark:border-[#1a3028]" />

        <template v-if="staff">
          <!-- Avatar + name -->
          <div class="flex items-center gap-4">
            <div
              class="size-16 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0 ring-2 ring-primary/30"
              :class="staff.avatarBg"
            >
              {{ staff.initials }}
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 dark:text-white">{{ staff.name }}</h3>
              <p class="text-sm text-gray-500">{{ staff.email }}</p>
              <div class="flex items-center gap-2 mt-1.5">
                <UBadge :color="roleColor[staff.role]" variant="soft" size="sm">{{ staff.role }}</UBadge>
                <UBadge :color="statusColor[staff.status]" variant="soft" size="sm">{{ statusLabel[staff.status] }}</UBadge>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Performance bar -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Performance Score</span>
              <span class="font-bold tabular-nums" :class="perfColor(staff.performanceScore)">
                {{ staff.performanceScore }}/100
              </span>
            </div>
            <div class="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="perfBarColor(staff.performanceScore)"
                :style="{ width: `${staff.performanceScore}%` }"
              />
            </div>
          </div>

          <!-- Detail grid -->
          <dl class="grid grid-cols-2 gap-3 text-sm">
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-white/5 space-y-0.5">
              <dt class="text-[10px] text-gray-500 uppercase tracking-widest">Cinema</dt>
              <dd class="font-semibold text-gray-800 dark:text-gray-200">{{ staff.cinema }}</dd>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-white/5 space-y-0.5">
              <dt class="text-[10px] text-gray-500 uppercase tracking-widest">Department</dt>
              <dd class="font-semibold text-gray-800 dark:text-gray-200">{{ staff.department }}</dd>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-white/5 space-y-0.5">
              <dt class="text-[10px] text-gray-500 uppercase tracking-widest">Shift</dt>
              <dd class="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                <UIcon :name="shiftIcon[staff.shift]" class="size-3.5" />
                {{ shiftLabel[staff.shift] }}
              </dd>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-white/5 space-y-0.5">
              <dt class="text-[10px] text-gray-500 uppercase tracking-widest">Phone</dt>
              <dd class="font-semibold text-gray-800 dark:text-gray-200">{{ staff.phone }}</dd>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-white/5 space-y-0.5">
              <dt class="text-[10px] text-gray-500 uppercase tracking-widest">Joined</dt>
              <dd class="font-semibold text-gray-800 dark:text-gray-200">{{ staff.joinedDate }}</dd>
            </div>
            <div v-if="staff.ticketsSold > 0" class="p-3 rounded-lg bg-gray-50 dark:bg-white/5 space-y-0.5">
              <dt class="text-[10px] text-gray-500 uppercase tracking-widest">Tickets Sold</dt>
              <dd class="font-semibold text-gray-800 dark:text-gray-200 tabular-nums">
                {{ staff.ticketsSold.toLocaleString() }}
              </dd>
            </div>
          </dl>
        </template>

        <div class="border-t border-gray-200 dark:border-[#1a3028]" />

        <!-- Footer -->
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="outline" @click="emit('update:open', false)">Close</UButton>
          <UButton color="primary" icon="i-lucide-pencil" @click="emit('edit')">Edit Staff</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
