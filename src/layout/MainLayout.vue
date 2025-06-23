<script>
export default {
  name: "MainLayout",
  data() {
    return {
      isEnglish: true,
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<template>
  <header class="w-full shadow" style="background-color: lightblue;">
    <nav class="max-w-[1200px] mx-auto py-2.5 px-8 flex items-center justify-between gap-4 relative">
      <router-link to="/dashboard" class="toolbar__logo">
        <img src="@/assets/images/aqua-engine-logo.webp" alt="Aqua‑Engine logo" class="h-[85px]"/>
      </router-link>

      <!-- Desktop language toggle -->
      <div class="hidden md:flex items-center gap-2">
        <label class="toolbar__lang-toggle relative inline-block w-[60px] h-[34px]" aria-label="Change language">
          <input type="checkbox" v-model="isEnglish" class="opacity-0 w-0 h-0"/>
          <span class="toolbar__lang-slider absolute inset-0 cursor-pointer bg-gray-300 rounded-[34px] transition duration-400"></span>
        </label>
        <span class="toolbar__lang-label">{{ isEnglish ? 'EN' : 'ES' }}</span>
      </div>

      <!-- Mobile hamburger toggle -->
      <button class="block md:hidden bg-none border-0 cursor-pointer" type="button" aria-label="Toggle menu"
              @click="toggleMenu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path v-if="!isMenuOpen" d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path v-else d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Mobile dropdown menu -->
      <transition name="fade-slide">
        <ul v-if="isMenuOpen" class="toolbar__mobile-menu absolute top-full right-0 w-[200px] p-4 m-0 shadow rounded-b-lg"
            style="background-color: lightblue;" @click.self="toggleMenu">
          <li class="toolbar__menu-item">
            <label class="toolbar__lang-toggle relative inline-block w-[60px] h-[34px]" aria-label="Change language">
              <input type="checkbox" v-model="isEnglish" class="opacity-0 w-0 h-0"/>
              <span class="toolbar__lang-slider absolute inset-0 cursor-pointer bg-gray-300 rounded-[34px] transition duration-400"></span>
            </label>
            <span class="toolbar__lang-label">{{ isEnglish ? 'EN' : 'ES' }}</span>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>



<style scoped>
/* Toggle slider pseudo elements */
.toolbar__lang-toggle input:checked + .toolbar__lang-slider {
  background-color: #2196f3;
}
.toolbar__lang-toggle input:checked + .toolbar__lang-slider:before {
  transform: translateX(26px);
}
.toolbar__lang-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #fff;
  transition: 0.4s;
  border-radius: 50%;
}

/* Fade slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>