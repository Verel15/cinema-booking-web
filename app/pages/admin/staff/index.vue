<script setup lang="ts">
import type { AdminStaff, StaffStatus, ShiftType, StaffRole } from '~/types/admin'
import type { StaffFormData } from '~/composables/useAdminStaff'

definePageMeta({ layout: 'admin' })

const {
  paginatedStaff,
  activeStatusFilter,
  currentPage,
  totalPages,
  totalFiltered,
  searchQuery,
  stats,
  topPerformer,
  setStatusFilter,
  goToPage,
  createStaff,
  updateStaff,
  deleteStaff,
} = useAdminStaff()

// ── Modal state ────────────────────────────────────────────────────────────────
const isAddOpen = ref(false)
const isEditOpen = ref(false)
const isViewOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedStaff = ref<AdminStaff | null>(null)

function openAdd() {
  selectedStaff.value = null
  isAddOpen.value = true
}

function openView(staff: AdminStaff) {
  selectedStaff.value = staff
  isViewOpen.value = true
}

function openEdit(staff: AdminStaff) {
  selectedStaff.value = staff
  isViewOpen.value = false
  isEditOpen.value = true
}

function openDelete(staff: AdminStaff) {
  selectedStaff.value = staff
  isDeleteOpen.value = true
}

function handleCreate(data: StaffFormData) {
  createStaff(data)
  isAddOpen.value = false
}

function handleUpdate(data: StaffFormData) {
  if (!selectedStaff.value) return
  updateStaff(selectedStaff.value.id, data)
  isEditOpen.value = false
}

function handleDelete() {
  if (!selectedStaff.value) return
  deleteStaff(selectedStaff.value.id)
  isDeleteOpen.value = false
  selectedStaff.value = null
}

// ── Table columns ──────────────────────────────────────────────────────────────
const columns = [
  { key: 'member', label: 'Staff Member' },
  { key: 'role', label: 'Role' },
  { key: 'branch', label: 'Branch' },
  { key: 'shift', label: 'Shift' },
  { key: 'status', label: 'Status' },
  { key: 'performance', label: 'Performance' },
  { key: 'actions', label: 'Actions', align: 'center' as const },
]

// ── Filter tabs ────────────────────────────────────────────────────────────────
const statusTabs: { label: string; value: StaffStatus | 'ALL' }[] = [
  { label: 'All Staff', value: 'ALL' },
  { label: 'Active', value: 'active' },
  { label: 'On Leave', value: 'on_leave' },
  { label: 'Part-Time', value: 'part_time' },
]

// ── Role badge colors ──────────────────────────────────────────────────────────
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

// ── Status badge colors ────────────────────────────────────────────────────────
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

// ── Shift display ──────────────────────────────────────────────────────────────
const shiftIcon: Record<ShiftType, string> = {
  morning: 'i-lucide-sunrise',
  afternoon: 'i-lucide-sun',
  evening: 'i-lucide-sunset',
  night: 'i-lucide-moon',
}

const shiftLabel: Record<ShiftType, string> = {
  morning: '6AM–2PM',
  afternoon: '2PM–10PM',
  evening: '4PM–12AM',
  night: '10PM–6AM',
}

const shiftTextColor: Record<ShiftType, string> = {
  morning: 'text-yellow-400',
  afternoon: 'text-orange-400',
  evening: 'text-purple-400',
  night: 'text-blue-400',
}

// ── Performance helpers ────────────────────────────────────────────────────────
function perfTextColor(score: number) {
  if (score >= 90) return 'text-emerald-400'
  if (score >= 75) return 'text-amber-400'
  return 'text-red-400'
}

function perfBarColor(score: number) {
  if (score >= 90) return 'bg-emerald-500'
  if (score >= 75) return 'bg-amber-500'
  return 'bg-red-500'
}

// ── Table rows ─────────────────────────────────────────────────────────────────
const tableRows = computed(() =>
  paginatedStaff.value.map((s) => ({ ...s } as Record<string, unknown>)),
)

const paginatedRaw = computed(() => paginatedStaff.value)

// ── Shift overview ─────────────────────────────────────────────────────────────
const shiftGroups = computed(() => {
  const groups: Record<ShiftType, number> = { morning: 0, afternoon: 0, evening: 0, night: 0 }
  useAdminStaff()
    .allStaff.value.filter((s) => s.status === 'active')
    .forEach((s) => groups[s.shift]++)
  return (Object.entries(groups) as [ShiftType, number][]).map(([shift, count]) => ({
    shift,
    count,
  }))
})
</script>

