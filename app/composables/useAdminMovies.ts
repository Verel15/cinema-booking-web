import type { Movie, MovieStatus, AgeRating } from '~/types/admin'

export interface MovieCastFormItem {
  id?: string
  actor_name: string
  role_name: string
  image_url: string
}

export interface MovieFormData {
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
  status: MovieStatus
  is_premium: boolean
  genres: string[]
  cast: MovieCastFormItem[]
}

const MOCK_MOVIES: Movie[] = [
  {
    id: '01e2cc6c-ba1d-49ee-adfc-6542020ccb21',
    title: 'Dune: Part Two',
    synopsis:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    duration_minutes: 166,
    release_date: '2024-03-01T07:00:00+07:00',
    age_rating: 'PG-13',
    language: 'English',
    director: 'Denis Villeneuve',
    poster_url: 'https://image.tmdb.org/t/p/w500/czembW0Rk1yhI7jNLMgMgxLiqyN.jpg',
    backdrop_url: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    trailer_url: 'https://example.com/dune2-trailer.mp4',
    rating_score: 8.5,
    status: 'NOW_SHOWING',
    is_premium: true,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    cast: [
      { id: '30534665-dedd-4f2e-ae28-65221c73cadc', actor_name: 'Timothée Chalamet', role_name: 'Paul Atreides', image_url: '' },
      { id: '3a842b00-19b6-4b4c-bfe7-a16fe4f973c9', actor_name: 'Zendaya', role_name: 'Chani', image_url: '' },
    ],
    created_at: '2026-05-07T21:16:35.097483+07:00',
    updated_at: '2026-05-07T21:16:35.097483+07:00',
  },
  {
    id: 'b2d3e4f5-0001-0001-0001-000000000002',
    title: 'Oppenheimer',
    synopsis:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    duration_minutes: 180,
    release_date: '2023-07-21T07:00:00+07:00',
    age_rating: 'R',
    language: 'English',
    director: 'Christopher Nolan',
    poster_url: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_url: 'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    trailer_url: 'https://example.com/oppenheimer-trailer.mp4',
    rating_score: 8.9,
    status: 'NOW_SHOWING',
    is_premium: false,
    genres: ['Drama', 'History', 'Thriller'],
    cast: [
      { id: 'c0000001-0001-0001-0001-000000000001', actor_name: 'Cillian Murphy', role_name: 'J. Robert Oppenheimer', image_url: '' },
      { id: 'c0000001-0001-0001-0001-000000000002', actor_name: 'Emily Blunt', role_name: 'Katherine Oppenheimer', image_url: '' },
      { id: 'c0000001-0001-0001-0001-000000000003', actor_name: 'Matt Damon', role_name: 'Leslie Groves', image_url: '' },
    ],
    created_at: '2026-05-07T21:16:35.097483+07:00',
    updated_at: '2026-05-07T21:16:35.097483+07:00',
  },
  {
    id: 'b2d3e4f5-0001-0001-0001-000000000003',
    title: 'Inside Out 2',
    synopsis:
      "Joy, Sadness, Anger, Fear and Disgust navigate Riley's mind as new emotions arrive during a pivotal summer adventure.",
    duration_minutes: 100,
    release_date: '2024-06-14T07:00:00+07:00',
    age_rating: 'PG',
    language: 'English',
    director: 'Kelsey Mann',
    poster_url: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    backdrop_url: 'https://image.tmdb.org/t/p/original/see1VE4GknVelWePegOE3PNl4C5.jpg',
    trailer_url: 'https://example.com/insideout2-trailer.mp4',
    rating_score: 7.8,
    status: 'COMING_SOON',
    is_premium: false,
    genres: ['Animation', 'Family', 'Comedy'],
    cast: [
      { id: 'c0000002-0001-0001-0001-000000000001', actor_name: 'Amy Poehler', role_name: 'Joy', image_url: '' },
      { id: 'c0000002-0001-0001-0001-000000000002', actor_name: 'Maya Hawke', role_name: 'Anxiety', image_url: '' },
    ],
    created_at: '2026-05-07T21:16:35.097483+07:00',
    updated_at: '2026-05-07T21:16:35.097483+07:00',
  },
  {
    id: 'b2d3e4f5-0001-0001-0001-000000000004',
    title: 'Alien: Romulus',
    synopsis:
      'A group of young space colonizers face the ultimate alien threat while scavenging an abandoned space station.',
    duration_minutes: 119,
    release_date: '2024-08-16T07:00:00+07:00',
    age_rating: 'R',
    language: 'English',
    director: 'Fede Álvarez',
    poster_url: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
    backdrop_url: 'https://image.tmdb.org/t/p/original/9SSEUrSqhljBMzRe4aBTh17LP9Q.jpg',
    trailer_url: 'https://example.com/alien-trailer.mp4',
    rating_score: 7.3,
    status: 'COMING_SOON',
    is_premium: true,
    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    cast: [
      { id: 'c0000003-0001-0001-0001-000000000001', actor_name: 'Cailee Spaeny', role_name: 'Rain Carradine', image_url: '' },
      { id: 'c0000003-0001-0001-0001-000000000002', actor_name: 'David Jonsson', role_name: 'Andy', image_url: '' },
    ],
    created_at: '2026-05-07T21:16:35.097483+07:00',
    updated_at: '2026-05-07T21:16:35.097483+07:00',
  },
  {
    id: 'b2d3e4f5-0001-0001-0001-000000000005',
    title: 'The Batman',
    synopsis:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City while pursuing the Riddler, a serial killer who targets elite citizens.',
    duration_minutes: 176,
    release_date: '2022-03-04T07:00:00+07:00',
    age_rating: 'PG-13',
    language: 'English',
    director: 'Matt Reeves',
    poster_url: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop_url: 'https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
    trailer_url: 'https://example.com/batman-trailer.mp4',
    rating_score: 7.8,
    status: 'ENDED',
    is_premium: false,
    genres: ['Action', 'Crime', 'Thriller'],
    cast: [
      { id: 'c0000004-0001-0001-0001-000000000001', actor_name: 'Robert Pattinson', role_name: 'Bruce Wayne / Batman', image_url: '' },
      { id: 'c0000004-0001-0001-0001-000000000002', actor_name: 'Zoë Kravitz', role_name: 'Selina Kyle / Catwoman', image_url: '' },
    ],
    created_at: '2026-05-07T21:16:35.097483+07:00',
    updated_at: '2026-05-07T21:16:35.097483+07:00',
  },
  {
    id: 'b2d3e4f5-0001-0001-0001-000000000006',
    title: 'Avatar: The Way of Water',
    synopsis:
      'Jake Sully and his family must leave their home on Pandora and explore the regions of Pandora to stay safe.',
    duration_minutes: 192,
    release_date: '2022-12-16T07:00:00+07:00',
    age_rating: 'PG-13',
    language: 'English',
    director: 'James Cameron',
    poster_url: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop_url: 'https://image.tmdb.org/t/p/original/198vrF8k7UjGNLMat9PBfRJxiKo.jpg',
    trailer_url: 'https://example.com/avatar2-trailer.mp4',
    rating_score: 7.6,
    status: 'ENDED',
    is_premium: true,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    cast: [
      { id: 'c0000005-0001-0001-0001-000000000001', actor_name: 'Sam Worthington', role_name: 'Jake Sully', image_url: '' },
      { id: 'c0000005-0001-0001-0001-000000000002', actor_name: 'Zoe Saldana', role_name: 'Neytiri', image_url: '' },
    ],
    created_at: '2026-05-07T21:16:35.097483+07:00',
    updated_at: '2026-05-07T21:16:35.097483+07:00',
  },
]

