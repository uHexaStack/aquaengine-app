<script>
import { useAuthStore } from "@/features/auth/application/stores/useAuthStore.js";

export default {
  name: "SignInView",

  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      errors: {
        username: "",
        password: ""
      },
      authStore: null
    };
  },

  computed: {
    storeError() {
      return this.authStore.error;
    }
  },

  created() {
    this.authStore = useAuthStore();
  },

  methods: {
    validate() {
      this.errors.username = this.form.username ? "" : "Username is required.";
      this.errors.password = this.form.password ? "" : "Password is required.";
      return !this.errors.username && !this.errors.password;
    },
    async onSignIn() {
      if (!this.validate()) return;

      try {
        await this.authStore.signIn({
          username: this.form.username,
          password: this.form.password
        });
        await this.authStore.fetchUser();
        this.$router.replace("/dashboard");
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<template>
  <div class="sign-in__container">
    <div class="sign-in__form">
      <h1 class="title font-bold">Sign In</h1>
      <p class="p-fluid mb-5">
        Please enter the required information to sign in.
      </p>

      <form @submit.prevent="onSignIn" class="w-full max-w-sm">
        <!-- Username -->
        <div class="field mt-5">
          <label for="username" class="block mb-1">Username</label>
          <input
              id="username"
              v-model="form.username"
              type="text"
              class="w-full border p-2 rounded"
              :class="{ 'p-invalid': errors.username }"
          />
          <small v-if="errors.username" class="p-invalid">
            {{ errors.username }}
          </small>
        </div>

        <!-- Password -->
        <div class="field mt-5">
          <label for="password" class="block mb-1">Password</label>
          <input
              id="password"
              v-model="form.password"
              type="password"
              class="w-full border p-2 rounded"
              :class="{ 'p-invalid': errors.password }"
          />
          <small v-if="errors.password" class="p-invalid">
            {{ errors.password }}
          </small>
        </div>

        <!-- Store Error -->
        <p v-if="storeError" class="p-invalid text-center">
          {{ storeError }}
        </p>

        <!-- Submit -->
        <div class="mb-4 mt-6">
          <button
              type="submit"
              class="w-full bg-black text-white py-2 rounded-lg hover:bg-[#8298E7] focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            Sign In
          </button>
        </div>
      </form>

      <p class="text-center text-gray-600 text-sm mt-4">
        Don't have an account?
        <router-link to="/auth/sign-up" class="font-semibold hover:underline">
          Sign Up
        </router-link>
      </p>
    </div>

    <div class="image-container">
      <img
          src="https://shorturl.at/4SeZH"
          alt="aqua-engine-login-screen"
          class="cover-image"
      />
    </div>
  </div>
</template>

<style scoped>
.sign-in__container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.sign-in__form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}
.title {
  font-size: 60px;
}
.image-container {
  flex: 1;
  display: flex;
}
.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.p-invalid {
  color: #e02424;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>