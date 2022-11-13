<template>
  <h1 class="text-center text-5xl m-4">Windows</h1>
  <WindowsList />
</template>

<script>
import WindowsList from "../components/WindowsList.vue";

export default {
  components: {
    WindowsList,
  },
  name: "WindowsView",
};
</script>
