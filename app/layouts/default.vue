<script setup lang="ts">
import Footer from '~/components/footer/Footer.vue';
import Header from '~/components/header/Header.vue';
</script>

<template>
  <Header />
  <div>
    <slot />
  </div>
  <Footer />
</template>
