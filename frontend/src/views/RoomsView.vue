<template>
  <h1 class="text-center text-5xl m-4">Rooms</h1>
  <RoomsList />
</template>

<script>
import RoomsList from "../components/lists/RoomsList.vue";

export default {
  components: {
    RoomsList,
  },
  name: "RoomsView",
};
</script>
