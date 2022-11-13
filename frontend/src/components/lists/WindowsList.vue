<template>
  <div class="flex flex-wrap items-center justify-around pt-3">
    <windows-list-item
      v-for="window in windows"
      :window="window"
      :key="window.id"
      @window-updated="updateWindow"
      @window-deleted="deleteWindow"
    >
    </windows-list-item>
  </div>
</template>

<script>
import axios from "axios";
import WindowsListItem from "../items/WindowsListItem.vue";

export default {
  components: {
    WindowsListItem,
  },
  name: "WindowsList",
  data: function () {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: [],
    };
  },
  created: async function () {
    let response = await axios.get("/api/windows", {
      auth: {
        username: "user",
        password: "password",
      },
    });
    let windows = response.data;
    this.windows = windows;
  },
  methods: {
    updateWindow(newWindow) {
      /* Find the place of window object with the same Id in the array, and replace it */
      let index = this.windows.findIndex(
        (window) => window.id === newWindow.id
      );
      this.windows.splice(index, 1, newWindow);
    },
    addWindow(newWindow) {
      this.windows.push(newWindow);
    },
    deleteWindow(delWindow) {
      let index = this.windows.findIndex(
        (window) => window.id === delWindow.id
      );
      this.windows.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
