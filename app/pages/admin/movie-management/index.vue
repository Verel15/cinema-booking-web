<script setup lang="ts">
import type { Movie, MovieStatus } from '~/types/admin'
import type { MovieFormData } from '~/composables/useAdminMovies'

definePageMeta({ layout: 'admin' })

const {
  paginatedMovies,
  statusFilter,
  currentPage,
  totalPages,
  totalFiltered,
  searchQuery,
  stats,
  setStatusFilter,
  goToPage,
  createMovie,
  updateMovie,
  deleteMovie,
} = useAdminMovies()

// ── Modal state ────────────────────────────────────────────────────────────────
const isAddOpen = ref(false)
const isEditOpen = ref(false)
const isViewOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedMovie = ref<Movie | null>(null)

function openAdd() {
  selectedMovie.value = null
  isAddOpen.value = true
}

function openView(movie: Movie) {
  selectedMovie.value = movie
  isViewOpen.value = true
}

function openEdit(movie: Movie) {
  selectedMovie.value = movie
  isViewOpen.value = false
  isEditOpen.value = true
}

function openDelete(movie: Movie) {
  selectedMovie.value = movie
  isDeleteOpen.value = true
}

function handleCreate(data: MovieFormData) {
  createMovie(data)
  isAddOpen.value = false
}

function handleUpdate(data: MovieFormData) {
  if (!selectedMovie.value) return
  updateMovie(selectedMovie.value.id, data)
  isEditOpen.value = false
}

function handleDelete() {
  if (!selectedMovie.value) return
  deleteMovie(selectedMovie.value.id)
  isDeleteOpen.value = false
  selectedMovie.value = null
}

// ── Table columns ──────────────────────────────────────────────────────────────
const columns = [
  { key: 'movieInfo', label: 'Movie' },
  { key: 'genres', label: 'Genres' },
  { key: 'director', label: 'Director' },
  { key: 'status', label: 'Status', align: 'center' as const },
  { key: 'rating', label: 'Rating', align: 'center' as const },
  { key: 'duration', label: 'Duration', align: 'right' as const },
  { key: 'actions', label: 'Actions', align: 'center' as const },
]

// ── Filter tabs ────────────────────────────────────────────────────────────────
const statusTabs: { label: string; value: MovieStatus | 'ALL' }[] = [
  { label: 'All Movies', value: 'ALL' },
  { label: 'Now Showing', value: 'NOW_SHOWING' },
  { label: 'Coming Soon', value: 'COMING_SOON' },
  { label: 'Ended', value: 'ENDED' },
]

type BadgeColor = 'success' | 'info' | 'neutral' | 'warning'

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

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

const tableRows = computed(() =>
  paginatedMovies.value.map((m) => ({ ...m } as Record<string, unknown>)),
)

const paginatedRaw = computed(() => paginatedMovies.value)
</script>

