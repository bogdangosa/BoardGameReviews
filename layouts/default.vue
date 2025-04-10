<template>
  <div>
    <NavigationHeader
      @openAddBoardgameModal="isModalOpened = true"
      :isServerDown="isServerDown"
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

const { isServerDown } = await useUseServerStatus();
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
  try {
    const response = (await $fetch(serverAdress + "/Boardgame/get-all"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }) as any;
    console.log(response);
    const result = response.map((boardgame: any) => ({
      boardgameId: boardgame.boardgameId,
      title: boardgame.title,
      description: boardgame.description,
      image: "/catan.jpg",
      rating: boardgame.rating,
      category: boardgame.category,
      myRating: null,
    }));
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error fetching boardgames:", error);
    return [];
  }
}

const { $boardgameAdded } = useNuxtApp();

async function addBoardgame(newBoardgame: IBoardgame) {
  const config = useRuntimeConfig();
  const serverAdress = config.public.serverAdress;

  const formData = new FormData();

  formData.append("title", newBoardgame.title);
  formData.append("description", newBoardgame.description);
  formData.append("category", newBoardgame.category);
  formData.append("releaseDate", new Date().toISOString());
  formData.append("imageFile", newBoardgame.image);
  formData.append("nrOfPlayers", "0");
  formData.append("playTime", "0");
  formData.append("weight", "0");
  formData.append("rating", "0");

  const response = await $fetch(serverAdress + "/Boardgame/add", {
    method: "POST",
    body: formData,
  });

  console.log(response);
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
