<template>
  <div class="flex flex-wrap items-center justify-around pt-3">
    <div class="lds-dual-ring" v-if="!fetched"></div>
    <rooms-list-item
      v-else
      v-for="room in rooms"
      :room="room"
      :key="room.id"
      @room-updated="updateRoom"
      @room-deleted="deleteRoom"
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
      fetched: false,
      rooms: [],
    };
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
    this.fetched = true;
  },
  methods: {
    updateRoom(newRoom) {
      let index = this.rooms.findIndex((room) => room.id === newRoom.id);
      this.rooms.splice(index, 1, newRoom);
    },
    addRoom(newRoom) {
      this.rooms.push(newRoom);
    },
    deleteRoom(delRoom) {
      let index = this.rooms.findIndex((room) => room.id === delRoom.id);
      this.rooms.splice(index, 1);
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
