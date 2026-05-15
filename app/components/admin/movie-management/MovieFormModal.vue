<script setup lang="ts">
import type { Movie, MovieStatus, AgeRating } from '~/types/admin'
import type { MovieFormData, MovieCastFormItem } from '~/composables/useAdminMovies'

const props = defineProps<{
  open: boolean
  mode: 'create' | 'edit'
  movie?: Movie | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  save: [data: MovieFormData]
}>()

const ALL_GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi',
  'Superhero', 'Thriller', 'War', 'Western',
]

const AGE_RATINGS: AgeRating[] = ['G', 'PG', 'PG-13', 'R', 'NC-17']

const STATUS_OPTIONS: { value: MovieStatus; label: string; icon: string; active: string; iconColor: string; iconBg: string }[] = [
  {
    value: 'NOW_SHOWING',
    label: 'Now Showing',
    icon: 'i-lucide-play-circle',
    active: 'border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
  },
  {
    value: 'COMING_SOON',
    label: 'Coming Soon',
    icon: 'i-lucide-clock',
    active: 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-500/20',
  },
  {
    value: 'ENDED',
    label: 'Ended',
    icon: 'i-lucide-archive',
    active: 'border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-500/10',
    iconColor: 'text-gray-500 dark:text-gray-400',
    iconBg: 'bg-gray-100 dark:bg-gray-500/15',
  },
]

function emptyForm(): MovieFormData {
  return {
    title: '',
    synopsis: '',
    duration_minutes: 120,
    release_date: '',
    age_rating: 'PG-13',
    language: 'English',
    director: '',
    poster_url: '',
    backdrop_url: '',
    trailer_url: '',
    status: 'NOW_SHOWING',
    is_premium: false,
    genres: [],
    cast: [],
  }
}

const form = reactive<MovieFormData>(emptyForm())
const errors = reactive({ title: '', director: '', synopsis: '', release_date: '' })
const newCast = reactive<MovieCastFormItem>({ actor_name: '', role_name: '', image_url: '' })
const showCastForm = ref(false)

watch(
  () => [props.open, props.movie] as const,
  ([open, movie]) => {
    if (!open) return
    if (props.mode === 'edit' && movie) {
      form.title = movie.title
      form.synopsis = movie.synopsis
      form.duration_minutes = movie.duration_minutes
      form.release_date = movie.release_date.slice(0, 10)
      form.age_rating = movie.age_rating
      form.language = movie.language
      form.director = movie.director
      form.poster_url = movie.poster_url
      form.backdrop_url = movie.backdrop_url
      form.trailer_url = movie.trailer_url
      form.status = movie.status
      form.is_premium = movie.is_premium
      form.genres = [...movie.genres]
      form.cast = movie.cast.map((c) => ({ id: c.id, actor_name: c.actor_name, role_name: c.role_name, image_url: c.image_url }))
    } else {
      Object.assign(form, emptyForm())
    }
    errors.title = ''
    errors.director = ''
    errors.synopsis = ''
    errors.release_date = ''
    newCast.actor_name = ''
    newCast.role_name = ''
    newCast.image_url = ''
    showCastForm.value = false
  },
  { immediate: true },
)

function toggleGenre(genre: string) {
  const idx = form.genres.indexOf(genre)
  if (idx === -1) form.genres.push(genre)
  else form.genres.splice(idx, 1)
}

function addCast() {
  if (!newCast.actor_name.trim() || !newCast.role_name.trim()) return
  form.cast.push({ actor_name: newCast.actor_name.trim(), role_name: newCast.role_name.trim(), image_url: newCast.image_url.trim() })
  newCast.actor_name = ''
  newCast.role_name = ''
  newCast.image_url = ''
  showCastForm.value = false
}

function removeCast(index: number) {
  form.cast.splice(index, 1)
}

function validate(): boolean {
  errors.title = form.title.trim() ? '' : 'Title is required'
  errors.director = form.director.trim() ? '' : 'Director is required'
  errors.synopsis = form.synopsis.trim() ? '' : 'Synopsis is required'
  errors.release_date = form.release_date ? '' : 'Release date is required'
  return !errors.title && !errors.director && !errors.synopsis && !errors.release_date
}

function handleSave() {
  if (!validate()) return
  emit('save', { ...form, genres: [...form.genres], cast: form.cast.map((c) => ({ ...c })) })
}

function close() {
  emit('update:open', false)
}

const statusOpt = computed(() => STATUS_OPTIONS.find((s) => s.value === form.status))
</script>

