<template>
  <div class="flex h-full">
    <form class="flex flex-col bg-zinc-900 px-7 py-3 shadow-lg shrink min-w-0">
      <label class="text-center font-semibold text-xl mb-2">
        ADD A BUILDING
      </label>
      <input
        v-model="name"
        id="name"
        placeholder="Building Name"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      />

      <input
        v-model="address"
        id="address"
        placeholder="Building Address"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      />

      <a
        href="#"
        v-on:click="addBuilding"
        class="bg-green-500 rounded p-3 m-2 text-center text-white font-bold"
        :class="{ disabled: cantAddBuilding }"
      >
        ADD IT
      </a>
    </form>

    <div class="m-auto mt-1 max-w-5xl">
      <h1 class="text-center text-5xl m-7">Buildings</h1>
      <BuildingsList ref="buildingsList" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BuildingsList from "../components/lists/BuildingsList.vue";

export default {
  components: {
    BuildingsList,
  },
  name: "BuildingsView",

  data() {
    return {
      name: "",
      address: "",
    };
  },
  computed: {
    cantAddBuilding: function () {
      return this.name == "" || this.address == "";
    },
  },
  methods: {
    async addBuilding() {
      let response = await axios.post(
        "http://liam-latour.cleverapps.io/api/buildings/",
        {
          name: this.name,
          address: this.address,
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let newBuilding = response.data;
      this.$refs.buildingsList.addBuilding(newBuilding);
    },
  },
};
</script>

<style lang="scss" scoped>
a.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.3;
}

</style>
