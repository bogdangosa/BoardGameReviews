<template>
  <div>
    <h2>{{ thisBoardgame.title }}</h2>
    <h2>{{ thisBoardgame.description }}</h2>
  </div>
</template>

<script lang="ts" setup>
interface Boardgame {
  id: number;
  title: string;
  description: string;
  image: string;
}

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
</script>

<style></style>
