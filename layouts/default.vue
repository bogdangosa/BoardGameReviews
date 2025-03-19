<template>
  <div>
    <NavigationHeader></NavigationHeader>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const boardgamesData = ref([
  {
    id: 1,
    title: "Azul Duel",
    description: "Decorate a palace ceiling after creating your own pattern.",
    image: "azul_duel.png",
  },
  {
    id: 2,
    title: "Calico",
    description: "Sew a quilt, collect buttons, attract cats!",
    image: "calico.png",
  },
  {
    id: 3,
    title: "Dune Imperium",
    description: "Influence, intrigue, and combat in the universe of Dune.",
    image: "dune_imperium.png",
  },
]);

provide("boardgamesData", {
  boardgamesData: boardgamesData,
  updateBoardgamesData: (newData: any) => {
    boardgamesData.value = newData;
  },
});
</script>

<style></style>
