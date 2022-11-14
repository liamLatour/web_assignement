<template>
  <div class="flex flex-wrap items-center justify-around pt-3">
    <div class="lds-dual-ring" v-if="!fetched"></div>
    <heaters-list-item
      v-else
      v-for="heater in heaters"
      :heater="heater"
      :key="heater.id"
      @heater-updated="updateHeater"
      @heater-deleted="deleteHeater"
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
      fetched: false,
      heaters: [],
    };
  },
  created: async function () {
    let response = await axios.get("/api/heaters", {
      auth: {
        username: "admin",
        password: "pass",
      },
    });
    let heaters = response.data;
    this.heaters = heaters;
    this.fetched = true;
  },
  methods: {
    updateHeater(newHeater) {
      let index = this.heaters.findIndex(
        (heater) => heater.id === newHeater.id
      );
      this.heaters.splice(index, 1, newHeater);
    },
    addHeater(newHeater) {
      this.heaters.push(newHeater);
    },
    deleteHeater(delHeater) {
      let index = this.heaters.findIndex(
        (heater) => heater.id === delHeater.id
      );
      this.heaters.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
