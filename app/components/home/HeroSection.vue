<script setup lang="ts">
import movieImg1 from '~/assets/images/mock/image-movie-1.png'
import movieImg2 from '~/assets/images/mock/image-movie-2.png'
import movieImg3 from '~/assets/images/mock/image-movie-3.png'
import movieImg4 from '~/assets/images/mock/image-movie-4.png'
const slides = [
  {
    badge: 'NOW SHOWING',
    genres: ['Action', 'Sci-Fi'],
    title: 'NEON VANGUARD',
    description:
      'Experience the future of human evolution. In a world of total surveillance, one rebel must find the light in the dark. Starring Academy Award winner Julian Thorne.',
    backgroundImage: movieImg1,
  },
  {
    badge: 'NEW RELEASE',
    genres: ['Drama', 'Thriller'],
    title: 'DARK HORIZON',
    description:
      "A gripping tale of survival and redemption set against a crumbling civilization. One man's journey to reclaim what was lost before it's too late.",
    backgroundImage: movieImg2,
  },
  {
    badge: 'COMING SOON',
    genres: ['Action', 'Animation'],
    title: 'ZOO WARRIORS',
    description:
      "Join forces with a team of unlikely animal heroes as they defend their home from an evil corporation. A wild adventure for the whole family!",
    backgroundImage: movieImg3,
  },
  {
    badge: 'NEW RELEASE',
    genres: ['Animation', 'Comedy'],
    title: 'DOVE',
    description:
      "Divergent paths. One choice.",
    backgroundImage: movieImg4,
  }

]

const currentIndex = ref(0)
const INTERVAL_MS = 10000

let timer: ReturnType<typeof setInterval>

function startTimer() {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length
  }, INTERVAL_MS)
}

function goToSlide(index: number) {
  clearInterval(timer)
  currentIndex.value = index
  startTimer()
}

onMounted(startTimer)
onUnmounted(() => clearInterval(timer))

const currentSlide = computed(() => slides[currentIndex.value] ?? slides[0]!)

const selectedCinema = ref('Luxe Lounge Downtown')
const selectedExperience = ref('IMAX Laser 4K')

const cinemaOptions = [
  'Luxe Lounge Downtown',
  'Grand Cineplex',
  'SF Cinema Central',
  'Major Cineplex',
]

const experienceOptions = ['IMAX Laser 4K', 'Standard', '4DX', 'Dolby Atmos']

const displayDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
})

const emit = defineEmits<{
  bookNow: []
  viewTrailer: []
  search: [{ cinema: string; experience: string }]
}>()
</script>

<template>
  <div class="relative flex min-h-[90vh] flex-col overflow-hidden bg-gray-950">
    <!-- Background slides -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
      :style="{ backgroundImage: `url(${slide.backgroundImage})` }"
      :class="currentIndex === index ? 'opacity-100' : 'opacity-0'"
    />

    <!-- Content -->
    <div class="relative flex flex-1 items-end px-6 pb-14 sm:px-8 sm:pb-20 md:px-16 lg:px-24">
      <Transition name="slide-fade" mode="out-in">
        <div :key="currentIndex" class="w-full max-w-xl">
          <div class="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
            <UBadge
              :label="currentSlide.badge"
              size="md"
              class="font-bold uppercase tracking-wider"
            />
            <span
              class="text-xs font-semibold tracking-widest text-gray-400 uppercase sm:text-sm"
            >
              {{ currentSlide.genres.join(' / ') }}
            </span>
          </div>

          <h1
            class="mb-4 text-4xl leading-none font-black text-white uppercase italic sm:text-5xl sm:mb-5 md:text-6xl lg:text-7xl"
          >
            {{ currentSlide.title }}
          </h1>

          <p class="mb-6 max-w-md text-sm leading-relaxed text-gray-300 sm:text-base sm:mb-8">
            {{ currentSlide.description }}
          </p>

          <div class="flex flex-wrap items-center gap-3 sm:gap-4">
            <UButton
              size="lg"
              icon="i-lucide-play"
              class="uppercase text-sm sm:size-xl sm:text-md"
              @click="emit('bookNow')"
            >
              Book Now
            </UButton>
            <UButton
              size="lg"
              variant="outline"
              color="neutral"
              class="uppercase text-sm sm:size-xl sm:text-md"
              @click="emit('viewTrailer')"
            >
              View Trailer
            </UButton>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Slide indicators -->
    <div class="relative z-10 flex justify-end gap-2 px-6 pb-4 sm:px-8 md:px-16 lg:px-24">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="h-1 rounded-full bg-white transition-all duration-500 cursor-pointer"
        :class="currentIndex === index ? 'w-8 opacity-100' : 'w-2 opacity-40'"
        @click="goToSlide(index)"
      />
    </div>

    <!-- Search bar -->
    <div class="px-4 md:px-8 lg:px-16 mb-6">
      <div
        class="relative border rounded-xl border-gray-800 bg-gray-900/80 backdrop-blur-xs"
      >
        <div class="flex flex-col divide-y divide-gray-800 md:flex-row md:items-stretch md:divide-y-0 md:divide-x">
          <div class="flex min-w-0 flex-1 flex-col justify-center px-6 py-4 md:py-5">
            <span
              class="text-primary mb-1.5 text-xs font-bold uppercase tracking-widest"
            >
              Select Cinema
            </span>
            <USelect
              v-model="selectedCinema"
              :items="cinemaOptions"
              variant="none"
              class="font-semibold text-white"
            />
          </div>

          <div class="flex min-w-0 flex-1 flex-col justify-center px-6 py-4 md:py-5">
            <span
              class="text-primary mb-1.5 text-xs font-bold uppercase tracking-widest"
            >
              Date
            </span>
            <div class="flex items-center justify-between gap-2">
              <span class="truncate font-semibold text-white">{{
                displayDate
              }}</span>
              <UIcon
                name="i-lucide-calendar"
                class="size-5 shrink-0 text-gray-400"
              />
            </div>
          </div>

          <div class="flex min-w-0 flex-1 flex-col justify-center px-6 py-4 md:py-5">
            <span
              class="text-primary mb-1.5 text-xs font-bold uppercase tracking-widest"
            >
              Experience
            </span>
            <USelect
              v-model="selectedExperience"
              :items="experienceOptions"
              variant="none"
              class="font-semibold text-white"
            />
          </div>

          <div class="flex items-center justify-center px-6 py-4 md:py-5">
            <UButton
              icon="i-lucide-search"
              size="xl"
              color="neutral"
              variant="solid"
              class="rounded-xl w-full md:w-auto"
              @click="
                emit('search', {
                  cinema: selectedCinema,
                  experience: selectedExperience,
                })
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
