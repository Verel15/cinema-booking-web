<script setup lang="ts">
import type { AdminStaff, StaffRole, StaffStatus, ShiftType } from '~/types/admin'
import type { StaffFormData } from '~/composables/useAdminStaff'

const props = defineProps<{
  open: boolean
  mode: 'create' | 'edit'
  staff?: AdminStaff | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  save: [data: StaffFormData]
}>()

const form = reactive<StaffFormData>({
  name: '',
  email: '',
  phone: '',
  role: 'Cashier',
  department: '',
  cinema: 'CineX Central',
  shift: 'morning',
  status: 'active',
  performanceScore: 80,
})

const errors = reactive({ name: '', email: '', phone: '', department: '' })

watch(
  () => [props.open, props.staff] as const,
  ([open, staff]) => {
    if (!open) return
    if (props.mode === 'edit' && staff) {
      form.name = staff.name
      form.email = staff.email
      form.phone = staff.phone
      form.role = staff.role
      form.department = staff.department
      form.cinema = staff.cinema
      form.shift = staff.shift
      form.status = staff.status
      form.performanceScore = staff.performanceScore
    } else {
      form.name = ''
      form.email = ''
      form.phone = ''
      form.role = 'Cashier'
      form.department = ''
      form.cinema = 'CineX Central'
      form.shift = 'morning'
      form.status = 'active'
      form.performanceScore = 80
    }
    errors.name = ''
    errors.email = ''
    errors.phone = ''
    errors.department = ''
  },
  { immediate: true },
)

// ── Options ────────────────────────────────────────────────────────────────────
const roleItems: { label: string; value: StaffRole }[] = [
  { label: 'General Manager', value: 'General Manager' },
  { label: 'Branch Manager', value: 'Branch Manager' },
  { label: 'Supervisor', value: 'Supervisor' },
  { label: 'Cashier', value: 'Cashier' },
  { label: 'Projectionist', value: 'Projectionist' },
  { label: 'Security Officer', value: 'Security Officer' },
  { label: 'Technician', value: 'Technician' },
  { label: 'Concessions Staff', value: 'Concessions Staff' },
]

const cinemaItems = [
  { label: 'CineX Central', value: 'CineX Central' },
  { label: 'CineX Siam', value: 'CineX Siam' },
  { label: 'CineX Rama 9', value: 'CineX Rama 9' },
]

const shiftCards = [
  { value: 'morning' as ShiftType, label: 'Morning', time: '6AM – 2PM', icon: 'i-lucide-sunrise', color: 'text-yellow-400', ring: 'ring-yellow-400/40' },
  { value: 'afternoon' as ShiftType, label: 'Afternoon', time: '2PM – 10PM', icon: 'i-lucide-sun', color: 'text-orange-400', ring: 'ring-orange-400/40' },
  { value: 'evening' as ShiftType, label: 'Evening', time: '4PM – 12AM', icon: 'i-lucide-sunset', color: 'text-purple-400', ring: 'ring-purple-400/40' },
  { value: 'night' as ShiftType, label: 'Night', time: '10PM – 6AM', icon: 'i-lucide-moon', color: 'text-blue-400', ring: 'ring-blue-400/40' },
]

const statusCards = [
  {
    value: 'active' as StaffStatus,
    label: 'Active',
    dot: 'bg-emerald-500',
    active: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300',
  },
  {
    value: 'on_leave' as StaffStatus,
    label: 'On Leave',
    dot: 'bg-amber-500',
    active: 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300',
  },
  {
    value: 'part_time' as StaffStatus,
    label: 'Part-Time',
    dot: 'bg-blue-500',
    active: 'bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-300',
  },
]

// ── Avatar preview ─────────────────────────────────────────────────────────────
const previewInitials = computed(() => {
  const parts = form.name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2)
})

const previewAvatarBg = computed(() =>
  props.mode === 'edit' && props.staff ? props.staff.avatarBg : 'bg-primary',
)

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

// ── Actions ────────────────────────────────────────────────────────────────────
function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : 'Valid email is required'
  errors.phone = form.phone.trim() ? '' : 'Phone is required'
  errors.department = form.department.trim() ? '' : 'Department is required'
  return !errors.name && !errors.email && !errors.phone && !errors.department
}

