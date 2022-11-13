<template>
  <div class="border rounded p-2 m-4">
    <span
      class="absolute cursor-pointer -left-2 -top-2 bg-red-600 rounded-3xl w-6 h-6 text-white text-center z-10"
      >&#x2716;</span
    >

    <div class="flex flex-col justify-center items-center">
      <div class="font-bold text-xl p-3">{{ room.name }}</div>
      <div class="text-lg">{{ room.buildingName }}</div>
      <div class="text-lg">Floor: {{ room.floor }}</div>
      <div
        class="text-lg"
        v-if="room.currentTemperature && room.targetTemperature"
      >
        {{ room.currentTemperature }} / {{ room.targetTemperature }}
      </div>

      <div
        class="m-2 cursor-pointer text-base"
        :class="{ open: isRoomOpen, closed: !isRoomOpen }"
        @click="switchRoom"
      >
        <template v-if="isRoomOpen">
          <span class="text-green-600 text-xs -top-1">&#x2B24;</span> Open
        </template>
        <template v-else>
          <span class="text-red-600">&#x2716;</span> Closed
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomsListItem",
  props: ["room"],
  data: function () {
    return {};
  },
  computed: {
    isRoomOpen: function () {
      return this.room.roomStatus === "OPEN";
    },
  },
  methods: {
    async switchRoom() {
      let response = await axios.put("/api/rooms/" + this.room.id + "/switch", {
        auth: {
          username: "user",
          password: "password",
        },
      });
      let updatedRoom = response.data;
      this.$emit("room-updated", updatedRoom);
    },
  },
};
</script>

<style lang="scss" scoped></style>
