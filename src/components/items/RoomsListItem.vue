<template>
  <div class="border rounded p-3 m-4 w-40">
    <span
      class="absolute cursor-pointer -left-2 -top-2 bg-red-600 rounded-3xl w-6 h-6 text-white text-center z-10"
      @click="deleteWindow"
    >
      &#x2716;
    </span>

    <div class="flex flex-col justify-center items-center">
      <input
        v-model="name"
        id="name"
        class="bg-transparent text-center font-bold text-xl px-2 m-1 w-full"
        size="1"
        @blur="renameRoom"
      />

      <div class="text-lg">{{ room.buildingName }}</div>
      <div class="text-lg">Floor: {{ room.floor }}</div>
      <div
        class="text-lg"
        v-if="room.currentTemperature && room.targetTemperature"
      >
        {{ room.currentTemperature }} / {{ room.targetTemperature }}
      </div>
      <div class="text-lg" v-else>-</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomsListItem",
  props: ["room"],
  data: function () {
    return {
      name: "",
    };
  },
  created: async function () {
    this.name = this.room.name;
  },
  methods: {
    async renameRoom() {
      let response = await axios.post(
        "/api/rooms/",
        {
          buildingId: this.room.buildingId,
          buildingName: this.room.buildingName,
          currentTemperature: this.room.currentTemperature,
          targetTemperature: this.room.targetTemperature,
          floor: this.room.floor,
          id: this.room.id,
          name: this.name,
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let updatedRoom = response.data;
      this.$emit("room-updated", updatedRoom);
    },
    async deleteWindow() {
      await axios.delete("/api/rooms/" + this.room.id, {
        auth: {
          username: "admin",
          password: "pass",
        },
      });
      this.$emit("room-deleted", this.room);
    },
  },
};
</script>

<style lang="scss" scoped></style>
