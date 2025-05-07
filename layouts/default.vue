<template>
  <div>
    <NavigationHeader
      @openAddBoardgameModal="isAddBoardgameModalOpened = true"
      @openLoginModal="isLoginModalOpened = true"
      @logout="logout"
      :isServerDown="isServerDown"
    ></NavigationHeader>
    <slot />
    <ModalAddBoardGame
      v-if="isAddBoardgameModalOpened"
      @close="isAddBoardgameModalOpened = false"
      @addBoardgame="addBoardgame"
      @click=""
    />
    <ModalLogin
      v-if="isLoginModalOpened"
      @close="isLoginModalOpened = false"
      @login="loginAsync"
      @openSignUp="
        isSignUpModalOpened = true;
        isLoginModalOpened = false;
      "
    />
    <ModalSignUp
      v-if="isSignUpModalOpened"
      @close="isSignUpModalOpened = false"
      @signup="signupAsync"
      @openLogin="
        isLoginModalOpened = true;
        isSignUpModalOpened = false;
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { login } from "~/api/User";

const { isServerDown } = await useUseServerStatus();
const boardgamesData = ref([] as IBoardgame[]);

const userData = ref({} as IUser | {});

provide("userData", {
  userData: userData,
  updateUserData: (newData: any) => {
    userData.value = newData;
  },
});

provide("boardgamesData", {
  boardgamesData: boardgamesData,
  updateBoardgamesData: (newData: any) => {
    boardgamesData.value = newData;
  },
});

boardgamesData.value = await getBoardgamesAsync();

const isAddBoardgameModalOpened = ref(false);
const isLoginModalOpened = ref(false);
const isSignUpModalOpened = ref(false);

async function loginAsync(payload: { username: string; password: string }) {
  const response = await login(payload.username, payload.password);
  if (response) {
    userData.value = response;
    console.log("User data updated:", userData.value);
    isLoginModalOpened.value = false;
  } else {
    console.log("Login failed");
  }
}
async function logout() {
  userData.value = {};
  console.log("User logged out");
}
async function signupAsync(payload: { username: string; password: string }) {}

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
