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
import axios from "axios";

const boardgamesData = ref([] as IBoardgame[]);

provide("boardgamesData", {
  boardgamesData: boardgamesData,
  updateBoardgamesData: (newData: any) => {
    boardgamesData.value = newData;
  },
});

boardgamesData.value = await getBoardgamesAsync();

const isModalOpened = ref(false);

async function getBoardgamesAsync() {
  const config = useRuntimeConfig();
  const serverAdress = config.public.serverAdress;

  const response = await axios.get(serverAdress + "/Boardgame/get-all");
  console.log(response.data);
  const result = response.data.map((boardgame: any) => ({
    id: boardgame.boardgameId,
    title: boardgame.title,
    description: boardgame.description,
    image: "/catan.jpg",
    rating: boardgame.rating,
    category: boardgame.category,
    myRating: null,
  }));
  console.log(result);
  return result;
}

const { $boardgameAdded } = useNuxtApp();

async function addBoardgame(newBoardgame: IBoardgame) {
  const config = useRuntimeConfig();
  const serverAdress = config.public.serverAdress;

  const response = await axios.post(serverAdress + "/Boardgame/add", {
    title: newBoardgame.title,
    description: newBoardgame.description,
    category: newBoardgame.category,
    releaseDate: new Date(),
    nrOfPlayers: 0,
    playTime: 0,
    weight: 0,
    rating: 0,
  });
  console.log(response.data);

  console.log(response.data);
  boardgamesData.value = await getBoardgamesAsync();
  $boardgameAdded();
  console.log("boardgameAdded1");
}
function getBoardGames() {
  return boardgamesData.value;
}

defineExpose({ addBoardgame, getBoardGames });
</script>

<style></style>
