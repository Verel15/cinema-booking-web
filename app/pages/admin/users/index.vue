<script setup lang="ts">
import type { AdminUser, MembershipTier } from '~/types/admin'
import type { UserFormData } from '~/composables/useAdminUsers'

definePageMeta({ layout: 'admin' })

const {
  paginatedUsers,
  activeTierFilter,
  currentPage,
  totalPages,
  totalFiltered,
  searchQuery,
  stats,
  userOfMonth,
  setTierFilter,
  goToPage,
  createUser,
  updateUser,
  deleteUser,
} = useAdminUsers()

// ── Modal state ────────────────────────────────────────────────────────────────
const isAddOpen = ref(false)
const isEditOpen = ref(false)
const isViewOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedUser = ref<AdminUser | null>(null)

function openAdd() {
  selectedUser.value = null
  isAddOpen.value = true
}

function openView(user: AdminUser) {
  selectedUser.value = user
  isViewOpen.value = true
}

function openEdit(user: AdminUser) {
  selectedUser.value = user
  isViewOpen.value = false
  isEditOpen.value = true
}

function openDelete(user: AdminUser) {
  selectedUser.value = user
  isDeleteOpen.value = true
}

function handleCreate(data: UserFormData) {
  createUser(data)
  isAddOpen.value = false
}

function handleUpdate(data: UserFormData) {
  if (!selectedUser.value) return
  updateUser(selectedUser.value.id, data)
  isEditOpen.value = false
}

function handleDelete() {
  if (!selectedUser.value) return
  deleteUser(selectedUser.value.id)
  isDeleteOpen.value = false
  selectedUser.value = null
}

// ── Table columns ──────────────────────────────────────────────────────────────
const columns = [
  { key: 'identity', label: 'Name & Identity' },
  { key: 'email', label: 'Email Address' },
  { key: 'tier', label: 'Membership Tier' },
  { key: 'bookings', label: 'Total Bookings', align: 'right' as const },
  { key: 'actions', label: 'Actions', align: 'center' as const },
]

// ── Filter tabs ────────────────────────────────────────────────────────────────
const tierTabs: { label: string; value: MembershipTier | 'ALL' }[] = [
  { label: 'All Users', value: 'ALL' },
  { label: 'Premium', value: 'PREMIUM' },
  { label: 'Standard', value: 'STANDARD' },
]

// ── Tier badge config ──────────────────────────────────────────────────────────
type BadgeColor = 'warning' | 'primary' | 'neutral'
const tierColor: Record<MembershipTier, BadgeColor> = {
  DIAMOND: 'warning',
  PREMIUM: 'primary',
  STANDARD: 'neutral',
}

const statusDot: Record<string, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-gray-400',
  suspended: 'bg-red-500',
}

// ── Table rows (mapped for AdminDataTable) ─────────────────────────────────────
const tableRows = computed(() =>
  paginatedUsers.value.map((u) => ({ ...u } as Record<string, unknown>)),
)

const paginatedRaw = computed(() => paginatedUsers.value)
</script>

