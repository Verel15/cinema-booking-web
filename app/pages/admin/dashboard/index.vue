<script setup lang="ts">
import type { RevenuePoint, RecentBooking, TopMovie } from '~/types/admin'

definePageMeta({ layout: 'admin' })

const colorMode = useColorMode()
const chartDotStroke = computed(() => colorMode.value === 'dark' ? '#040e08' : '#f9fafb')

// ── KPI Stats ─────────────────────────────────────────────────────────────────
const stats = [
  {
    label: 'Total Revenue',
    value: '฿2,847,500',
    change: '+18.2%',
    changePositive: true,
    sub: 'vs last month',
    icon: 'i-lucide-circle-dollar-sign',
  },
  {
    label: 'Total Bookings',
    value: '47,382',
    change: '+12.5%',
    changePositive: true,
    sub: 'tickets sold',
    icon: 'i-lucide-ticket',
  },
  {
    label: 'Active Users',
    value: '12,842',
    change: '+8.1%',
    changePositive: true,
    sub: '+1,024 new members',
    icon: 'i-lucide-users',
  },
  {
    label: 'Now Showing',
    value: '24',
    change: '−2 titles',
    changePositive: false,
    sub: 'active movies',
    icon: 'i-lucide-film',
  },
]

// ── Revenue Chart ──────────────────────────────────────────────────────────────
const revenueData: RevenuePoint[] = [
  { month: 'Jun', value: 1840000 },
  { month: 'Jul', value: 2120000 },
  { month: 'Aug', value: 1950000 },
  { month: 'Sep', value: 2380000 },
  { month: 'Oct', value: 2250000 },
  { month: 'Nov', value: 2640000 },
  { month: 'Dec', value: 3180000 },
  { month: 'Jan', value: 2890000 },
  { month: 'Feb', value: 2540000 },
  { month: 'Mar', value: 2760000 },
  { month: 'Apr', value: 2480000 },
  { month: 'May', value: 2847500 },
]

const chartW = 700
const chartH = 160
const padY = 12

const chart = computed(() => {
  const values = revenueData.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pts = revenueData.map((d, i) => ({
    x: (i / (revenueData.length - 1)) * chartW,
    y: padY + (1 - (d.value - min) / range) * (chartH - padY * 2),
  }))
  const linePath = 'M ' + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')
  const areaPath = linePath + ` L ${chartW},${chartH} L 0,${chartH} Z`
  return { pts, linePath, areaPath }
})

// ── Top Movies ─────────────────────────────────────────────────────────────────
const topMovies: TopMovie[] = [
  { id: '1', title: 'Dune: Part Two', genre: 'Sci-Fi', totalBookings: 8240, revenue: '฿1,073,200', ratingScore: 8.8, fillPercent: 92 },
  { id: '2', title: 'Deadpool & Wolverine', genre: 'Action', totalBookings: 7180, revenue: '฿934,400', ratingScore: 9.1, fillPercent: 80 },
  { id: '3', title: 'Inside Out 2', genre: 'Animation', totalBookings: 6520, revenue: '฿847,600', ratingScore: 8.4, fillPercent: 73 },
  { id: '4', title: 'Kingdom of the Planet of Apes', genre: 'Sci-Fi', totalBookings: 4840, revenue: '฿629,200', ratingScore: 7.6, fillPercent: 54 },
  { id: '5', title: 'Furiosa: A Mad Max Saga', genre: 'Action', totalBookings: 4120, revenue: '฿535,600', ratingScore: 7.8, fillPercent: 46 },
]

