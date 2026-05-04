<template>
  <div>
    <HomeHeroSection
      @book-now="handleBookNow"
      @view-trailer="handleViewTrailer"
      @search="handleSearch"
    />
    <HomeNowShowingSection />
    <ComingSoon />
    <CinemaExperienceSection />
  </div>
</template>

<script setup lang="ts">
import CinemaExperienceSection from '~/components/home/CinemaExperienceSection.vue';
import ComingSoon from '~/components/home/ComingSoon.vue';
import MarqueeSection from '~/components/home/MarqueeSection.vue';

function handleBookNow() {}
function handleViewTrailer() {}
function handleSearch(_payload: { cinema: string; experience: string }) {}
</script>
