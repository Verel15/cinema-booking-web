<script setup lang="ts">
import type { Movie } from '~/types/admin'

defineProps<{
  open: boolean
  movie: Movie | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="p-6 space-y-5">
        <div class="flex items-start gap-4">
          <div class="size-12 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-trash-2" class="size-5 text-red-500" />
          </div>
          <div>
            <h2 class="text-base font-bold text-gray-900 dark:text-white">Delete Movie</h2>
            <p class="text-sm text-gray-500 mt-1 leading-relaxed">
              Are you sure you want to delete
              <span class="font-semibold text-gray-700 dark:text-gray-300">{{ movie?.title }}</span>?
              This will permanently remove the movie and all associated data.
            </p>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-[#1a3028]" />

        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="outline" @click="emit('update:open', false)">Cancel</UButton>
          <UButton color="error" icon="i-lucide-trash-2" @click="emit('confirm')">Delete Movie</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
