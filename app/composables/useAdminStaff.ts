import type { AdminStaff, StaffRole, StaffStatus, ShiftType } from '~/types/admin'

const AVATAR_COLORS = [
  'bg-purple-700', 'bg-blue-700', 'bg-pink-700', 'bg-teal-700',
  'bg-orange-700', 'bg-amber-700', 'bg-cyan-700', 'bg-violet-700',
  'bg-emerald-700', 'bg-rose-700', 'bg-indigo-700', 'bg-slate-600',
]

const MOCK_STAFF: AdminStaff[] = [
  {
    id: 's-001',
    name: 'Robert Nakamura',
    email: 'r.nakamura@cinex.com',
    initials: 'RN',
    role: 'General Manager',
    department: 'Management',
    cinema: 'CineX Central',
    joinedDate: 'Mar 2020',
    status: 'active',
    shift: 'morning',
    performanceScore: 97,
    ticketsSold: 0,
    avatarBg: 'bg-amber-700',
    phone: '+66 81-234-5678',
  },
  {
    id: 's-002',
    name: 'Priya Sharma',
    email: 'p.sharma@cinex.com',
    initials: 'PS',
    role: 'Branch Manager',
    department: 'Management',
    cinema: 'CineX Siam',
    joinedDate: 'Jun 2021',
    status: 'active',
    shift: 'morning',
    performanceScore: 94,
    ticketsSold: 0,
    avatarBg: 'bg-rose-700',
    phone: '+66 82-345-6789',
  },
  {
    id: 's-003',
    name: 'Daniel Kim',
    email: 'd.kim@cinex.com',
    initials: 'DK',
    role: 'Supervisor',
    department: 'Operations',
    cinema: 'CineX Central',
    joinedDate: 'Jan 2022',
    status: 'active',
    shift: 'afternoon',
    performanceScore: 91,
    ticketsSold: 0,
    avatarBg: 'bg-blue-700',
    phone: '+66 83-456-7890',
  },
  {
    id: 's-004',
    name: 'Thanya Boonsong',
    email: 't.boonsong@cinex.com',
    initials: 'TB',
    role: 'Cashier',
    department: 'Box Office',
    cinema: 'CineX Rama 9',
    joinedDate: 'Apr 2022',
    status: 'active',
    shift: 'morning',
    performanceScore: 88,
    ticketsSold: 4820,
    avatarBg: 'bg-emerald-700',
    phone: '+66 84-567-8901',
  },
  {
    id: 's-005',
    name: 'Carlos Mendez',
    email: 'c.mendez@cinex.com',
    initials: 'CM',
    role: 'Projectionist',
    department: 'AV Operations',
    cinema: 'CineX Central',
    joinedDate: 'Aug 2021',
    status: 'active',
    shift: 'evening',
    performanceScore: 96,
    ticketsSold: 0,
    avatarBg: 'bg-purple-700',
    phone: '+66 85-678-9012',
  },
  {
    id: 's-006',
    name: 'Somchai Rattana',
    email: 's.rattana@cinex.com',
    initials: 'SR',
    role: 'Security Officer',
    department: 'Security',
    cinema: 'CineX Siam',
    joinedDate: 'Nov 2022',
    status: 'active',
    shift: 'night',
    performanceScore: 85,
    ticketsSold: 0,
    avatarBg: 'bg-slate-600',
    phone: '+66 86-789-0123',
  },
  {
    id: 's-007',
    name: 'Amara Osei',
    email: 'a.osei@cinex.com',
    initials: 'AO',
    role: 'Cashier',
    department: 'Box Office',
    cinema: 'CineX Central',
    joinedDate: 'Feb 2023',
    status: 'on_leave',
    shift: 'afternoon',
    performanceScore: 82,
    ticketsSold: 3210,
    avatarBg: 'bg-teal-700',
    phone: '+66 87-890-1234',
  },
  {
    id: 's-008',
    name: 'Wei Zhang',
    email: 'w.zhang@cinex.com',
    initials: 'WZ',
    role: 'Technician',
    department: 'Technical',
    cinema: 'CineX Rama 9',
    joinedDate: 'May 2022',
    status: 'active',
    shift: 'morning',
    performanceScore: 93,
    ticketsSold: 0,
    avatarBg: 'bg-cyan-700',
    phone: '+66 88-901-2345',
  },
  {
    id: 's-009',
    name: 'Fatima Al-Hassan',
    email: 'f.alhassan@cinex.com',
    initials: 'FA',
    role: 'Concessions Staff',
    department: 'F&B',
    cinema: 'CineX Siam',
    joinedDate: 'Sep 2023',
    status: 'part_time',
    shift: 'evening',
    performanceScore: 79,
    ticketsSold: 0,
    avatarBg: 'bg-orange-700',
    phone: '+66 89-012-3456',
  },
  {
    id: 's-010',
    name: 'Natthapong Suk',
    email: 'n.suk@cinex.com',
    initials: 'NS',
    role: 'Cashier',
    department: 'Box Office',
    cinema: 'CineX Central',
    joinedDate: 'Jan 2024',
    status: 'active',
    shift: 'morning',
    performanceScore: 86,
    ticketsSold: 1840,
    avatarBg: 'bg-violet-700',
    phone: '+66 90-123-4567',
  },
]

