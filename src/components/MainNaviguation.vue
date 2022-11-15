<template>
  <div class="bg-neutral-800">
    <ul class="flex m-auto max-w-5xl">
      <RouterLink class="p-1 m-2 text-base rounded" to="/buildings">
        Buildings
      </RouterLink>
      <RouterLink class="p-1 m-2 text-base rounded" to="/rooms">
        Rooms
      </RouterLink>
      <RouterLink class="p-1 m-2 text-base rounded" to="/heaters">
        Heaters
      </RouterLink>
      <RouterLink class="p-1 m-2 text-base rounded" to="/windows">
        Windows
      </RouterLink>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainNavigation",
};
</script>

<style lang="scss" scoped></style>
