<script setup lang="ts">
interface Column {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
  class?: string
}

const props = defineProps<{
  columns: Column[]
  rows: Record<string, unknown>[]
  currentPage?: number
  totalPages?: number
  totalCount?: number
  emptyIcon?: string
  emptyText?: string
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const alignClass: Record<string, string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
}

function colAlign(col: Column) {
  return alignClass[col.align ?? 'left']
}

const pagesList = computed<(number | null)[]>(() => {
  const total = props.totalPages ?? 1
  const current = props.currentPage ?? 1
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, null, total]
  if (current >= total - 2) return [1, null, total - 2, total - 1, total]
  return [1, null, current, null, total]
})

function goToPage(page: number) {
  const total = props.totalPages ?? 1
  if (page >= 1 && page <= total) emit('update:currentPage', page)
}
</script>

<template>
  <div class="border border-gray-200 dark:border-[#1a3028] rounded-xl overflow-hidden bg-white dark:bg-transparent">
    <!-- Toolbar slot -->
    <div v-if="$slots.toolbar" class="px-5 py-4 border-b border-gray-200 dark:border-[#1a3028]">
      <slot name="toolbar" />
    </div>

    <!-- Subheader slot -->
    <div v-if="$slots.subheader" class="px-5 py-2.5 border-b border-gray-200 dark:border-[#1a3028]">
      <slot name="subheader" />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-[#1a3028]">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500"
              :class="[colAlign(col), col.class]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="i"
            class="border-b border-gray-100 dark:border-[#1a3028]/60 hover:bg-gray-50 dark:hover:bg-white/2 transition-colors group"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-5 py-4"
              :class="colAlign(col)"
            >
              <slot :name="col.key" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length" class="px-5 py-12 text-center">
              <slot name="empty">
                <UIcon
                  :name="emptyIcon ?? 'i-lucide-inbox'"
                  class="size-8 mx-auto mb-3 text-gray-400 dark:text-gray-700"
                />
                <p class="text-sm text-gray-500 dark:text-gray-600">
                  {{ emptyText ?? 'No data found.' }}
                </p>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages && totalPages > 0"
      class="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-[#1a3028]"
    >
      <div class="flex items-center gap-1">
        <!-- Prev -->
        <UButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="ghost"
          size="xs"
          :disabled="(currentPage ?? 1) <= 1"
          @click="goToPage((currentPage ?? 1) - 1)"
        />

        <!-- Page numbers -->
        <template v-for="(pg, i) in pagesList" :key="i">
          <span v-if="pg === null" class="px-1 text-gray-400 dark:text-gray-600 text-sm select-none">…</span>
          <UButton
            v-else
            :color="pg === currentPage ? 'primary' : 'neutral'"
            :variant="pg === currentPage ? 'solid' : 'ghost'"
            size="xs"
            class="min-w-[32px] justify-center h-[32px]"
            @click="goToPage(pg)"
          >
            {{ pg }}
          </UButton>
        </template>

        <!-- Next -->
        <UButton
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="ghost"
          size="xs"
          :disabled="(currentPage ?? 1) >= (totalPages ?? 1)"
          @click="goToPage((currentPage ?? 1) + 1)"
        />
      </div>

      <!-- Count -->
      <slot name="pagination-info">
        <span v-if="totalCount !== undefined" class="text-xs text-gray-500 dark:text-gray-600">
          {{ totalCount.toLocaleString() }} total
        </span>
      </slot>
    </div>
  </div>
</template>
