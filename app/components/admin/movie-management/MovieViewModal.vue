<script setup lang="ts">
import type { Movie, MovieStatus } from '~/types/admin'

defineProps<{
  open: boolean
  movie: Movie | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  edit: []
}>()

type BadgeColor = 'success' | 'info' | 'neutral' | 'warning' | 'error'

const statusColor: Record<MovieStatus, BadgeColor> = {
  NOW_SHOWING: 'success',
  COMING_SOON: 'info',
  ENDED: 'neutral',
}

const statusLabel: Record<MovieStatus, string> = {
  NOW_SHOWING: 'Now Showing',
  COMING_SOON: 'Coming Soon',
  ENDED: 'Ended',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}
</script>

<template>
  <UModal :open="open" :ui="{ content: 'sm:max-w-xl' }" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="bg-white dark:bg-[#0a1a12] rounded-xl overflow-hidden flex flex-col max-h-[90vh]">

        <!-- Backdrop + Poster wrapper (relative so poster can overflow below) -->
        <div class="relative shrink-0">
          <!-- Backdrop image (clips its own content) -->
          <div class="h-36 bg-gray-200 dark:bg-white/5 overflow-hidden relative">
            <img
              v-if="movie?.backdrop_url"
              :src="movie.backdrop_url"
              class="w-full h-full object-cover opacity-60"
              alt="backdrop"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <!-- Close button -->
            <UButton
              class="absolute top-3 right-3"
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              @click="emit('update:open', false)"
            />
          </div>

          <!-- Poster — outside backdrop div so it won't be clipped -->
          <div class="absolute bottom-0 left-6 translate-y-1/2 size-20 rounded-xl overflow-hidden ring-2 ring-white dark:ring-[#0a1a12] bg-gray-300 dark:bg-white/10 flex items-center justify-center shadow-lg z-10">
            <img v-if="movie?.poster_url" :src="movie.poster_url" class="w-full h-full object-cover" alt="poster" />
            <UIcon v-else name="i-lucide-film" class="size-8 text-gray-400" />
          </div>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto px-6 pt-14 pb-5 space-y-4">
          <template v-if="movie">
            <!-- Title row -->
            <div>
              <div class="flex items-start gap-2 flex-wrap">
                <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">{{ movie.title }}</h2>
                <UBadge v-if="movie.is_premium" color="warning" variant="soft" size="sm">Premium</UBadge>
              </div>
              <p class="text-sm text-gray-500 mt-0.5">Directed by {{ movie.director }}</p>
              <div class="flex items-center gap-2 mt-2 flex-wrap">
                <UBadge :color="statusColor[movie.status]" variant="soft" size="sm">{{ statusLabel[movie.status] }}</UBadge>
                <UBadge color="neutral" variant="outline" size="sm">{{ movie.age_rating }}</UBadge>
                <UBadge color="neutral" variant="soft" size="sm">{{ movie.language }}</UBadge>
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-[#1a3028]" />

            <!-- Quick stats -->
            <div class="grid grid-cols-3 gap-3">
              <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                <p class="text-base font-bold text-gray-900 dark:text-white">
                  <UIcon name="i-lucide-star" class="size-3.5 text-amber-400 inline-block mr-0.5 -mt-0.5" />
                  {{ movie.rating_score > 0 ? movie.rating_score.toFixed(1) : '—' }}
                </p>
                <p class="text-[10px] text-gray-500 mt-0.5">Rating</p>
              </div>
              <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                <p class="text-base font-bold text-gray-900 dark:text-white">{{ formatDuration(movie.duration_minutes) }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">Duration</p>
              </div>
              <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                <p class="text-base font-bold text-gray-900 dark:text-white tabular-nums">{{ movie.genres.length }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">Genres</p>
              </div>
            </div>

            <!-- Synopsis -->
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Synopsis</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ movie.synopsis }}</p>
            </div>

            <!-- Genres -->
            <div v-if="movie.genres.length">
              <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Genres</p>
              <div class="flex flex-wrap gap-1.5">
                <UBadge v-for="g in movie.genres" :key="g" color="primary" variant="soft" size="sm">{{ g }}</UBadge>
              </div>
            </div>

            <!-- Details list -->
            <dl class="space-y-2.5 text-sm">
              <div class="flex items-center justify-between">
                <dt class="text-gray-500">Release Date</dt>
                <dd class="font-medium text-gray-700 dark:text-gray-300">{{ formatDate(movie.release_date) }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-gray-500">Movie ID</dt>
                <dd class="font-mono text-xs text-gray-500 dark:text-gray-500 truncate max-w-[200px]">{{ movie.id }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-gray-500">Last Updated</dt>
                <dd class="font-medium text-gray-700 dark:text-gray-300">{{ formatDate(movie.updated_at) }}</dd>
              </div>
            </dl>

            <!-- Cast -->
            <div v-if="movie.cast.length">
              <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Cast</p>
              <div class="space-y-2">
                <div
                  v-for="member in movie.cast"
                  :key="member.id"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-white/4 border border-gray-100 dark:border-[#1a3028]"
                >
                  <div class="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <UIcon name="i-lucide-user" class="size-3.5 text-primary" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{{ member.actor_name }}</p>
                    <p class="text-[11px] text-gray-400">as {{ member.role_name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 dark:border-[#1a3028] px-6 py-4 flex justify-end gap-2 shrink-0 bg-white dark:bg-[#0a1a12]">
          <UButton color="neutral" variant="outline" @click="emit('update:open', false)">Close</UButton>
          <UButton color="primary" icon="i-lucide-pencil" @click="emit('edit')">Edit Movie</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
