<script setup lang="ts">
import movieImg1 from '~/assets/images/mock/image-movie-1.png';
import movieImg2 from '~/assets/images/mock/image-movie-2.png';
import movieImg3 from '~/assets/images/mock/image-movie-3.png';
import movieImg4 from '~/assets/images/mock/image-movie-4.png';

const featured = {
  genre: 'DRAMA / THRILLER',
  title: 'Shadow of Doubt',
  rating: 4.9,
  duration: '142 Mins',
  image: movieImg2,
};

const grid = [
  { title: 'Neon Vanguard', genre: 'SCI-FI EPIC', image: movieImg1 },
  { title: 'Cinemania', genre: 'DOCUMENTARY', image: movieImg3 },
  { title: 'Midnight Run', genre: 'ACTION COMEDY', image: movieImg4 },
  { title: 'Downpour', genre: 'CRIME NOIR', image: movieImg2 },
];
</script>

<template>
  <section class="bg-white dark:bg-gray-950 px-4 py-10 sm:px-8 sm:py-14 md:px-16 lg:px-24">
    <!-- Header -->
    <div class="mb-6 sm:mb-8 flex items-end justify-between">
      <div>
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-black italic uppercase text-gray-900 dark:text-white tracking-tight"
        >
          Now Showing
        </h2>
        <p class="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Premium experiences in every screen
        </p>
      </div>
      <button
        class="text-primary text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity"
      >
        View All
      </button>
    </div>

    <!-- Grid -->
    <div class="flex flex-col lg:flex-row gap-4 lg:h-[540px]">
      <!-- Featured card -->
      <div
        class="relative h-[300px] sm:h-[380px] lg:h-auto lg:flex-[1.2] rounded-2xl overflow-hidden cursor-pointer group"
        :style="{ backgroundImage: `url(${featured.image})` }"
        style="background-size: cover; background-position: center"
      >
        <div
          class="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"
        />
        <div class="absolute bottom-0 left-0 p-4 sm:p-6">
          <span
            class="inline-block rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm mb-2 sm:mb-3"
          >
            {{ featured.genre }}
          </span>
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-black italic text-white leading-tight mb-2">
            {{ featured.title }}
          </h3>
          <div class="flex items-center gap-3 text-sm text-gray-300">
            <span class="flex items-center gap-1">
              <UIcon
                name="i-lucide-star"
                class="size-4 text-amber-400 fill-amber-400"
              />
              <span class="font-semibold text-white">{{
                featured.rating
              }}</span>
            </span>
            <span class="text-gray-500">·</span>
            <span>{{ featured.duration }}</span>
          </div>
        </div>
        <div
          class="absolute inset-0 ring-1 ring-white/5 rounded-2xl group-hover:ring-primary/40 transition-all duration-300"
        />
      </div>

      <!-- 2x2 grid -->
      <div class="flex-1 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-[300px] sm:h-[380px] lg:h-auto">
        <div
          v-for="movie in grid"
          :key="movie.title"
          class="relative rounded-2xl overflow-hidden cursor-pointer group"
          :style="{ backgroundImage: `url(${movie.image})` }"
          style="background-size: cover; background-position: center"
        >
          <div
            class="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
          />
          <div class="absolute bottom-0 left-0 p-3 sm:p-4">
            <p class="text-xs sm:text-sm font-bold text-white leading-snug">
              {{ movie.title }}
            </p>
            <p
              class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mt-0.5"
            >
              {{ movie.genre }}
            </p>
          </div>
          <div
            class="absolute inset-0 ring-1 ring-white/5 rounded-2xl group-hover:ring-primary/40 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>