<template>
  <div class="p-6 space-y-6 text-gray-900 dark:text-white">
    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <AdminPageHeader
      title="Staff Management"
      description="Manage cinema staff, roles, shifts, and performance across all branches."
    >
      <template #actions>
        <UButton icon="i-lucide-download" color="neutral" variant="outline" size="sm">
          Export
        </UButton>
        <UButton icon="i-lucide-user-plus" color="primary" size="sm" @click="openAdd">
          Add Staff Member
        </UButton>
      </template>
    </AdminPageHeader>

    <!-- ── Stats Cards ─────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard
        label="Total Staff"
        :value="stats.totalStaff"
        sub="Across all branches"
        icon="i-lucide-users"
      />
      <AdminStatCard
        label="Active Today"
        :value="stats.activeToday"
        sub="On duty now"
        icon="i-lucide-user-check"
        :live="true"
      />
      <AdminStatCard
        label="Managers"
        :value="stats.managers"
        sub="General + Branch"
        icon="i-lucide-briefcase"
      />
      <AdminStatCard
        label="Avg. Performance"
        :value="`${stats.avgPerformance}/100`"
        sub="Team score"
        icon="i-lucide-bar-chart-2"
      />
    </div>

    <!-- ── Data Table ──────────────────────────────────────────────── -->
    <AdminDataTable
      :columns="columns"
      :rows="tableRows"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-count="totalFiltered"
      empty-icon="i-lucide-user-cog"
      empty-text="No staff members found matching your filters."
      @update:current-page="goToPage"
    >
      <!-- Toolbar -->
      <template #toolbar>
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-1">
            <UButton
              v-for="tab in statusTabs"
              :key="tab.value"
              :color="activeStatusFilter === tab.value ? 'primary' : 'neutral'"
              :variant="activeStatusFilter === tab.value ? 'solid' : 'ghost'"
              size="sm"
              @click="setStatusFilter(tab.value)"
            >
              {{ tab.label }}
            </UButton>
          </div>
          <div class="flex items-center gap-2">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="Search staff…"
              size="sm"
              color="neutral"
            />
            <UButton icon="i-lucide-sliders-horizontal" color="neutral" variant="outline" size="sm">
              Filters
            </UButton>
          </div>
        </div>
      </template>

      <!-- Cell: staff member -->
      <template #member="{ row }">
        <div class="flex items-center gap-3">
          <div
            class="size-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            :class="String(row.avatarBg)"
          >
            {{ row.initials }}
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ row.name }}</p>
            <p class="text-xs text-gray-500">{{ row.email }}</p>
          </div>
        </div>
      </template>

      <!-- Cell: role badge -->
      <template #role="{ row }">
        <UBadge :color="roleColor[row.role as StaffRole]" variant="soft" size="sm">
          {{ row.role }}
        </UBadge>
      </template>

      <!-- Cell: branch + department -->
      <template #branch="{ row }">
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-300">{{ row.cinema }}</p>
          <p class="text-xs text-gray-600">{{ row.department }}</p>
        </div>
      </template>

      <!-- Cell: shift -->
      <template #shift="{ row }">
        <div class="flex items-center gap-1.5" :class="shiftTextColor[row.shift as ShiftType]">
          <UIcon :name="shiftIcon[row.shift as ShiftType]" class="size-3.5" />
          <div>
            <p class="text-sm font-medium capitalize">{{ row.shift }}</p>
            <p class="text-[10px] text-gray-600">{{ shiftLabel[row.shift as ShiftType] }}</p>
          </div>
        </div>
      </template>

      <!-- Cell: status badge -->
      <template #status="{ row }">
        <UBadge :color="statusColor[row.status as StaffStatus]" variant="soft" size="sm">
          {{ statusLabel[row.status as StaffStatus] }}
        </UBadge>
      </template>

      <!-- Cell: performance bar + score -->
      <template #performance="{ row }">
        <div class="flex items-center gap-2 min-w-[80px]">
          <div class="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="perfBarColor(Number(row.performanceScore))"
              :style="{ width: `${row.performanceScore}%` }"
            />
          </div>
          <span
            class="text-xs font-bold tabular-nums w-7 text-right"
            :class="perfTextColor(Number(row.performanceScore))"
          >
            {{ row.performanceScore }}
          </span>
        </div>
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
            @click="openView(paginatedRaw.find(s => s.id === row.id)!)"
          />
          <UButton
            icon="i-lucide-pencil"
            color="neutral"
            variant="ghost"
            size="xs"
            title="Edit"
            @click="openEdit(paginatedRaw.find(s => s.id === row.id)!)"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="xs"
            title="Remove"
            @click="openDelete(paginatedRaw.find(s => s.id === row.id)!)"
          />
        </div>
      </template>
    </AdminDataTable>

    <!-- ── Bottom Row: Shift Overview + Top Performer ─────────────── -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Shift Overview -->
      <div class="bg-white dark:bg-transparent border border-gray-200 dark:border-[#1a3028] rounded-xl p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Shift Overview</h2>
            <p class="text-xs text-gray-600 mt-0.5">Active staff by shift today</p>
          </div>
          <UIcon name="i-lucide-clock" class="size-4 text-gray-600" />
        </div>
        <div class="space-y-4">
          <div v-for="group in shiftGroups" :key="group.shift" class="space-y-1.5">
            <div class="flex items-center justify-between">
              <div
                class="flex items-center gap-2 text-sm font-medium capitalize"
                :class="shiftTextColor[group.shift]"
              >
                <UIcon :name="shiftIcon[group.shift]" class="size-3.5" />
                {{ group.shift }}
                <span class="text-gray-600 text-xs font-normal">{{ shiftLabel[group.shift] }}</span>
              </div>
              <span class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ group.count }} staff</span>
            </div>
            <div class="h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary rounded-full"
                :style="{
                  width: `${stats.activeToday > 0 ? (group.count / stats.activeToday) * 100 : 0}%`,
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performer -->
      <div v-if="topPerformer" class="bg-white dark:bg-transparent border border-gray-200 dark:border-[#1a3028] rounded-xl p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Top Performer</h2>
            <p class="text-xs text-gray-600 mt-0.5">Highest score this month</p>
          </div>
          <UBadge color="warning" variant="soft" size="sm" leading-icon="i-lucide-trophy">MVP</UBadge>
        </div>

        <div class="flex items-start gap-5">
          <div
            class="size-16 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0 ring-2 ring-primary/30"
            :class="topPerformer.avatarBg"
          >
            {{ topPerformer.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ topPerformer.name }}</h3>
            <p class="text-sm text-gray-500">{{ topPerformer.role }}</p>
            <p class="text-xs text-gray-600">{{ topPerformer.cinema }}</p>

            <div class="mt-4 space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">Performance Score</span>
                <span class="font-bold" :class="perfTextColor(topPerformer.performanceScore)">
                  {{ topPerformer.performanceScore }}/100
                </span>
              </div>
              <div class="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :class="perfBarColor(topPerformer.performanceScore)"
                  :style="{ width: `${topPerformer.performanceScore}%` }"
                />
              </div>
              <div class="flex items-center gap-4 pt-2">
                <div>
                  <p class="text-xs text-gray-600">Since</p>
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ topPerformer.joinedDate }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Shift</p>
                  <p class="text-sm font-semibold capitalize" :class="shiftTextColor[topPerformer.shift]">
                    {{ topPerformer.shift }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <UButton color="neutral" variant="outline" size="sm" @click="openView(topPerformer)">
                View Profile
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Modals ──────────────────────────────────────────────────── -->
    <AdminStaffFormModal
      :open="isAddOpen"
      mode="create"
      @update:open="isAddOpen = $event"
      @save="handleCreate"
    />

    <AdminStaffFormModal
      :open="isEditOpen"
      mode="edit"
      :staff="selectedStaff"
      @update:open="isEditOpen = $event"
      @save="handleUpdate"
    />

    <AdminStaffViewModal
      :open="isViewOpen"
      :staff="selectedStaff"
      @update:open="isViewOpen = $event"
      @edit="openEdit(selectedStaff!)"
    />

    <AdminStaffDeleteModal
      :open="isDeleteOpen"
      :staff="selectedStaff"
      @update:open="isDeleteOpen = $event"
      @confirm="handleDelete"
    />
  </div>
</template>
