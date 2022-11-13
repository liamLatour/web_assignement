<template>
  <div class="flex flex-wrap items-center justify-around pt-3 m-auto max-w-5xl">
    <rooms-list-item
      v-for="room in rooms"
      :room="room"
      :key="room.id"
      @room-updated="updateRoom"
    >
    </rooms-list-item>
  </div>
</template>

<script>
import axios from "axios";
import RoomsListItem from "../items/RoomsListItem.vue";

export default {
  components: {
    RoomsListItem,
  },
  name: "RoomsList",
  data: function () {
    return {
      /* Initialize rooms with an empty array, while waiting for actual data to be retrieved from the API */
      rooms: [],
    };
  },
  created: async function () {
    let response = await axios.get("/api/rooms", {
      auth: {
        username: "user",
        password: "password",
      },
    });
    let rooms = response.data;
    this.rooms = rooms;
  },
  methods: {
    updateRoom(newRoom) {
      /* Find the place of room object with the same Id in the array, and replace it */
      let index = this.rooms.findIndex((room) => room.id === newRoom.id);
      this.rooms.splice(index, 1, newRoom);
    },
  },
};
</script>

<style lang="scss" scoped></style>
