<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex items-start justify-between gap-4">
    <div class="min-w-0">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ title }}</h1>
      <p v-if="description" class="text-sm text-gray-500 mt-0.5">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
