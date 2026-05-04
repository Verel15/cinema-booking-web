<script setup lang="ts">
import movieImg1 from '~/assets/images/mock/image-movie-1.png';
import movieImg2 from '~/assets/images/mock/image-movie-2.png';
import movieImg3 from '~/assets/images/mock/image-movie-3.png';
import movieImg4 from '~/assets/images/mock/image-movie-4.png';

const movies = [
  {
    date: 'NOV 12',
    title: 'Solaris Horizon',
    genre: 'Space Odyssey',
    image: movieImg1,
  },
  {
    date: 'NOV 28',
    title: 'Velocità',
    genre: 'Racing Thriller',
    image: movieImg2,
  },
  {
    date: 'DEC 05',
    title: 'The Sanctum',
    genre: 'Supernatural Mystery',
    image: movieImg3,
  },
  {
    date: 'DEC 15',
    title: 'Global Zero',
    genre: 'Eco-Thriller',
    image: movieImg4,
  },
  {
    date: 'JAN 03',
    title: 'Neon Vanguard',
    genre: 'Sci-Fi Epic',
    image: movieImg1,
  },
  {
    date: 'JAN 20',
    title: 'Dark Horizon',
    genre: 'Action Drama',
    image: movieImg2,
  },
];

const scrollRef = ref<HTMLElement | null>(null);
const SCROLL_AMOUNT = 420;

function scrollLeft() {
  scrollRef.value?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
}

function scrollRight() {
  scrollRef.value?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
}
</script>

<template>
  <section class="bg-transparent px-4 py-10 sm:px-8 sm:py-14 md:px-16 lg:px-24">
    <!-- Header -->
    <div class="mb-6 sm:mb-8 flex items-center justify-between">
      <h2
        class="text-2xl sm:text-3xl lg:text-4xl font-black italic uppercase text-white tracking-tight"
      >
        Coming Soon
      </h2>
      <div class="flex gap-2 sm:gap-3">
        <button
          class="flex size-8 sm:size-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/10 cursor-pointer"
          @click="scrollLeft"
        >
          <UIcon name="i-lucide-arrow-left" class="size-3.5 sm:size-4" />
        </button>
        <button
          class="flex size-8 sm:size-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/10 cursor-pointer"
          @click="scrollRight"
        >
          <UIcon name="i-lucide-arrow-right" class="size-3.5 sm:size-4" />
        </button>
      </div>
    </div>

    <!-- Carousel -->
    <div
      ref="scrollRef"
      class="flex gap-3 sm:gap-5 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
    >
      <div
        v-for="movie in movies"
        :key="movie.title"
        class="group relative shrink-0 w-[200px] sm:w-[250px] lg:w-[300px] cursor-pointer"
      >
        <!-- Poster -->
        <div class="relative overflow-hidden rounded-2xl aspect-3/4">
          <img
            :src="movie.image"
            :alt="movie.title"
            class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
          <!-- Dark overlay fades out on hover -->
          <div
            class="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0"
          />
          <!-- Ring highlight on hover -->
          <div
            class="absolute inset-0 rounded-2xl ring-1 ring-white/5 transition-all duration-300 group-hover:ring-primary/50"
          />
          <!-- Date badge -->
          <div class="absolute top-4 left-4">
            <span
              class="inline-block rounded-md bg-black/60 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/90"
            >
              {{ movie.date }}
            </span>
          </div>
        </div>

        <!-- Info -->
        <div class="mt-3 px-0.5">
          <h3
            class="text-base font-black italic text-white leading-snug transition-colors duration-300 group-hover:text-primary"
          >
            {{ movie.title }}
          </h3>
          <p
            class="mt-0.5 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-300"
          >
            {{ movie.genre }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