export interface StaffFormData {
  name: string
  email: string
  phone: string
  role: StaffRole
  department: string
  cinema: string
  shift: ShiftType
  status: StaffStatus
  performanceScore: number
}

function buildInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function randomAvatarBg(): string {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]!
}

function nowJoinedDate(): string {
  return new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

export function useAdminStaff() {
  const allStaff = useState<AdminStaff[]>('admin-staff-all', () => MOCK_STAFF)
  const activeStatusFilter = useState<StaffStatus | 'ALL'>('admin-staff-status', () => 'ALL')
  const activeRoleFilter = useState<StaffRole | 'ALL'>('admin-staff-role', () => 'ALL')
  const currentPage = useState<number>('admin-staff-page', () => 1)
  const searchQuery = useState<string>('admin-staff-search', () => '')
  const pageSize = 6

  const filteredStaff = computed(() => {
    let result = allStaff.value
    if (activeStatusFilter.value !== 'ALL') {
      result = result.filter((s) => s.status === activeStatusFilter.value)
    }
    if (activeRoleFilter.value !== 'ALL') {
      result = result.filter((s) => s.role === activeRoleFilter.value)
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.cinema.toLowerCase().includes(q),
      )
    }
    return result
  })

  const totalPages = computed(() => Math.ceil(filteredStaff.value.length / pageSize))
  const totalFiltered = computed(() => filteredStaff.value.length)

  const paginatedStaff = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredStaff.value.slice(start, start + pageSize)
  })

  const stats = computed(() => ({
    totalStaff: allStaff.value.length,
    activeToday: allStaff.value.filter((s) => s.status === 'active').length,
    onLeave: allStaff.value.filter((s) => s.status === 'on_leave').length,
    partTime: allStaff.value.filter((s) => s.status === 'part_time').length,
    managers: allStaff.value.filter(
      (s) => s.role === 'General Manager' || s.role === 'Branch Manager',
    ).length,
    avgPerformance: allStaff.value.length
      ? Math.round(allStaff.value.reduce((acc, s) => acc + s.performanceScore, 0) / allStaff.value.length)
      : 0,
  }))

  const topPerformer = computed(() =>
    [...allStaff.value].sort((a, b) => b.performanceScore - a.performanceScore)[0],
  )

  function setStatusFilter(status: StaffStatus | 'ALL') {
    activeStatusFilter.value = status
    currentPage.value = 1
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page
  }

  function createStaff(data: StaffFormData): void {
    const newStaff: AdminStaff = {
      id: `s-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      initials: buildInitials(data.name),
      role: data.role,
      department: data.department,
      cinema: data.cinema,
      joinedDate: nowJoinedDate(),
      status: data.status,
      shift: data.shift,
      performanceScore: data.performanceScore,
      ticketsSold: 0,
      avatarBg: randomAvatarBg(),
    }
    allStaff.value = [newStaff, ...allStaff.value]
    currentPage.value = 1
  }

  function updateStaff(id: string, data: StaffFormData): void {
    allStaff.value = allStaff.value.map((s) =>
      s.id === id
        ? {
            ...s,
            name: data.name,
            email: data.email,
            phone: data.phone,
            initials: buildInitials(data.name),
            role: data.role,
            department: data.department,
            cinema: data.cinema,
            shift: data.shift,
            status: data.status,
            performanceScore: data.performanceScore,
          }
        : s,
    )
  }

  function deleteStaff(id: string): void {
    allStaff.value = allStaff.value.filter((s) => s.id !== id)
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    }
  }

  return {
    allStaff,
    paginatedStaff,
    filteredStaff,
    activeStatusFilter,
    activeRoleFilter,
    currentPage,
    totalPages,
    totalFiltered,
    searchQuery,
    stats,
    topPerformer,
    pageSize,
    setStatusFilter,
    goToPage,
    createStaff,
    updateStaff,
    deleteStaff,
  }
}
