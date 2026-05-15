<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  sub?: string
  change?: string
  changePositive?: boolean
  icon: string
  live?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="border border-gray-200 dark:border-[#1a3028] rounded-xl p-5 hover:border-gray-300 dark:hover:border-[#2a4838] transition-colors bg-white dark:bg-transparent"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
        {{ label }}
      </p>
      <span
        class="size-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/6 border border-gray-200 dark:border-white/10"
      >
        <UIcon :name="icon" class="size-3.5 text-gray-500 dark:text-gray-400" />
      </span>
    </div>

    <!-- Value -->
    <p class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ value }}</p>

    <!-- Sub / Change -->
    <div class="mt-2">
      <!-- Live indicator -->
      <template v-if="live">
        <span class="flex items-center gap-1.5 text-xs font-medium text-emerald-500 dark:text-emerald-400">
          <span class="relative flex size-2">
            <span
              class="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {{ sub }}
        </span>
      </template>

      <!-- Change badge -->
      <template v-else-if="change !== undefined">
        <div class="flex items-center gap-2">
          <UBadge
            :color="changePositive ? 'success' : 'error'"
            variant="soft"
            size="sm"
            :leading-icon="changePositive ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
          >
            {{ change }}
          </UBadge>
          <span v-if="sub" class="text-xs text-gray-500">{{ sub }}</span>
        </div>
      </template>

      <!-- Sub text only -->
      <template v-else-if="sub">
        <p class="text-xs text-gray-500">{{ sub }}</p>
      </template>
    </div>
  </div>
</template>
