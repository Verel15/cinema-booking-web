export type MembershipTier = 'DIAMOND' | 'PREMIUM' | 'STANDARD'
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type StaffRole =
  | 'General Manager'
  | 'Branch Manager'
  | 'Supervisor'
  | 'Cashier'
  | 'Projectionist'
  | 'Security Officer'
  | 'Technician'
  | 'Concessions Staff'
export type StaffStatus = 'active' | 'on_leave' | 'part_time'
export type ShiftType = 'morning' | 'afternoon' | 'evening' | 'night'

export interface AdminUser {
  id: string
  name: string
  email: string
  initials: string
  joinedLabel: string
  membershipTier: MembershipTier
  totalBookings: number
  totalSpent: number
  status: UserStatus
  lastActive: string
  avatarBg: string
}

export interface AdminStaff {
  id: string
  name: string
  email: string
  initials: string
  role: StaffRole
  department: string
  cinema: string
  joinedDate: string
  status: StaffStatus
  shift: ShiftType
  performanceScore: number
  ticketsSold: number
  avatarBg: string
  phone: string
}

export interface RevenuePoint {
  month: string
  value: number
}

export interface RecentBooking {
  id: string
  movieTitle: string
  userName: string
  seats: number
  amount: string
  timeAgo: string
  status: 'confirmed' | 'pending' | 'cancelled'
  cinema: string
}

export interface TopMovie {
  id: string
  title: string
  genre: string
  totalBookings: number
  revenue: string
  ratingScore: number
  fillPercent: number
}

export type MovieStatus = 'NOW_SHOWING' | 'COMING_SOON' | 'ENDED'
export type AgeRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'

export interface MovieCast {
  id: string
  actor_name: string
  role_name: string
  image_url: string
}

export interface Movie {
  id: string
  title: string
  synopsis: string
  duration_minutes: number
  release_date: string
  age_rating: AgeRating
  language: string
  director: string
  poster_url: string
  backdrop_url: string
  trailer_url: string
  rating_score: number
  status: MovieStatus
  is_premium: boolean
  genres: string[]
  cast: MovieCast[]
  created_at: string
  updated_at: string
}