<template>
  <div class="p-6 space-y-6 text-gray-900 dark:text-white">

    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <AdminPageHeader
      title="Movie Management"
      description="Manage the movie catalogue, update showtimes availability, and track ratings."
    >
      <template #actions>
        <UButton icon="i-lucide-download" color="neutral" variant="outline" size="sm">
          Export
        </UButton>
        <UButton icon="i-lucide-plus" color="primary" size="sm" @click="openAdd">
          Add Movie
        </UButton>
      </template>
    </AdminPageHeader>

    <!-- ── Stats Cards ─────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard
        label="Total Movies"
        :value="stats.total.toLocaleString()"
        sub="In catalogue"
        icon="i-lucide-clapperboard"
      />
      <AdminStatCard
        label="Now Showing"
        :value="stats.nowShowing.toLocaleString()"
        sub="Active screenings"
        icon="i-lucide-play-circle"
      />
      <AdminStatCard
        label="Coming Soon"
        :value="stats.comingSoon.toLocaleString()"
        sub="Upcoming releases"
        icon="i-lucide-clock"
      />
      <AdminStatCard
        label="Avg. Rating"
        :value="stats.avgRating"
        sub="Across all movies"
        icon="i-lucide-star"
      />
    </div>

    <!-- ── Data Table ──────────────────────────────────────────────── -->
    <AdminDataTable
      :columns="columns"
      :rows="tableRows"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-count="totalFiltered"
      empty-icon="i-lucide-clapperboard"
      empty-text="No movies found matching your filters."
      @update:current-page="goToPage"
    >
      <!-- Toolbar -->
      <template #toolbar>
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-1">
            <UButton
              v-for="tab in statusTabs"
              :key="tab.value"
              :color="statusFilter === tab.value ? 'primary' : 'neutral'"
              :variant="statusFilter === tab.value ? 'solid' : 'ghost'"
              size="sm"
              @click="setStatusFilter(tab.value)"
            >
              {{ tab.label }}
            </UButton>
          </div>
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="Search title or director…"
            size="sm"
            color="neutral"
          />
        </div>
      </template>

      <!-- Subheader -->
      <template #subheader>
        <span class="text-xs text-gray-500">
          Showing
          <span class="text-gray-700 dark:text-gray-300 font-medium">{{ Math.min(5, totalFiltered) }}</span>
          of
          <span class="text-gray-700 dark:text-gray-300 font-medium">{{ totalFiltered }}</span>
          movies
        </span>
      </template>

      <!-- Cell: poster + title -->
      <template #movieInfo="{ row }">
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-white/5 shrink-0 flex items-center justify-center ring-1 ring-gray-200 dark:ring-white/5">
            <img
              v-if="row.poster_url"
              :src="String(row.poster_url)"
              class="w-full h-full object-cover"
              alt="poster"
            />
            <UIcon v-else name="i-lucide-film" class="size-4 text-gray-400" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[180px]">{{ row.title }}</p>
            <div class="flex items-center gap-1 mt-0.5">
              <UBadge v-if="row.is_premium" color="warning" variant="soft" size="sm">Premium</UBadge>
              <UBadge color="neutral" variant="outline" size="sm">{{ row.age_rating }}</UBadge>
            </div>
          </div>
        </div>
      </template>

      <!-- Cell: genres -->
      <template #genres="{ row }">
        <div class="flex flex-wrap gap-1 max-w-[160px]">
          <UBadge
            v-for="g in (row.genres as string[]).slice(0, 2)"
            :key="g"
            color="primary"
            variant="soft"
            size="sm"
          >
            {{ g }}
          </UBadge>
          <UBadge
            v-if="(row.genres as string[]).length > 2"
            color="neutral"
            variant="soft"
            size="sm"
          >
            +{{ (row.genres as string[]).length - 2 }}
          </UBadge>
        </div>
      </template>

      <!-- Cell: director -->
      <template #director="{ row }">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ row.director }}</span>
      </template>

      <!-- Cell: status -->
      <template #status="{ row }">
        <UBadge :color="statusColor[row.status as MovieStatus]" variant="soft" size="sm">
          {{ statusLabel[row.status as MovieStatus] }}
        </UBadge>
      </template>

      <!-- Cell: rating -->
      <template #rating="{ row }">
        <div class="flex items-center justify-center gap-1">
          <UIcon name="i-lucide-star" class="size-3.5 text-amber-400" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
            {{ Number(row.rating_score) > 0 ? Number(row.rating_score).toFixed(1) : '—' }}
          </span>
        </div>
      </template>

      <!-- Cell: duration -->
      <template #duration="{ row }">
        <span class="text-sm text-gray-500 dark:text-gray-400 tabular-nums">
          {{ formatDuration(Number(row.duration_minutes)) }}
        </span>
      </template>

      <!-- Cell: actions -->
      <template #actions="{ row }">
        <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <UButton
            icon="i-lucide-eye"
            color="neutral"
            variant="ghost"
            size="xs"
            title="View"
            @click="openView(paginatedRaw.find((m) => m.id === row.id)!)"
          />
          <UButton
            icon="i-lucide-pencil"
            color="neutral"
            variant="ghost"
            size="xs"
            title="Edit"
            @click="openEdit(paginatedRaw.find((m) => m.id === row.id)!)"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="xs"
            title="Delete"
            @click="openDelete(paginatedRaw.find((m) => m.id === row.id)!)"
          />
        </div>
      </template>
    </AdminDataTable>

    <!-- ── Modals ──────────────────────────────────────────────────── -->
    <AdminMovieManagementMovieFormModal
      :open="isAddOpen"
      mode="create"
      @update:open="isAddOpen = $event"
      @save="handleCreate"
    />

    <AdminMovieManagementMovieFormModal
      :open="isEditOpen"
      mode="edit"
      :movie="selectedMovie"
      @update:open="isEditOpen = $event"
      @save="handleUpdate"
    />

    <AdminMovieManagementMovieViewModal
      :open="isViewOpen"
      :movie="selectedMovie"
      @update:open="isViewOpen = $event"
      @edit="openEdit(selectedMovie!)"
    />

    <AdminMovieManagementMovieDeleteModal
      :open="isDeleteOpen"
      :movie="selectedMovie"
      @update:open="isDeleteOpen = $event"
      @confirm="handleDelete"
    />
  </div>
</template>
