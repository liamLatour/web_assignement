<template>
  <main-navigation></main-navigation>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import MainNavigation from "./components/MainNaviguation.vue";

export default {
  name: "App",
  components: {
    MainNavigation,
  },
  data: function () {
    return {
      title: "My App Title",
    };
  },
};
</script>

<style lang="scss"></style>
