<template>
  <main class="home-page">
    <div class="top-bar flex justify-center">
      <img src="/home-hero-image.jpg" class="top-bar-image" />
      <div class="container top-bar-content flex justify-between z-1 p-8">
        <h2 class="home-page-hero-title">All Boardgames</h2>
        <Button @click="isModalOpened = true">add your own</Button>
      </div>
    </div>
    <div class="content flex justify-center">
      <div class="boardgames-table container p-8">
        <div v-for="boardgame in boardgamesData">
          <NuxtLink :to="'/boardgame/' + boardgame.id">
            <CardBoardGame
              :title="boardgame.title"
              :description="boardgame.description"
            />
          </NuxtLink>
        </div>
      </div>
      <ModalAddBoardGame
        v-if="isModalOpened"
        @close="isModalOpened = false"
        @addBoardgame="addBoardgame"
        @click=""
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
interface Boardgame {
  id: number;
  title: string;
  description: string;
  image: string;
}

const { boardgamesData, updateBoardgamesData } = inject<{
  boardgamesData: Ref<Boardgame[]>;
  updateBoardgamesData: (newData: any) => void;
}>("boardgamesData")!;

const isModalOpened = ref(false);

function addBoardgame(newBoardgame: { name: string; description: string }) {
  console.log(newBoardgame);
  updateBoardgamesData([
    ...boardgamesData.value,
    {
      id: boardgamesData.value.length + 1,
      title: newBoardgame.name,
      description: newBoardgame.description,
      image: "",
    },
  ]);
}
</script>

<style>
.home-page-hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--background-color-1);
}

.boardgames-table {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}
.home-page-hero-title {
  color: var(--background-color-1);
}
.top-bar {
  position: relative;
  height: 10rem;
  width: 100%;
}
.top-bar-content {
  position: relative;
  align-items: flex-end;
}
.top-bar-image {
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
