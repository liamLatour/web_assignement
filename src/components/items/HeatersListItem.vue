<template>
  <div class="border rounded p-3 m-4 w-48">
    <span
      class="absolute cursor-pointer -left-2 -top-2 bg-red-600 rounded-3xl w-6 h-6 text-white text-center z-10"
      @click="deleteHeater"
    >
      &#x2716;
    </span>

    <div class="flex flex-col justify-center items-center">
      <input
        v-model="name"
        id="name"
        class="bg-transparent text-center font-bold text-xl px-2 m-1 w-full"
        size="1"
        @blur="renameHeater"
      />
      <div class="text-base">{{ heater.heaterName }}</div>
      <div class="text-lg" v-if="heater.power">Power: {{ heater.power }}</div>
      <div class="text-lg" v-else>-</div>

      <div class="flex items-center justify-around">
        <label class="switch h-6" @click="switchHeater">
          <span class="slider" :class="{ checked: isHeaterOn }"></span>
        </label>
        <div class="inline p-3 pb-1">
          <label class="font-bold text-base" v-if="isHeaterOn"> On </label>
          <label class="font-bold text-base" v-else> Off </label>
        </div>
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
    return {
      name: "",
    };
  },
  created: async function () {
    this.name = this.heater.name;
  },
  computed: {
    isHeaterOn: function () {
      return this.heater.heaterStatus === "ON";
    },
  },
  methods: {
    async renameHeater() {
      let response = await axios.post(
        "/api/heaters/",
        {
          id: this.heater.id,
          name: this.name,
          heaterStatus: this.heater.heaterStatus,
          power: this.heater.power,
          roomId: this.heater.roomId,
          roomName: this.heater.roomName,
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let updatedHeater = response.data;
      this.$emit("heater-updated", updatedHeater);
    },
    async switchHeater() {
      let response = await axios.put(
        "/api/heaters/" + this.heater.id + "/switch",
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let updatedHeater = response.data;
      this.$emit("heater-updated", updatedHeater);
    },
    async deleteHeater() {
      await axios.delete("/api/heaters/" + this.heater.id, {
        auth: {
          username: "admin",
          password: "pass",
        },
      });
      this.$emit("heater-deleted", this.heater);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;

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

  .checked {
    background-color: #16a34a;
  }

  .checked:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
}
</style>