export function useAdminMovies() {
  const allMovies = useState<Movie[]>('admin-movies-all', () => MOCK_MOVIES)
  const statusFilter = useState<MovieStatus | 'ALL'>('admin-movies-status', () => 'ALL')
  const currentPage = useState<number>('admin-movies-page', () => 1)
  const searchQuery = useState<string>('admin-movies-search', () => '')
  const pageSize = 5

  const filteredMovies = computed(() => {
    let result = allMovies.value
    if (statusFilter.value !== 'ALL') {
      result = result.filter((m) => m.status === statusFilter.value)
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q),
      )
    }
    return result
  })

  const totalPages = computed(() => Math.ceil(filteredMovies.value.length / pageSize))
  const totalFiltered = computed(() => filteredMovies.value.length)

  const paginatedMovies = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredMovies.value.slice(start, start + pageSize)
  })

  const stats = computed(() => {
    const all = allMovies.value
    const rated = all.filter((m) => m.rating_score > 0)
    return {
      total: all.length,
      nowShowing: all.filter((m) => m.status === 'NOW_SHOWING').length,
      comingSoon: all.filter((m) => m.status === 'COMING_SOON').length,
      ended: all.filter((m) => m.status === 'ENDED').length,
      avgRating: rated.length
        ? (rated.reduce((s, m) => s + m.rating_score, 0) / rated.length).toFixed(1)
        : '—',
    }
  })

  function setStatusFilter(status: MovieStatus | 'ALL') {
    statusFilter.value = status
    currentPage.value = 1
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page
  }

  function createMovie(data: MovieFormData): void {
    const now = new Date().toISOString()
    const newMovie: Movie = {
      id: crypto.randomUUID(),
      ...data,
      rating_score: 0,
      cast: data.cast.map((c) => ({ ...c, id: c.id ?? crypto.randomUUID() })),
      created_at: now,
      updated_at: now,
    }
    allMovies.value = [newMovie, ...allMovies.value]
    currentPage.value = 1
  }

  function updateMovie(id: string, data: MovieFormData): void {
    allMovies.value = allMovies.value.map((m) =>
      m.id === id
        ? {
            ...m,
            ...data,
            cast: data.cast.map((c) => ({ ...c, id: c.id ?? crypto.randomUUID() })),
            updated_at: new Date().toISOString(),
          }
        : m,
    )
  }

  function deleteMovie(id: string): void {
    allMovies.value = allMovies.value.filter((m) => m.id !== id)
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    }
  }

  return {
    allMovies,
    paginatedMovies,
    filteredMovies,
    statusFilter,
    currentPage,
    totalPages,
    totalFiltered,
    searchQuery,
    stats,
    pageSize,
    setStatusFilter,
    goToPage,
    createMovie,
    updateMovie,
    deleteMovie,
  }
}
