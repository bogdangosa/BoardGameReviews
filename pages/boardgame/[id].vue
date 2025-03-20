<template>
  <div>
    <div class="hero-game flex justify-center">
      <img class="cover-image" :src="`/azul_duel_cover.jpg`" />
      <div class="container p-8 gap-4 flex flex-col items-start">
        <div class="flex gap-8 h-full">
          <img
            class="game-image"
            :src="`/${thisBoardgame.image}`"
            alt="Boardgame cover"
          />
          <div class="text-container">
            <div class="score-container flex justify-center items-center">
              <span class="score">8.5 </span>
            </div>
            <div class="flex gap-4">
              <h2 class="c-background1 bold">
                {{ thisBoardgame.id + ". " + thisBoardgame.title }}
              </h2>
              <img
                class="button"
                @click="isDeleteModalOpened = true"
                :src="`/delete.svg`"
                alt=""
              />
              <img
                class="button"
                @click="isEditModalOpened = true"
                :src="`/edit.svg`"
                alt=""
              />
            </div>
            <p class="c-background1">{{ thisBoardgame.description }}</p>
          </div>
        </div>
        <div class="rating-container flex gap-2 justify-center items-center">
          <p class="c-background1">my rating:</p>
          <StarsRating :rating="8" />
        </div>
      </div>
    </div>
    <main>
      <div class="container p-8">
        <h2 class="c-text1">Description:</h2>
        <p class="c-text3">
          Decorate the magnificent ceilings of the palace. Will the vaults look
          more beautiful by day or by night? Azul Duel invites you to play with
          light and pit opposites against each other.
        </p>
        <p class="c-text3">
          This competitive strategic game for two players retains the purity and
          elegance of the original Azul while adding an extra tactical dimension
          in which you determine the pattern in which tiles will be placed, in
          addition to drafting tiles to complete that pattern.
        </p>
      </div>
    </main>
    <ModalDeleteBoardGame
      v-if="isDeleteModalOpened"
      @close="isDeleteModalOpened = false"
      @deleteBoardgame="deleteBoardgame"
    />
  </div>
</template>

<script lang="ts" setup>
interface Boardgame {
  id: number;
  title: string;
  description: string;
  image: string;
}

const isDeleteModalOpened = ref(false);
const isEditModalOpened = ref(false);
const route = useRoute();

const thisBoardgame = ref({
  id: 0,
  title: "aaa",
  description: "bbb",
  image: "",
});

const injectedData = inject<{
  boardgamesData: Ref<Boardgame[]>;
  updateBoardgamesData: (newData: any) => void;
}>("boardgamesData");

if (!injectedData) {
  throw new Error("boardgamesData is not provided");
}

const { boardgamesData, updateBoardgamesData } = injectedData;
const boardgameId = Number(route.params.id);
const thisBoardgameValue = boardgamesData.value.find(
  (boardgame: any) => boardgame.id === boardgameId
);
if (thisBoardgameValue) {
  thisBoardgame.value = thisBoardgameValue;
}
console.log(boardgamesData);
function deleteBoardgame() {
  const newBoardgamesData = boardgamesData.value.filter(
    (boardgame: any) => boardgame.id !== boardgameId
  );
  updateBoardgamesData(newBoardgamesData);
  navigateTo("/");
}
</script>

<style>
.hero-game {
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  z-index: -1;
}
.score-container {
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
  background-color: #037b0d;
}
.score {
  color: var(--background-color-1);
  font-size: 1.5rem;
  font-weight: 600;
}

.text-container {
  max-width: 350px;
}
.game-image {
  border-radius: 0.5rem;
  height: 12rem;
}
.button {
  cursor: pointer;
}
</style>