function handleSave() {
  if (!validate()) return
  emit('save', { ...form })
}

function close() {
  emit('update:open', false)
}
</script>

<template>
  <USlideover :open="open" side="right" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="flex flex-col h-full bg-white dark:bg-[#0a1a12]">

        <!-- ── Sticky Header with preview ──────────────────────────── -->
        <div class="shrink-0 bg-linear-to-br from-primary/8 via-transparent to-transparent border-b border-gray-200 dark:border-[#1a3028] px-6 pt-5 pb-6">
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2.5">
              <div class="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <UIcon
                  :name="mode === 'create' ? 'i-lucide-user-plus' : 'i-lucide-user-pen'"
                  class="size-4 text-primary"
                />
              </div>
              <div>
                <h2 class="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {{ mode === 'create' ? 'Add Staff Member' : 'Edit Staff Member' }}
                </h2>
                <p class="text-[11px] text-gray-400">
                  {{ mode === 'create' ? 'Create a new staff account' : 'Update staff information' }}
                </p>
              </div>
            </div>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="close" />
          </div>

          <!-- Live preview card -->
          <div class="flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-white/3 border border-gray-200/80 dark:border-[#1a3028]">
            <div
              class="size-12 rounded-xl flex items-center justify-center text-base font-bold text-white shrink-0 ring-2 ring-white/30 dark:ring-black/20 shadow-sm"
              :class="previewAvatarBg"
            >
              {{ previewInitials }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {{ form.name || 'Full Name' }}
              </p>
              <p class="text-xs text-gray-500 truncate">{{ form.role }} · {{ form.cinema }}</p>
              <p class="text-[11px] text-gray-400 truncate">{{ form.email || 'email@cinex.com' }}</p>
            </div>
          </div>
        </div>

        <!-- ── Scrollable Body ──────────────────────────────────────── -->
        <div class="flex-1 overflow-y-auto">
          <div class="px-6 py-5 space-y-7">

            <!-- Section: Personal Information -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div class="size-5 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <UIcon name="i-lucide-user" class="size-3 text-blue-500" />
                </div>
                <p class="text-[11px] font-bold uppercase tracking-widest text-gray-400">Personal Information</p>
              </div>

              <div class="space-y-3">
                <UFormField label="Full Name" required :error="errors.name">
                  <UInput
                    v-model="form.name"
                    placeholder="e.g. John Doe"
                    icon="i-lucide-user"
                    :color="errors.name ? 'error' : 'neutral'"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Email Address" required :error="errors.email">
                  <UInput
                    v-model="form.email"
                    type="email"
                    placeholder="e.g. john@cinex.com"
                    icon="i-lucide-mail"
                    :color="errors.email ? 'error' : 'neutral'"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Phone Number" required :error="errors.phone">
                  <UInput
                    v-model="form.phone"
                    placeholder="e.g. +66 81-234-5678"
                    icon="i-lucide-phone"
                    :color="errors.phone ? 'error' : 'neutral'"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </div>

            <!-- Section: Work Assignment -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div class="size-5 rounded-md bg-purple-500/10 flex items-center justify-center">
                  <UIcon name="i-lucide-briefcase" class="size-3 text-purple-500" />
                </div>
                <p class="text-[11px] font-bold uppercase tracking-widest text-gray-400">Work Assignment</p>
              </div>

              <div class="space-y-3">
                <UFormField label="Role">
                  <USelect
                    v-model="form.role"
                    :items="roleItems"
                    value-key="value"
                    icon="i-lucide-id-card"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Department" required :error="errors.department">
                  <UInput
                    v-model="form.department"
                    placeholder="e.g. Box Office"
                    icon="i-lucide-building-2"
                    :color="errors.department ? 'error' : 'neutral'"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Cinema Branch">
                  <USelect
                    v-model="form.cinema"
                    :items="cinemaItems"
                    value-key="value"
                    icon="i-lucide-map-pin"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </div>

            <!-- Section: Schedule -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div class="size-5 rounded-md bg-amber-500/10 flex items-center justify-center">
                  <UIcon name="i-lucide-clock" class="size-3 text-amber-500" />
                </div>
                <p class="text-[11px] font-bold uppercase tracking-widest text-gray-400">Schedule & Status</p>
              </div>

              <!-- Shift visual cards -->
              <UFormField label="Work Shift">
                <div class="grid grid-cols-2 gap-2 w-full">
                  <button
                    v-for="s in shiftCards"
                    :key="s.value"
                    type="button"
                    class="relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150"
                    :class="form.shift === s.value
                      ? 'border-primary/50 bg-primary/5 dark:bg-primary/8 ring-1 ring-primary/20'
                      : 'border-gray-200 dark:border-[#1a3028] hover:border-gray-300 dark:hover:border-[#243d30] hover:bg-gray-50 dark:hover:bg-white/2'"
                    @click="form.shift = s.value"
                  >
                    <div
                      class="size-8 rounded-lg flex items-center justify-center shrink-0"
                      :class="form.shift === s.value ? 'bg-primary/10' : 'bg-gray-100 dark:bg-white/5'"
                    >
                      <UIcon :name="s.icon" class="size-4" :class="form.shift === s.value ? 'text-primary' : s.color" />
                    </div>
                    <div class="min-w-0">
                      <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 capitalize leading-tight">
                        {{ s.label }}
                      </p>
                      <p class="text-[10px] text-gray-400 leading-tight">{{ s.time }}</p>
                    </div>
                    <div
                      v-if="form.shift === s.value"
                      class="absolute top-2 right-2 size-3.5 rounded-full bg-primary flex items-center justify-center"
                    >
                      <UIcon name="i-lucide-check" class="size-2.5 text-white" />
                    </div>
                  </button>
                </div>
              </UFormField>

              <!-- Status chips -->
              <UFormField label="Employment Status">
                <div class="flex gap-2 w-full">
                  <button
                    v-for="s in statusCards"
                    :key="s.value"
                    type="button"
                    class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-xs font-semibold transition-all duration-150"
                    :class="form.status === s.value ? s.active : 'border-gray-200 dark:border-[#1a3028] text-gray-500 dark:text-gray-500 hover:border-gray-300'"
                    @click="form.status = s.value"
                  >
                    <span class="size-1.5 rounded-full shrink-0" :class="s.dot" />
                    {{ s.label }}
                  </button>
                </div>
              </UFormField>

              <!-- Performance slider -->
              <UFormField label="Performance Score">
                <div class="w-full space-y-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] text-gray-400">Drag to set score</span>
                    <span class="text-sm font-bold tabular-nums" :class="perfColor(form.performanceScore)">
                      {{ form.performanceScore }}<span class="text-xs font-normal text-gray-400">/100</span>
                    </span>
                  </div>

                  <div class="relative h-2 rounded-full bg-gray-200 dark:bg-white/8">
                    <div
                      class="absolute left-0 top-0 h-full rounded-full transition-all"
                      :class="perfBarColor(form.performanceScore)"
                      :style="{ width: `${form.performanceScore}%` }"
                    />
                    <input
                      v-model.number="form.performanceScore"
                      type="range"
                      :min="0"
                      :max="100"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <div class="flex justify-between text-[10px] text-gray-400">
                    <span>Poor</span><span>Fair</span><span>Good</span><span>Great</span><span>Elite</span>
                  </div>
                </div>
              </UFormField>
            </div>
          </div>
        </div>

        <!-- ── Sticky Footer ────────────────────────────────────────── -->
        <div class="shrink-0 border-t border-gray-200 dark:border-[#1a3028] px-6 py-4 flex gap-3 bg-white dark:bg-[#0a1a12]">
          <UButton color="neutral" variant="outline" class="flex-1" size="md" @click="close">
            Cancel
          </UButton>
          <UButton color="primary" class="flex-1" size="md" @click="handleSave">
            <UIcon :name="mode === 'create' ? 'i-lucide-plus' : 'i-lucide-check'" class="size-4" />
            {{ mode === 'create' ? 'Add Staff Member' : 'Save Changes' }}
          </UButton>
        </div>

      </div>
    </template>
  </USlideover>
</template>
