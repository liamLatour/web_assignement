<template>
  <div class="flex h-full">
    <form class="flex flex-col bg-zinc-900 px-7 py-3 shadow-lg shrink min-w-0">
      <label class="text-center font-semibold text-xl mb-2">
        ADD A HEATER
      </label>
      <input
        v-model="name"
        id="name"
        placeholder="Heater Name"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      />

      <select
        v-model="room"
        id="room"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      >
        <option class="bg-zinc-900" value="" disabled selected>
          Select a Room
        </option>
        <option
          class="bg-zinc-900"
          v-for="r in rooms"
          v-bind:key="r.id"
          :value="r.id"
        >
          {{ r.name }}
        </option>
      </select>

      <input
        v-model="power"
        id="power"
        type="number"
        placeholder="Heater Power"
        class="p-3 rounded m-2 bg-transparent border font-bold text-base h-12"
      />

      <div class="py-3 m-2 h-12 flex items-center justify-between">
        <div>
          <label class="switch">
            <input type="checkbox" v-model="status" />
            <span class="slider"></span>
          </label>
          <div class="inline p-3">
            <label class="font-bold text-base" for="status" v-if="status">
              On
            </label>
            <label class="font-bold text-base" for="status" v-else> Off </label>
          </div>
        </div>
        <a
          href="#"
          v-on:click="addHeater"
          class="bg-green-500 rounded p-3 text-white font-bold"
          :class="{ disabled: cantAddHeater }"
        >
          ADD IT
        </a>
      </div>
    </form>

    <div class="m-auto mt-1 max-w-5xl">
      <h1 class="text-center text-5xl m-7">Heaters</h1>
      <HeatersList ref="heatersList" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeatersList from "../components/lists/HeatersList.vue";

export default {
  components: {
    HeatersList,
  },
  name: "HeatersView",
  data() {
    return {
      name: "",
      room: "",
      power: null,
      status: false,
      rooms: ["A", "BB", "CCC"],
    };
  },
  computed: {
    cantAddHeater: function () {
      return this.name == "" || this.room == "";
    },
  },
  created: async function () {
    let response = await axios.get("/api/rooms", {
      auth: {
        username: "admin",
        password: "pass",
      },
    });
    let rooms = response.data;
    this.rooms = rooms;
  },
  methods: {
    async addHeater() {
      console.log(this.power);
      let response = await axios.post(
        "/api/heaters/",
        {
          name: this.name,
          roomId: this.room,
          power: this.power,
          heaterStatus: this.status ? "ON" : "OFF",
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let newHeater = response.data;
      this.$refs.heatersList.addHeater(newHeater);
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

.switch {
  position: relative;
  display: inline-block;
  width: 40px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    border-radius: 4px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d82525;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    border-radius: 4px;
    background-color: rgb(83, 83, 83);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #16a34a;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
}
</style>
