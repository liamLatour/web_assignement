<template>
  <div class="flex flex-wrap items-center justify-around pt-3">
    <div class="lds-dual-ring" v-if="!fetched"></div>
    <windows-list-item
      v-else
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
      fetched: false,
      windows: [],
    };
  },
  created: async function () {
    let response = await axios.get("/api/windows", {
      auth: {
        username: "admin",
        password: "pass",
      },
    });
    let windows = response.data;
    this.windows = windows;
    this.fetched = true;
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
