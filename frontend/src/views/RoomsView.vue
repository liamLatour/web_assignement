<template>
  <div class="flex h-full">
    <form
      class="flex flex-col bg-zinc-900 px-7 py-3 shadow-lg shrink min-w-fit grow-0"
    >
      <label class="text-center font-semibold text-xl mb-2"> ADD A ROOM </label>
      <input
        v-model="name"
        id="name"
        placeholder="Room Name"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      />

      <select
        v-model="building"
        id="building"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      >
        <option class="bg-zinc-900" value="" disabled selected>
          Select a Building
        </option>
        <option
          class="bg-zinc-900"
          v-for="b in buildings"
          v-bind:key="b.id"
          :value="b.id"
        >
          {{ b.name }}
        </option>
      </select>

      <input
        v-model="floor"
        id="floor"
        type="number"
        placeholder="Room Floor"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      />

      <div class="flex justify-between">
        <input
          v-model="currentTemperature"
          id="currentTemperature"
          type="number"
          placeholder="Current Temp"
          min="-999"
          max="999"
          class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12 grow"
        />
        <input
          v-model="targetTemperature"
          id="targetTemperature"
          type="number"
          placeholder="Target Temp"
          min="-999"
          max="999"
          class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12 grow"
        />
      </div>

      <a
        href="#"
        v-on:click="addRoom"
        class="bg-green-500 rounded p-3 m-2 text-center text-white font-bold"
        :class="{ disabled: cantAddRoom }"
      >
        ADD IT
      </a>
    </form>

    <div class="m-auto mt-1 max-w-5xl">
      <h1 class="text-center text-5xl m-7">Rooms</h1>
      <RoomsList ref="roomsList" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RoomsList from "../components/lists/RoomsList.vue";

export default {
  components: {
    RoomsList,
  },
  name: "RoomsView",

  data() {
    return {
      name: "",
      building: "",
      floor: "",
      currentTemperature: "",
      targetTemperature: "",
      buildings: ["A", "BB", "CCC"],
    };
  },
  computed: {
    cantAddRoom: function () {
      return this.name == "" || this.building == "" || this.floor == "";
    },
  },
  created: async function () {
    let response = await axios.get("/api/buildings", {
      auth: {
        username: "admin",
        password: "pass",
      },
    });
    let buildings = response.data;
    this.buildings = buildings;
  },
  methods: {
    async addRoom() {
      let response = await axios.post(
        "/api/rooms/",
        {
          name: this.name,
          buildingId: this.building,
          currentTemperature: this.currentTemperature,
          targetTemperature: this.targetTemperature,
          floor: this.floor,
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let newRoom = response.data;
      this.$refs.roomsList.addRoom(newRoom);
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
