<script>
export default {
  name: 'AuthLayout',

  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
}
</script>

<template>
  <main class="min-h-screen w-screen flex justify-center items-center bg-gray-50">
    <router-view />
  </main>
</template>

<style scoped>
/* Optional styles */
</style>