<template>
  <UModal :open="open" :ui="{ content: 'sm:max-w-2xl' }" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="bg-white dark:bg-[#0a1a12] rounded-xl overflow-hidden flex flex-col max-h-[90vh]">

        <!-- ── Header ─────────────────────────────────────────────── -->
        <div class="bg-linear-to-br from-primary/8 via-primary/3 to-transparent border-b border-gray-200 dark:border-[#1a3028] px-6 pt-5 pb-5 shrink-0">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <div class="size-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <UIcon :name="mode === 'create' ? 'i-lucide-clapperboard' : 'i-lucide-film'" class="size-3.5 text-primary" />
              </div>
              <div>
                <h2 class="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {{ mode === 'create' ? 'Add New Movie' : 'Edit Movie' }}
                </h2>
                <p class="text-[11px] text-gray-400">
                  {{ mode === 'create' ? 'Add a new movie to the catalogue' : 'Update movie details' }}
                </p>
              </div>
            </div>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xs" @click="close" />
          </div>

          <!-- Preview strip -->
          <div class="flex items-center gap-3">
            <div class="size-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-white/5 shrink-0 flex items-center justify-center ring-1 ring-white/10">
              <img v-if="form.poster_url" :src="form.poster_url" class="w-full h-full object-cover" alt="poster" @error="($event.target as HTMLImageElement).style.display='none'" />
              <UIcon v-else name="i-lucide-image" class="size-5 text-gray-400" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ form.title || 'Movie Title' }}</p>
              <p class="text-xs text-gray-400 truncate">{{ form.director || 'Director' }}</p>
              <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                <UBadge
                  :color="form.status === 'NOW_SHOWING' ? 'success' : form.status === 'COMING_SOON' ? 'info' : 'neutral'"
                  variant="soft"
                  size="sm"
                >
                  {{ statusOpt?.label }}
                </UBadge>
                <UBadge v-if="form.is_premium" color="warning" variant="soft" size="sm">
                  Premium
                </UBadge>
                <UBadge v-if="form.age_rating" color="neutral" variant="outline" size="sm">
                  {{ form.age_rating }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Scrollable Body ────────────────────────────────────── -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          <!-- Section: Basic Info -->
          <div class="space-y-4">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Basic Info</p>

            <UFormField label="Title" required :error="errors.title">
              <UInput v-model="form.title" placeholder="e.g. Dune: Part Two" icon="i-lucide-film" :color="errors.title ? 'error' : 'neutral'" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Director" required :error="errors.director">
                <UInput v-model="form.director" placeholder="e.g. Denis Villeneuve" icon="i-lucide-user" :color="errors.director ? 'error' : 'neutral'" class="w-full" />
              </UFormField>
              <UFormField label="Language">
                <UInput v-model="form.language" placeholder="e.g. English" icon="i-lucide-languages" color="neutral" class="w-full" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Duration (minutes)">
                <UInput v-model.number="form.duration_minutes" type="number" min="1" placeholder="120" icon="i-lucide-clock" color="neutral" class="w-full" />
              </UFormField>
              <UFormField label="Release Date" required :error="errors.release_date">
                <UInput v-model="form.release_date" type="date" icon="i-lucide-calendar" :color="errors.release_date ? 'error' : 'neutral'" class="w-full" />
              </UFormField>
            </div>

            <!-- Age Rating chips -->
            <div class="space-y-2">
              <label class="text-xs font-medium text-gray-600 dark:text-gray-400">Age Rating</label>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="rating in AGE_RATINGS"
                  :key="rating"
                  type="button"
                  class="px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-150"
                  :class="
                    form.age_rating === rating
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-[#1a3028] text-gray-500 hover:border-gray-300 dark:hover:border-[#243d30]'
                  "
                  @click="form.age_rating = rating"
                >
                  {{ rating }}
                </button>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Section: Status & Premium -->
          <div class="space-y-4">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Status & Availability</p>

            <div class="space-y-2">
              <label class="text-xs font-medium text-gray-600 dark:text-gray-400">Showing Status</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="s in STATUS_OPTIONS"
                  :key="s.value"
                  type="button"
                  class="relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-150 text-center"
                  :class="
                    form.status === s.value
                      ? s.active
                      : 'border-gray-200 dark:border-[#1a3028] hover:border-gray-300 dark:hover:border-[#243d30] hover:bg-gray-50 dark:hover:bg-white/2'
                  "
                  @click="form.status = s.value"
                >
                  <div
                    class="size-7 rounded-lg flex items-center justify-center transition-colors"
                    :class="form.status === s.value ? s.iconBg : 'bg-gray-100 dark:bg-white/5'"
                  >
                    <UIcon :name="s.icon" class="size-4 transition-colors" :class="form.status === s.value ? s.iconColor : 'text-gray-400'" />
                  </div>
                  <p class="text-[11px] font-bold text-gray-700 dark:text-gray-200 leading-tight">{{ s.label }}</p>
                  <div v-if="form.status === s.value" class="absolute top-1.5 right-1.5 size-3.5 rounded-full bg-primary flex items-center justify-center">
                    <UIcon name="i-lucide-check" class="size-2.5 text-white" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Premium toggle -->
            <div
              class="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors cursor-pointer"
              :class="
                form.is_premium
                  ? 'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-500/10'
                  : 'border-gray-200 dark:border-[#1a3028] hover:border-gray-300 dark:hover:border-[#243d30]'
              "
              @click="form.is_premium = !form.is_premium"
            >
              <div class="flex items-center gap-3">
                <div
                  class="size-8 rounded-lg flex items-center justify-center transition-colors"
                  :class="form.is_premium ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-gray-100 dark:bg-white/5'"
                >
                  <UIcon name="i-lucide-crown" class="size-4 transition-colors" :class="form.is_premium ? 'text-amber-500' : 'text-gray-400'" />
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-800 dark:text-gray-200">Premium Movie</p>
                  <p class="text-[10px] text-gray-400">Requires premium membership to book</p>
                </div>
              </div>
              <div
                class="w-9 h-5 rounded-full flex items-center transition-colors relative"
                :class="form.is_premium ? 'bg-amber-400' : 'bg-gray-200 dark:bg-white/10'"
              >
                <div
                  class="size-3.5 rounded-full bg-white shadow-sm absolute transition-all"
                  :class="form.is_premium ? 'left-[18px]' : 'left-[3px]'"
                />
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Section: Synopsis -->
          <div class="space-y-4">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Synopsis</p>
            <UFormField label="Synopsis" required :error="errors.synopsis">
              <UTextarea
                v-model="form.synopsis"
                placeholder="Enter movie synopsis…"
                :rows="3"
                :color="errors.synopsis ? 'error' : 'neutral'"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Section: Media URLs -->
          <div class="space-y-4">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Media URLs</p>
            <UFormField label="Poster URL">
              <UInput v-model="form.poster_url" placeholder="https://…" icon="i-lucide-image" color="neutral" class="w-full" />
            </UFormField>
            <UFormField label="Backdrop URL">
              <UInput v-model="form.backdrop_url" placeholder="https://…" icon="i-lucide-wallpaper" color="neutral" class="w-full" />
            </UFormField>
            <UFormField label="Trailer URL">
              <UInput v-model="form.trailer_url" placeholder="https://…" icon="i-lucide-play" color="neutral" class="w-full" />
            </UFormField>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Section: Genres -->
          <div class="space-y-3">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Genres</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="genre in ALL_GENRES"
                :key="genre"
                type="button"
                class="px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150"
                :class="
                  form.genres.includes(genre)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 dark:border-[#1a3028] text-gray-500 hover:border-gray-300 dark:hover:border-[#243d30] hover:bg-gray-50 dark:hover:bg-white/2'
                "
                @click="toggleGenre(genre)"
              >
                {{ genre }}
              </button>
            </div>
            <p v-if="form.genres.length" class="text-[11px] text-gray-400">
              Selected: <span class="text-primary font-medium">{{ form.genres.join(', ') }}</span>
            </p>
          </div>

          <div class="border-t border-gray-200 dark:border-[#1a3028]" />

          <!-- Section: Cast -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Cast Members</p>
              <UButton icon="i-lucide-plus" color="primary" variant="ghost" size="xs" @click="showCastForm = !showCastForm">
                Add
              </UButton>
            </div>

            <!-- Cast list -->
            <div v-if="form.cast.length" class="space-y-2">
              <div
                v-for="(member, i) in form.cast"
                :key="i"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-white/4 border border-gray-200 dark:border-[#1a3028]"
              >
                <div class="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-user" class="size-3.5 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{{ member.actor_name }}</p>
                  <p class="text-[11px] text-gray-400 truncate">{{ member.role_name }}</p>
                </div>
                <UButton icon="i-lucide-x" color="error" variant="ghost" size="xs" @click="removeCast(i)" />
              </div>
            </div>
            <p v-else class="text-xs text-gray-400">No cast members added yet.</p>

            <!-- Add cast inline form -->
            <div v-if="showCastForm" class="border border-dashed border-gray-300 dark:border-[#1a3028] rounded-xl p-4 space-y-3 bg-gray-50/50 dark:bg-white/2">
              <div class="grid grid-cols-2 gap-3">
                <UFormField label="Actor Name">
                  <UInput v-model="newCast.actor_name" placeholder="e.g. Timothée Chalamet" color="neutral" class="w-full" size="sm" />
                </UFormField>
                <UFormField label="Role Name">
                  <UInput v-model="newCast.role_name" placeholder="e.g. Paul Atreides" color="neutral" class="w-full" size="sm" />
                </UFormField>
              </div>
              <div class="flex gap-2">
                <UButton color="primary" size="sm" icon="i-lucide-plus" :disabled="!newCast.actor_name.trim() || !newCast.role_name.trim()" @click="addCast">
                  Add Member
                </UButton>
                <UButton color="neutral" variant="ghost" size="sm" @click="showCastForm = false">Cancel</UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Footer ─────────────────────────────────────────────── -->
        <div class="border-t border-gray-200 dark:border-[#1a3028] px-6 py-4 flex gap-3 shrink-0 bg-white dark:bg-[#0a1a12]">
          <UButton color="neutral" variant="outline" class="flex-1" size="md" @click="close">Cancel</UButton>
          <UButton color="primary" class="flex-1" size="md" @click="handleSave">
            <UIcon :name="mode === 'create' ? 'i-lucide-plus' : 'i-lucide-check'" class="size-4" />
            {{ mode === 'create' ? 'Create Movie' : 'Save Changes' }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