<template>
  <div class="p-6 space-y-6 text-gray-900 dark:text-white">
    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <AdminPageHeader
      title="User Management"
      description="Manage membership tiers, monitor booking activity, and handle user accounts."
    >
      <template #actions>
        <UButton icon="i-lucide-filter" color="neutral" variant="outline" size="sm">
          Export CSV
        </UButton>
        <UButton icon="i-lucide-user-plus" color="primary" size="sm" @click="openAdd">
          Add New User
        </UButton>
      </template>
    </AdminPageHeader>

    <!-- ── Stats Cards ─────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard
        label="Total Users"
        :value="stats.totalUsers.toLocaleString()"
        change="+12%"
        :change-positive="true"
        sub="from last month"
        icon="i-lucide-users"
      />
      <AdminStatCard
        label="Premium Members"
        :value="stats.premiumMembers.toLocaleString()"
        sub="32% Market Share"
        icon="i-lucide-crown"
      />
      <AdminStatCard
        label="Avg. Bookings"
        :value="stats.avgBookings"
        sub="Per user / Month"
        icon="i-lucide-ticket"
      />
      <AdminStatCard
        label="Active Now"
        :value="stats.activeNow"
        sub="Live traffic"
        icon="i-lucide-activity"
        :live="true"
      />
    </div>

    <!-- ── Data Table ──────────────────────────────────────────────── -->
    <AdminDataTable
      :columns="columns"
      :rows="tableRows"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-count="totalFiltered"
      empty-icon="i-lucide-users"
      empty-text="No users found matching your filters."
      @update:current-page="goToPage"
    >
      <!-- Toolbar: filter tabs + search -->
      <template #toolbar>
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-1">
            <UButton
              v-for="tab in tierTabs"
              :key="tab.value"
              :color="activeTierFilter === tab.value ? 'primary' : 'neutral'"
              :variant="activeTierFilter === tab.value ? 'solid' : 'ghost'"
              size="sm"
              @click="setTierFilter(tab.value)"
            >
              {{ tab.label }}
            </UButton>
          </div>
          <div class="flex items-center gap-2">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="Search users…"
              size="sm"
              color="neutral"
            />
            <UButton icon="i-lucide-calendar" color="neutral" variant="outline" size="sm">
              Last 30 Days
            </UButton>
          </div>
        </div>
      </template>

      <!-- Subheader: row count -->
      <template #subheader>
        <span class="text-xs text-gray-500">
          Showing
          <span class="text-gray-700 dark:text-gray-300 font-medium">1–{{ Math.min(5, totalFiltered) }}</span>
          of
          <span class="text-gray-700 dark:text-gray-300 font-medium">{{ totalFiltered.toLocaleString() }}</span>
          users
        </span>
      </template>

      <!-- Cell: identity (avatar + name + joined) -->
      <template #identity="{ row }">
        <div class="flex items-center gap-3">
          <div class="relative shrink-0">
            <div
              class="size-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              :class="String(row.avatarBg)"
            >
              {{ row.initials }}
            </div>
            <span
              class="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white dark:ring-[#091610]"
              :class="statusDot[String(row.status)]"
            />
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ row.name }}</p>
            <p class="text-xs text-gray-500">{{ row.joinedLabel }}</p>
          </div>
        </div>
      </template>

      <!-- Cell: email -->
      <template #email="{ row }">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ row.email }}</span>
      </template>

      <!-- Cell: tier badge -->
      <template #tier="{ row }">
        <UBadge
          :color="tierColor[row.membershipTier as MembershipTier]"
          variant="soft"
          size="sm"
        >
          {{ row.membershipTier }}
        </UBadge>
      </template>

      <!-- Cell: bookings count -->
      <template #bookings="{ row }">
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
          {{ Number(row.totalBookings).toLocaleString() }}
        </span>
      </template>

      <!-- Cell: row actions -->
      <template #actions="{ row }">
        <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <UButton
            icon="i-lucide-eye"
            color="neutral"
            variant="ghost"
            size="xs"
            title="View"
            @click="openView(paginatedRaw.find(u => u.id === row.id)!)"
          />
          <UButton
            icon="i-lucide-pencil"
            color="neutral"
            variant="ghost"
            size="xs"
            title="Edit"
            @click="openEdit(paginatedRaw.find(u => u.id === row.id)!)"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="xs"
            title="Delete"
            @click="openDelete(paginatedRaw.find(u => u.id === row.id)!)"
          />
        </div>
      </template>
    </AdminDataTable>

    <!-- ── Bottom Cards ────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- User of the Month -->
      <div class="border border-gray-200 dark:border-[#1a3028] rounded-xl p-6 bg-white dark:bg-transparent">
        <p class="text-sm font-semibold text-gray-500 mb-4">User of the Month</p>
        <div v-if="userOfMonth" class="flex items-start gap-5">
          <div
            class="size-20 rounded-xl flex items-center justify-center text-2xl font-bold text-white shrink-0 ring-2 ring-primary/30"
            :class="userOfMonth.avatarBg"
          >
            {{ userOfMonth.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <UBadge color="warning" variant="soft" size="sm" class="mb-2">
              {{ userOfMonth.membershipTier }} TIER
            </UBadge>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ userOfMonth.name }}</h3>
            <p class="text-xs text-gray-500 mt-1 leading-relaxed">
              {{ userOfMonth.name }} has visited CineX locations
              {{ Math.floor(userOfMonth.totalBookings / 12) }} times this month and booked over
              {{ Math.floor(userOfMonth.totalBookings / 3) }} tickets. High-value customer with 100% retention rate.
            </p>
            <div class="flex items-center gap-2 mt-4">
              <UButton color="neutral" variant="outline" size="sm" @click="openView(userOfMonth)">View Profile</UButton>
              <UButton color="neutral" variant="outline" size="sm">Send Reward</UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Churn Prediction -->
      <div class="border border-gray-200 dark:border-[#1a3028] rounded-xl p-6 flex flex-col bg-white dark:bg-transparent">
        <div class="flex items-start gap-4 mb-auto">
          <div class="size-12 rounded-xl bg-error/10 border border-error/25 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-trending-down" class="size-5 text-error" />
          </div>
          <div>
            <h3 class="text-base font-bold text-gray-900 dark:text-white">Churn Prediction</h3>
            <p class="text-xs text-gray-500 mt-1.5 leading-relaxed">
              AI analysis identifies
              <span class="text-error font-semibold">14 active users</span> at risk of
              downgrading their tier this week. Early intervention could retain
              <span class="text-gray-900 dark:text-white font-semibold">฿52,400</span> in annual revenue.
            </p>
          </div>
        </div>
        <div class="mt-5 pt-4 border-t border-gray-200 dark:border-[#1a3028] flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="text-center">
              <p class="text-xl font-bold text-error">14</p>
              <p class="text-[10px] text-gray-500">At risk</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-warning">87%</p>
              <p class="text-[10px] text-gray-500">Accuracy</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-gray-900 dark:text-white">฿52K</p>
              <p class="text-[10px] text-gray-500">At stake</p>
            </div>
          </div>
          <UButton color="neutral" variant="outline" size="sm" class="shrink-0">
            Review Risk List
          </UButton>
        </div>
      </div>
    </div>

    <!-- ── Modals ──────────────────────────────────────────────────── -->
    <AdminUserFormModal
      :open="isAddOpen"
      mode="create"
      @update:open="isAddOpen = $event"
      @save="handleCreate"
    />

    <AdminUserFormModal
      :open="isEditOpen"
      mode="edit"
      :user="selectedUser"
      @update:open="isEditOpen = $event"
      @save="handleUpdate"
    />

    <AdminUserViewModal
      :open="isViewOpen"
      :user="selectedUser"
      @update:open="isViewOpen = $event"
      @edit="openEdit(selectedUser!)"
    />

    <AdminUserDeleteModal
      :open="isDeleteOpen"
      :user="selectedUser"
      @update:open="isDeleteOpen = $event"
      @confirm="handleDelete"
    />
  </div>
</template>
