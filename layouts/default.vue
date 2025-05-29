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
    <ModalVerifyEmailCode
      :user="userData.value"
      v-if="isVerifyEmailOpened"
      @close="isVerifyEmailOpened = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { tr } from "@nuxt/ui/runtime/locale/index.js";
import { login, signup } from "~/api-calls/User";

const { isServerDown } = await useUseServerStatus();
const boardgamesData = ref([] as IBoardgame[]);

const userData = ref({} as IUser | any);

provide("userData", {
  userData: userData,
  updateUserData: (newData: any) => {
    userData.value = newData;
  },
});

const isAddBoardgameModalOpened = ref(false);
const isLoginModalOpened = ref(false);
const isSignUpModalOpened = ref(false);
const isVerifyEmailOpened = ref(false);

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
async function signupAsync(payload: {
  username: string;
  email: string;
  password: string;
}) {
  const response = (await signup(
    payload.username,
    payload.email,
    payload.password
  )) as any;
  if (response.wasSignupSuccessfull) {
    userData.value = response;
    console.log("User data updated:", userData.value);
    isLoginModalOpened.value = false;
    isSignUpModalOpened.value = false;
    isVerifyEmailOpened.value = true;
  } else {
    console.log("Login failed");
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
    headers: {
      Authorization: `Bearer ${userData.value.accessToken}`,
    },
  });

  console.log(response);
  $boardgameAdded();
  console.log("boardgameAdded1");
}
function getBoardGames() {
  return boardgamesData.value;
}

defineExpose({ addBoardgame, getBoardGames });
</script>

<style></style>
