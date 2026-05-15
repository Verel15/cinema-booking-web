import type { AdminUser, MembershipTier, UserStatus } from '~/types/admin'

const AVATAR_COLORS = [
  'bg-purple-700', 'bg-blue-700', 'bg-pink-700', 'bg-teal-700',
  'bg-orange-700', 'bg-amber-700', 'bg-cyan-700', 'bg-violet-700',
  'bg-emerald-700', 'bg-rose-700', 'bg-indigo-700', 'bg-red-700',
]

const MOCK_USERS: AdminUser[] = [
  {
    id: 'u-001',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    initials: 'AT',
    joinedLabel: 'Joined Oct 2023',
    membershipTier: 'PREMIUM',
    totalBookings: 142,
    totalSpent: 18450,
    status: 'active',
    lastActive: '2 hours ago',
    avatarBg: 'bg-purple-700',
  },
  {
    id: 'u-002',
    name: 'Marcus Chen',
    email: 'm.chen88@cinema.net',
    initials: 'MC',
    joinedLabel: 'Joined Jan 2024',
    membershipTier: 'STANDARD',
    totalBookings: 28,
    totalSpent: 3640,
    status: 'active',
    lastActive: '1 day ago',
    avatarBg: 'bg-blue-700',
  },
  {
    id: 'u-003',
    name: 'Sarah Jenkins',
    email: 's.jenkins@provider.com',
    initials: 'SJ',
    joinedLabel: 'Joined Aug 2023',
    membershipTier: 'PREMIUM',
    totalBookings: 215,
    totalSpent: 27950,
    status: 'active',
    lastActive: '5 minutes ago',
    avatarBg: 'bg-pink-700',
  },
  {
    id: 'u-004',
    name: 'David Wilson',
    email: 'david.w@service.org',
    initials: 'DW',
    joinedLabel: 'Joined Dec 2023',
    membershipTier: 'STANDARD',
    totalBookings: 12,
    totalSpent: 1560,
    status: 'active',
    lastActive: '3 days ago',
    avatarBg: 'bg-teal-700',
  },
  {
    id: 'u-005',
    name: 'Elena Rodriguez',
    email: 'elena.rod@webmail.com',
    initials: 'ER',
    joinedLabel: 'Joined Feb 2024',
    membershipTier: 'PREMIUM',
    totalBookings: 54,
    totalSpent: 7020,
    status: 'active',
    lastActive: '30 minutes ago',
    avatarBg: 'bg-orange-700',
  },
  {
    id: 'u-006',
    name: 'Julianne Moore',
    email: 'julianne.m@cinema.pro',
    initials: 'JM',
    joinedLabel: 'Joined Mar 2023',
    membershipTier: 'DIAMOND',
    totalBookings: 387,
    totalSpent: 50310,
    status: 'active',
    lastActive: 'Just now',
    avatarBg: 'bg-amber-700',
  },
  {
    id: 'u-007',
    name: 'Kevin Park',
    email: 'kevin.park@techcorp.io',
    initials: 'KP',
    joinedLabel: 'Joined Nov 2023',
    membershipTier: 'STANDARD',
    totalBookings: 19,
    totalSpent: 2470,
    status: 'inactive',
    lastActive: '2 weeks ago',
    avatarBg: 'bg-cyan-700',
  },
  {
    id: 'u-008',
    name: 'Nadia Petrov',
    email: 'nadia.p@global.net',
    initials: 'NP',
    joinedLabel: 'Joined Sep 2023',
    membershipTier: 'PREMIUM',
    totalBookings: 98,
    totalSpent: 12740,
    status: 'active',
    lastActive: '4 hours ago',
    avatarBg: 'bg-violet-700',
  },
  {
    id: 'u-009',
    name: 'James Okafor',
    email: 'james.ok@mail.com',
    initials: 'JO',
    joinedLabel: 'Joined Apr 2024',
    membershipTier: 'STANDARD',
    totalBookings: 7,
    totalSpent: 910,
    status: 'active',
    lastActive: '6 hours ago',
    avatarBg: 'bg-emerald-700',
  },
  {
    id: 'u-010',
    name: 'Linda Torres',
    email: 'l.torres@studio.com',
    initials: 'LT',
    joinedLabel: 'Joined Jul 2023',
    membershipTier: 'PREMIUM',
    totalBookings: 176,
    totalSpent: 22880,
    status: 'active',
    lastActive: '1 hour ago',
    avatarBg: 'bg-rose-700',
  },
]

export interface UserFormData {
  name: string
  email: string
  membershipTier: MembershipTier
  status: UserStatus
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

function nowJoinedLabel(): string {
  const d = new Date()
  return `Joined ${d.toLocaleString('en-US', { month: 'short', year: 'numeric' })}`
}

export function useAdminUsers() {
  const allUsers = useState<AdminUser[]>('admin-users-all', () => MOCK_USERS)
  const activeTierFilter = useState<MembershipTier | 'ALL'>('admin-users-tier', () => 'ALL')
  const currentPage = useState<number>('admin-users-page', () => 1)
  const searchQuery = useState<string>('admin-users-search', () => '')
  const pageSize = 5

  const filteredUsers = computed(() => {
    let result = allUsers.value
    if (activeTierFilter.value !== 'ALL') {
      result = result.filter((u) => u.membershipTier === activeTierFilter.value)
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
      )
    }
    return result
  })

  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize))
  const totalFiltered = computed(() => filteredUsers.value.length)

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredUsers.value.slice(start, start + pageSize)
  })

  const stats = computed(() => {
    const total = 12842
    const premium = 4209
    const diamond = allUsers.value.filter((u) => u.membershipTier === 'DIAMOND').length
    return {
      totalUsers: total,
      premiumMembers: premium,
      avgBookings: 4.2,
      activeNow: 156,
      diamondMembers: diamond,
    }
  })

  const userOfMonth = computed(
    () => allUsers.value.find((u) => u.membershipTier === 'DIAMOND') ?? allUsers.value[0],
  )

  function setTierFilter(tier: MembershipTier | 'ALL') {
    activeTierFilter.value = tier
    currentPage.value = 1
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page
  }

  function createUser(data: UserFormData): void {
    const newUser: AdminUser = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      initials: buildInitials(data.name),
      joinedLabel: nowJoinedLabel(),
      membershipTier: data.membershipTier,
      totalBookings: 0,
      totalSpent: 0,
      status: data.status,
      lastActive: 'Just now',
      avatarBg: randomAvatarBg(),
    }
    allUsers.value = [newUser, ...allUsers.value]
    currentPage.value = 1
  }

  function updateUser(id: string, data: UserFormData): void {
    allUsers.value = allUsers.value.map((u) =>
      u.id === id
        ? { ...u, name: data.name, email: data.email, initials: buildInitials(data.name), membershipTier: data.membershipTier, status: data.status }
        : u,
    )
  }

  function deleteUser(id: string): void {
    allUsers.value = allUsers.value.filter((u) => u.id !== id)
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    }
  }

  return {
    allUsers,
    paginatedUsers,
    filteredUsers,
    activeTierFilter,
    currentPage,
    totalPages,
    totalFiltered,
    searchQuery,
    stats,
    userOfMonth,
    pageSize,
    setTierFilter,
    goToPage,
    createUser,
    updateUser,
    deleteUser,
  }
}
