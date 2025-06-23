<script>
export default {
  name: "InventoryForm",

  props: {
    item: {type: Object, default: null}
  },

  data() {
    const isCreate = !this.item || this.item.mode === "create";

    return {
      isCreate,
      form: {
        name: this.item?.name || "",
        price: this.item?.price || 0,
        currency: "USD",
        initialQuantity: 0,
        threshold: this.item?.threshold || 0,
        adjustBy: 0,
        quantity: 0
      }
    };
  },

  methods: {
    submit() {
      if (this.isCreate) {

        const priceInt = Number(this.form.price);

        if (
          !this.form.name ||
          !Number.isInteger(priceInt) ||
          priceInt <= 0
        ) {
          alert("The price must be a positive integer");
          return;
        }

        this.$emit("save", {
          name: this.form.name,
          price: priceInt,
          currency: this.form.currency,
          initialQuantity: this.form.initialQuantity,
          threshold: this.form.threshold
        });
      } else if (this.item.mode === "adjust") {

        if (!this.form.adjustBy)
          return;
        this.$emit("save", {adjustBy: this.form.adjustBy});

      } else if (this.item.mode === "reserve" || this.item.mode === "release") {

        if (!this.form.quantity)
          return;
        this.$emit("save", {quantity: this.form.quantity});
      }
    }
  }
};
</script>

<template>
  <!-- Added high z-index to appear above the TopBar -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300" style="z-index: 2000;">
    <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"> <!-- Changed max width from max-w-md to max-w-sm -->
      <!-- Modal Header -->
      <h2 class="text-2xl font-bold mb-6">
        <template v-if="isCreate">
          {{ $t("inventory.newItem") }}
        </template>
        <template v-else-if="item.mode === 'adjust'">
          {{ $t("inventory.adjustStock") }}
        </template>
        <template v-else-if="item.mode === 'reserve'">
          {{ $t("inventory.reserve") }}
        </template>
        <template v-else>
          {{ $t("inventory.release") }}
        </template>
      </h2>

      <!-- Modal Form -->
      <template v-if="isCreate">
        <!-- Changed layout to 2-column grid; threshold spans full width -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium">{{ $t("inventory.name") }}</label>
            <input v-model="form.name" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          </div>
          <div>
            <label class="block mb-1 font-medium">{{ $t("inventory.price") }}</label>
            <input
              type="number"
              v-model="form.price"
              min="1"
              step="1"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">{{ $t("inventory.currency") }}</label>
            <select v-model="form.currency" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="USD">USD</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">{{ $t("inventory.initialQuantity") }}</label>
            <input type="number" v-model="form.initialQuantity" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          </div>
          <div class="col-span-2">
            <label class="block mb-1 font-medium">{{ $t("inventory.threshold") }}</label>
            <input type="number" v-model="form.threshold" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          </div>
        </div>
      </template>

      <template v-else-if="item.mode === 'adjust'">
        <div class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">{{ $t("inventory.adjustBy") }}</label>
            <input type="number" v-model="form.adjustBy" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">{{ $t("inventory.quantity") }}</label>
            <input type="number" v-model="form.quantity" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          </div>
        </div>
      </template>

      <!-- Form Buttons -->
      <div class="mt-6 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
          {{ $t("common.cancel") }}
        </button>
        <button @click="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          {{ $t("common.save") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>