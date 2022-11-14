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
        @blur="renameWindow"
      />
      <div class="text-base">{{ window.roomName }}</div>

      <div class="flex items-center justify-around">
        <label class="switch h-6" @click="switchWindow">
          <span class="slider" :class="{ checked: isWindowOpen }"></span>
        </label>
        <div class="inline p-3 pb-1">
          <label class="font-bold text-base" v-if="isWindowOpen">
            Opened
          </label>
          <label class="font-bold text-base" v-else> Closed </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WindowsListItem",
  props: ["window"],
  data: function () {
    return {
      name: "",
    };
  },
  created: async function () {
    this.name = this.window.name;
  },
  computed: {
    isWindowOpen: function () {
      return this.window.windowStatus === "OPEN";
    },
  },
  methods: {
    async renameWindow() {
      let response = await axios.post(
        "/api/windows/",
        {
          id: this.window.id,
          name: this.name,
          roomId: this.window.roomId,
          roomName: this.window.roomName,
          windowStatus: this.window.windowStatus,
        },
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let updatedWindow = response.data;
      this.$emit("window-updated", updatedWindow);
    },
    async switchWindow() {
      let response = await axios.put(
        "/api/windows/" + this.window.id + "/switch",
        {
          auth: {
            username: "admin",
            password: "pass",
          },
        }
      );
      let updatedWindow = response.data;
      this.$emit("window-updated", updatedWindow);
    },
    async deleteWindow() {
      await axios.delete("/api/windows/" + this.window.id, {
        auth: {
          username: "admin",
          password: "pass",
        },
      });
      this.$emit("window-deleted", this.window);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;

  .slider {
    position: absolute;
    cursor: pointer;
    border-radius: 4px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d82525;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    border-radius: 4px;
    background-color: rgb(83, 83, 83);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .checked {
    background-color: #16a34a;
  }

  .checked:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
}
</style>
