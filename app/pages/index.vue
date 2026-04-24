<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { isAuthenticated } = useAuth()

// ถ้า login แล้ว redirect ไป /home
if (isAuthenticated.value) {
  await navigateTo('/home')
}
</script>

<template>
  <div></div>
</template>
