<template>
  <div class="border rounded p-3 m-4 w-60 h-36">
    <span
      class="absolute cursor-pointer -left-2 -top-2 bg-red-600 rounded-3xl w-6 h-6 text-white text-center z-10"
      @click="deleteWindow"
    >
      &#x2716;
    </span>

    <div class="flex flex-col justify-between items-center h-full">
      <input
        v-model="name"
        id="name"
        class="bg-transparent text-center font-bold text-xl px-2 m-1 w-full"
        size="1"
        @blur="renameBuilding"
      />
      <div class="text-lg p-3">{{ building.address }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BuildingsListItem",
  props: ["building"],
  data: function () {
    return {
      name: "",
    };
  },
  created: async function () {
    this.name = this.building.name;
  },
  methods: {
    async renameBuilding() {
      let response = await axios.post(
        "/api/buildings/",
        {
          id: this.building.id,
          name: this.name,
          address: this.building.address,
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let updatedBuilding = response.data;
      this.$emit("building-updated", updatedBuilding);
    },
    async deleteWindow() {
      await axios.delete("/api/buildings/" + this.building.id, {
        auth: {
          username: "admin",
          password: "pass",
        },
      });
      this.$emit("building-deleted", this.building);
    },
  },
};
</script>

<style lang="scss" scoped></style>
