<template>
  <div class="flex flex-wrap items-center justify-around pt-3">
    <div class="lds-dual-ring" v-if="!fetched"></div>
    <buildings-list-item
      v-else
      v-for="building in buildings"
      :building="building"
      :key="building.id"
      @building-updated="updateBuilding"
      @building-deleted="deleteBuilding"
    >
    </buildings-list-item>
  </div>
</template>

<script>
import axios from "axios";
import BuildingsListItem from "../items/BuildingsListItem.vue";

export default {
  components: {
    BuildingsListItem,
  },
  name: "BuildingsList",
  data: function () {
    return {
      fetched: false,
      buildings: [],
    };
  },
  created: async function () {
    let response = await axios.get(
      "http://liam-latour.cleverapps.io/api/buildings",
      {
        auth: {
          username: "admin",
          password: "pass",
        },
      }
    );
    let buildings = response.data;
    this.buildings = buildings;
    this.fetched = true;
  },
  methods: {
    updateBuilding(newBuilding) {
      let index = this.buildings.findIndex(
        (building) => building.id === newBuilding.id
      );
      this.buildings.splice(index, 1, newBuilding);
    },
    addBuilding(newBuilding) {
      this.buildings.push(newBuilding);
    },
    deleteBuilding(delBuilding) {
      let index = this.buildings.findIndex(
        (building) => building.id === delBuilding.id
      );
      this.buildings.splice(index, 1);
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
