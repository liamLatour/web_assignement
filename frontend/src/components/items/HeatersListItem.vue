<template>
  <div class="border rounded p-2 m-4">
    <span
      class="absolute cursor-pointer -left-2 -top-2 bg-red-600 rounded-3xl w-6 h-6 text-white text-center z-10"
      >&#x2716;</span
    >

    <div class="flex flex-col justify-center items-center">
      <div class="font-bold text-xl p-3">{{ heater.name }}</div>
      <div class="text-sm">{{ heater.roomName }}</div>
      <div class="text-lg" v-if="heater.power">Power: {{ heater.power }}</div>

      <div
        class="m-2 cursor-pointer text-base"
        :class="{ open: isHeaterOn, closed: !isHeaterOn }"
        @click="switchHeater"
      >
        <template v-if="isHeaterOn">
          <span class="text-green-600 text-xs -top-1">&#x2B24;</span> On
        </template>
        <template v-else>
          <span class="text-red-600">&#x2716;</span> Off
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HeatersListItem",
  props: ["heater"],
  data: function () {
    return {};
  },
  computed: {
    isHeaterOn: function () {
      return this.heater.heaterStatus === "ON";
    },
  },
  methods: {
    async switchHeater() {
      let response = await axios.put(
        "/api/heaters/" + this.heater.id + "/switch",
        {
          auth: {
            username: "user",
            password: "password",
          },
        }
      );
      let updatedHeater = response.data;
      this.$emit("heater-updated", updatedHeater);
    },
  },
};
</script>

<style lang="scss" scoped></style>
