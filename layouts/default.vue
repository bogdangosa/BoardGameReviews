<template>
  <div>
    <NavigationHeader
      @openAddBoardgameModal="isModalOpened = true"
    ></NavigationHeader>
    <slot />
    <ModalAddBoardGame
      v-if="isModalOpened"
      @close="isModalOpened = false"
      @addBoardgame="addBoardgame"
      @click=""
    />
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
    myRating: 8,
  },
  {
    id: 2,
    title: "Lost Ruins of Arnak",
    description: "Explore an island, discover artifacts, and defeat guardians.",
    image: "/lost_ruins_of_arnak.jpg",
    rating: 8.0,
    category: "Strategy",
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
    title: "Calico",
    description: "Sew a quilt, collect buttons, attract cats!",
    image: "/calico.jpg",
    rating: 7.5,
    category: "Abstract",
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
  {
    id: 7,
    title: "Monopoly",
    description:
      "In this competitive real estate market, there's only one possible outcome: Monopoly! ",
    image: "/monopoly.jpg",
    rating: 3.0,
    category: "Family",
  },
  {
    id: 8,
    title: "Codenames",
    description:
      "Give your team clever one-word clues to help them spot their agents in the field.",
    image: "/codenames.jpg",
    rating: 7.5,
    category: "Party",
  },
]);

provide("boardgamesData", {
  boardgamesData: boardgamesData,
  updateBoardgamesData: (newData: any) => {
    boardgamesData.value = newData;
  },
});

const isModalOpened = ref(false);

function addBoardgame(newBoardgame: IBoardgame) {
  console.log("Adding boardgame");
  boardgamesData.value = [
    ...boardgamesData.value,
    {
      id: boardgamesData.value.length + 1,
      title: newBoardgame.title,
      description: newBoardgame.description,
      image: newBoardgame.image,
      category: newBoardgame.category,
      rating: newBoardgame.rating,
    },
  ];
}
function getBoardGames() {
  return boardgamesData.value;
}

defineExpose({ addBoardgame, getBoardGames });
</script>

<style></style>