// ── Recent Bookings ────────────────────────────────────────────────────────────
const recentBookings: RecentBooking[] = [
  { id: 'BK-7291', movieTitle: 'Dune: Part Two', userName: 'Sarah Jenkins', seats: 3, amount: '฿1,320', timeAgo: '2 mins ago', status: 'confirmed', cinema: 'CineX Central' },
  { id: 'BK-7290', movieTitle: 'Deadpool & Wolverine', userName: 'Alex Thompson', seats: 2, amount: '฿880', timeAgo: '15 mins ago', status: 'confirmed', cinema: 'CineX Siam' },
  { id: 'BK-7289', movieTitle: 'Inside Out 2', userName: 'Elena Rodriguez', seats: 4, amount: '฿1,560', timeAgo: '32 mins ago', status: 'confirmed', cinema: 'CineX Rama 9' },
  { id: 'BK-7288', movieTitle: 'Furiosa: A Mad Max Saga', userName: 'David Wilson', seats: 1, amount: '฿390', timeAgo: '45 mins ago', status: 'pending', cinema: 'CineX Central' },
  { id: 'BK-7287', movieTitle: 'Dune: Part Two', userName: 'Marcus Chen', seats: 2, amount: '฿880', timeAgo: '1 hr ago', status: 'cancelled', cinema: 'CineX Siam' },
  { id: 'BK-7286', movieTitle: 'Inside Out 2', userName: 'Linda Torres', seats: 3, amount: '฿1,170', timeAgo: '1.5 hrs ago', status: 'confirmed', cinema: 'CineX Central' },
]

const bookingStatusColor: Record<string, 'success' | 'warning' | 'error'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
}

// ── Quick Insights ─────────────────────────────────────────────────────────────
const insights = [
  { label: 'Peak Hour Today', value: '7:30 PM', icon: 'i-lucide-clock' },
  { label: 'Busiest Cinema', value: 'CineX Central', icon: 'i-lucide-map-pin' },
  { label: 'Cancellation Rate', value: '3.2%', icon: 'i-lucide-x-circle' },
  { label: 'Avg. Ticket Price', value: '฿390', icon: 'i-lucide-receipt' },
  { label: 'Loyalty Redemptions', value: '1,247', icon: 'i-lucide-star' },
  { label: 'New Signups Today', value: '84', icon: 'i-lucide-user-plus' },
]
</script>

