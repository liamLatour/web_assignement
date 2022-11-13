<template>
  <h1 class="text-center text-5xl m-4">Heaters</h1>
  <HeatersList />
</template>

<script>
import HeatersList from "../components/lists/HeatersList.vue";

export default {
  components: {
    HeatersList,
  },
  name: "HeatersView",
};
</script>
