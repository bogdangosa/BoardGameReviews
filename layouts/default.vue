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
    image: "/azul_duel.jpg",
    rating: 8.5,
    category: "Abstract",
  },
  {
    id: 2,
    title: "Calico",
    description: "Sew a quilt, collect buttons, attract cats!",
    image: "/calico.jpg",
    rating: 7.5,
    category: "Abstract",
  },
  {
    id: 3,
    title: "Dune Imperium",
    description: "Influence, intrigue, and combat in the universe of Dune.",
    image: "/dune_imperium.jpg",
    rating: 8.0,
    category: "Strategy",
  },
  {
    id: 4,
    title: "Lost Ruins of Arnak",
    description: "Explore an island, discover artifacts, and defeat guardians.",
    image: "/lost_ruins_of_arnak.jpg",
    rating: 8.0,
    category: "Strategy",
  },
  {
    id: 5,
    title: "Pandemic Legacy",
    description:
      "Mutating diseases are spreading around the world - can your team save humanity? ",
    image: "/pandemic_legacy.jpg",
    rating: 9.5,
    category: "Cooperative",
  },
  {
    id: 6,
    title: "The Crew",
    description:
      "Complete missions in space in this cooperative trick-taking game.",
    image: "/the_crew.jpg",
    rating: 8.0,
    category: "Cooperative",
  },
]);

const ratingsData = ref([
  {
    id: 1,
    rating: 8.5,
  },
  {
    id: 2,
    rating: 7.5,
  },
  {
    id: 4,
    rating: 8.0,
  },
  {
    id: 5,
    rating: 9.5,
  },
  {
    id: 6,
    rating: 8.0,
  },
]);

provide("boardgamesData", {
  boardgamesData: boardgamesData,
  updateBoardgamesData: (newData: any) => {
    boardgamesData.value = newData;
  },
});

provide("ratingsData", {
  ratings: ratingsData,
  updateRatingsData: (newData: any) => {
    ratingsData.value = newData;
  },
});
</script>

<style></style>