<template>
  <div class="p-6 space-y-6 text-gray-900 dark:text-white">
    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <AdminPageHeader
      title="Analytics Dashboard"
      description="Real-time overview · Last updated just now"
    >
      <template #actions>
        <UButton icon="i-lucide-calendar" color="neutral" variant="outline" size="sm" trailing>
          Last 30 Days
          <template #trailing>
            <UIcon name="i-lucide-chevron-down" class="size-3" />
          </template>
        </UButton>
        <UButton icon="i-lucide-download" color="primary" size="sm">Export Report</UButton>
      </template>
    </AdminPageHeader>

    <!-- ── KPI Cards ───────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminStatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :change="stat.change"
        :change-positive="stat.changePositive"
        :sub="stat.sub"
        :icon="stat.icon"
      />
    </div>

    <!-- ── Revenue Chart ───────────────────────────────────────────── -->
    <div class="bg-white dark:bg-transparent border border-gray-200 dark:border-[#1a3028] rounded-xl p-5">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
          <p class="text-xs text-gray-500 mt-0.5">Monthly revenue — last 12 months</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1.5 text-xs text-gray-500">
            <span class="size-2 rounded-full bg-primary inline-block" />
            Revenue
          </span>
          <UBadge color="success" variant="soft" size="sm">↑ 18.2% MoM</UBadge>
        </div>
      </div>

      <!-- SVG Area Chart -->
      <div class="relative">
        <svg
          :viewBox="`-10 0 ${chartW + 20} ${chartH + 36}`"
          class="w-full"
          preserveAspectRatio="none"
          style="height: 200px"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#22c55e" stop-opacity="0.30" />
              <stop offset="100%" stop-color="#22c55e" stop-opacity="0" />
            </linearGradient>
          </defs>

          <!-- Grid lines -->
          <line
            v-for="i in 4"
            :key="i"
            x1="0"
            :y1="(i / 4) * (chartH - padY * 2) + padY"
            :x2="chartW"
            :y2="(i / 4) * (chartH - padY * 2) + padY"
            class="stroke-[#e5e7eb] dark:stroke-[#1a3028]"
            stroke-width="1"
          />

          <!-- Area fill -->
          <path :d="chart.areaPath" fill="url(#areaGrad)" />

          <!-- Line -->
          <path
            :d="chart.linePath"
            fill="none"
            stroke="#22c55e"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          />

          <!-- Data points -->
          <circle
            v-for="pt in chart.pts"
            :key="pt.x"
            :cx="pt.x"
            :cy="pt.y"
            r="3"
            fill="#22c55e"
            :stroke="chartDotStroke"
            stroke-width="2"
          />

          <!-- X-axis labels -->
          <text
            v-for="(d, i) in revenueData"
            :key="d.month"
            :x="(i / (revenueData.length - 1)) * chartW"
            :y="chartH + 20"
            text-anchor="middle"
            font-size="10"
            fill="#6b7280"
          >
            {{ d.month }}
          </text>
        </svg>

        <!-- Y-axis labels -->
        <div class="absolute inset-0 pointer-events-none flex flex-col justify-between pb-8">
          <span class="text-[10px] text-gray-500">฿3.2M</span>
          <span class="text-[10px] text-gray-500">฿2.4M</span>
          <span class="text-[10px] text-gray-500">฿1.8M</span>
        </div>
      </div>
    </div>

    <!-- ── Bottom Row: Top Movies + Recent Bookings ────────────────── -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Top Movies -->
      <div class="bg-white dark:bg-transparent border border-gray-200 dark:border-[#1a3028] rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Top Performing Movies</h2>
            <p class="text-xs text-gray-500 mt-0.5">By total bookings this month</p>
          </div>
          <UIcon name="i-lucide-bar-chart-2" class="size-4 text-gray-400 dark:text-gray-600" />
        </div>

        <div class="space-y-4">
          <div v-for="(movie, idx) in topMovies" :key="movie.id" class="space-y-1.5">
            <div class="flex items-center gap-3">
              <span
                class="text-[11px] font-bold w-4 text-right tabular-nums"
                :class="idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-gray-400 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'"
              >
                {{ idx + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ movie.title }}</span>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="flex items-center gap-0.5 text-xs text-amber-400 font-semibold">
                      <UIcon name="i-lucide-star" class="size-3" />
                      {{ movie.ratingScore }}
                    </span>
                    <span class="text-xs text-gray-500 font-medium">
                      {{ movie.totalBookings.toLocaleString() }} tickets
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 pl-7">
              <div class="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full bg-linear-to-r from-green-700 to-green-500 rounded-full"
                  :style="{ width: `${movie.fillPercent}%` }"
                />
              </div>
              <span class="text-[11px] text-gray-500 font-medium w-20 text-right">
                {{ movie.revenue }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Bookings -->
      <div class="bg-white dark:bg-transparent border border-gray-200 dark:border-[#1a3028] rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Recent Bookings</h2>
            <p class="text-xs text-gray-500 mt-0.5">Live transaction feed</p>
          </div>
          <UButton
            to="/admin/bookings"
            icon="i-lucide-arrow-up-right"
            trailing-icon=""
            color="neutral"
            variant="ghost"
            size="xs"
          >
            View all
          </UButton>
        </div>

        <div class="space-y-1">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ booking.movieTitle }}</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white shrink-0">{{ booking.amount }}</span>
              </div>
              <div class="flex items-center justify-between gap-2 mt-0.5">
                <span class="text-xs text-gray-500 truncate">
                  {{ booking.userName }} · {{ booking.seats }} seat{{ booking.seats > 1 ? 's' : '' }}
                </span>
                <UBadge
                  :color="bookingStatusColor[booking.status]"
                  variant="soft"
                  size="sm"
                  class="shrink-0 capitalize"
                >
                  {{ booking.status }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Quick Insights ──────────────────────────────────────────── -->
    <div class="bg-white dark:bg-transparent border border-gray-200 dark:border-[#1a3028] rounded-xl p-5">
      <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Insights</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div
          v-for="insight in insights"
          :key="insight.label"
          class="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-white/3 rounded-lg border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center"
        >
          <span class="size-8 rounded-lg bg-gray-100 dark:bg-white/6 border border-gray-200 dark:border-white/10 flex items-center justify-center">
            <UIcon :name="insight.icon" class="size-3.5 text-gray-500 dark:text-gray-400" />
          </span>
          <div>
            <p class="text-sm font-bold text-gray-900 dark:text-white">{{ insight.value }}</p>
            <p class="text-[10px] text-gray-500 leading-tight mt-0.5">{{ insight.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
