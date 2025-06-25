<script>
import { useAuthStore } from "@/features/auth/application/stores/useAuthStore.js";

export default {
  name: "SignUpView",

  data() {
    return {
      form: {
        username: "",
        password: "",
        role: "",
        firstName: "",
        lastName: "",
        ruc: "",
        contactEmail: "",
        contactPhone: "",
        companyName: "",
        companyStreet: "",
        companyCity: "",
        postalCode: "",
        companyNumber: "",
        companyCountry: ""
      },

      errors: {},

      fields: [
        { model: "username", label: "Username", type: "text" },
        { model: "password", label: "Password", type: "password" },
        { model: "firstName", label: "First Name", type: "text" },
        { model: "lastName", label: "Last Name", type: "text" },
        { model: "ruc", label: "RUC", type: "text", numeric: true },
        { model: "contactEmail", label: "Contact Email", type: "email" },
        { model: "contactPhone", label: "Contact Phone", type: "text", numeric: true},
        { model: "companyName", label: "Company Name", type: "text" },
        { model: "companyStreet", label: "Company Street", type: "text" },
        { model: "companyCity", label: "Company City", type: "text" },
        { model: "postalCode", label: "Postal Code", type: "text", numeric: true },
        { model: "companyNumber", label: "Company Number", type: "text", numeric: true },
        { model: "companyCountry", label: "Company Country", type: "text" },
        {
          model: "role",
          label: "Role",
          type: "select",
          options: [
            { value: "ROLE_MACHINERY_PROVIDER", label: "Machinery Provider" },
            { value: "ROLE_FISHING_COMPANY", label: "Fishing Company" }
          ]
        }
      ],
      authStore: null
    };
  },
  computed: {
    storeError() {
      return this.authStore?.error;
    }
  },

  created() {
    this.authStore = useAuthStore();
  },

  methods: {
    restrictToNumbers(field) {
      let value = this.form[field].replace(/\D/g, '');

      if (field === 'ruc') {
        value = value.slice(0, 11);
      }

      else if (field === 'contactPhone' || field === 'companyNumber') {
        value = value.slice(0, 9);
      }
      else if (field === 'postalCode') {
        value = value.slice(0, 5);
      }


      this.form[field] = value;
    },
    validate() {
      this.fields.forEach(field => {
        this.errors[field.model] = this.form[field.model]
            ? ""
            : `${field.label} is required.`;
      });
      return Object.values(this.errors).every(e => !e);
    },

    async onSignUp() {
      if (!this.validate()) return;
      try {
        await this.authStore.signUp(this.form);
        this.$router.replace("/auth/sign-in");
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<template>
  <div class="sign-up__container flex justify-center items-center min-h-screen p-6 bg-gray-50">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center">Sign Up</h1>
      <p class="mb-6 text-center text-gray-600">
        Please enter the required information to sign up.
      </p>
      <form @submit.prevent="onSignUp" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="field in fields" :key="field.model" class="flex flex-col">
            <label :for="field.model" class="mb-1 font-semibold text-gray-700">
              {{ field.label }}
            </label>

            <template v-if="field.type === 'select'">
              <select
                  :id="field.model"
                  v-model="form[field.model]"
                  class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors[field.model] }"
              >
                <option disabled value="">Select a role</option>
                <option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </template>

            <template v-else>
              <input
                  :id="field.model"
                  v-model="form[field.model]"
                  :type="field.type"
                  :inputmode="field.numeric ? 'numeric' : undefined"
                  :pattern="field.numeric ? '[0-9]*' : undefined"
                  @input="field.numeric ? restrictToNumbers(field.model) : null"
                  class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors[field.model] }"
              />
            </template>

            <small v-if="errors[field.model]" class="text-red-500 mt-1 text-sm">
              {{ errors[field.model] }}
            </small>
          </div>
        </div>

        <!-- Error global del store -->
        <p v-if="storeError" class="text-red-500 text-center">{{ storeError }}</p>

        <button
            type="submit"
            class="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </form>

      <p class="mt-6 text-center text-gray-600">
        Already have an account?
        <router-link to="/auth/sign-in" class="font-semibold hover:underline">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>


<style scoped>
.sign-up__container {
  background: #f9fafb;
}
</style>