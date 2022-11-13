<template>
  <div class="flex flex-wrap items-center justify-around pt-3 m-auto max-w-5xl">
    <heaters-list-item
      v-for="heater in heaters"
      :heater="heater"
      :key="heater.id"
      @heater-updated="updateHeater"
    >
    </heaters-list-item>
  </div>
</template>

<script>
import axios from "axios";
import HeatersListItem from "../items/HeatersListItem.vue";

export default {
  components: {
    HeatersListItem,
  },
  name: "HeatersList",
  data: function () {
    return {
      heaters: [],
    };
  },
  created: async function () {
    let response = await axios.get("/api/heaters", {
      auth: {
        username: "user",
        password: "password",
      },
    });
    let heaters = response.data;
    this.heaters = heaters;
  },
  methods: {
    updateHeater(newHeater) {
      let index = this.heaters.findIndex(
        (heater) => heater.id === newHeater.id
      );
      this.heaters.splice(index, 1, newHeater);
    },
  },
};
</script>

<style lang="scss" scoped></style>
