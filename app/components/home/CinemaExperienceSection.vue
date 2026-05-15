<script setup lang="ts">
import type { PageFeatureProps, ButtonProps } from '@nuxt/ui';
import imageSeat from '~/assets/images/mock/image-seat.png';

const features = ref<PageFeatureProps[]>([
  {
    title: 'IMAX & 4DX',
    description:
      'Immerse yourself in crystal-clear IMAX laser projection and heart-pounding 4DX motion seats that put you inside the action.',
    icon: 'i-lucide-scan',
  },
  {
    title: 'Dolby Atmos Sound',
    description:
      'Experience breathtaking 3D audio with Dolby Atmos technology that surrounds you from every direction for true cinematic immersion.',
    icon: 'i-lucide-volume-2',
  },
  {
    title: 'Premium Seating',
    description:
      'Sink into luxurious recliner seats with extra legroom and in-seat food & beverage service for the ultimate comfort.',
    icon: 'i-lucide-armchair',
  },
]);
const links = ref<ButtonProps[]>([
  {
    label: 'Browse Showtimes',
    to: '/showtimes',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
]);
</script>

<template>
  <section class="bg-white dark:bg-gray-950 px-8 md:px-16 lg:px-24">
    <UPageSection
      title="Experience Cinema Like Never Before"
      description="CineX delivers a premium cinematic journey with state-of-the-art technology, world-class sound, and ultimate comfort — every visit is an unforgettable experience."
      orientation="horizontal"
      :features="features"
      :links="links"
    >
      <img
        :src="imageSeat"
        width="175"
        height="450"
        alt="Illustration"
        class="w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-lg"
        loading="lazy"
      />
    </UPageSection>
  </section>
</template>
