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
  <main class="w-full max-w-4xl">
    <router-view/>
  </main>
</template>

<style scoped>
/* Optional styles */
</style>