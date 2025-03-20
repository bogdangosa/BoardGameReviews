<template>
  <main class="home-page">
    <div class="top-bar flex justify-center">
      <img src="/home-hero-image.jpg" class="top-bar-image" />
      <div
        class="container top-bar-content flex flex-col items-start md:items-end md:flex-row md:justify-between z-1 p-8 gap-4"
      >
        <h2 class="home-page-hero-title">All Boardgames</h2>
        <div class="flex gap-2">
          <Dropdown
            :options="categories"
            v-on:update:selectedOption="updateSelectedCategory"
          />
          <Button @click="isModalOpened = true">add your own</Button>
        </div>
      </div>
    </div>
    <div class="content flex justify-center">
      <div class="boardgames-table container p-8">
        <div v-for="boardgame in displayedBoardgames">
          <NuxtLink :to="'/boardgame/' + boardgame.id">
            <CardBoardGame
              :image="boardgame.image"
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
  category: string;
}
const categories = [
  "All",
  "Abstract",
  "Strategy",
  "Party",
  "Family",
  "Cooperative",
];

const selectedCategory = ref("All");

function updateSelectedCategory(newCategory: string) {
  console.log(newCategory);
  selectedCategory.value = newCategory;
}

const { boardgamesData, updateBoardgamesData } = inject<{
  boardgamesData: Ref<Boardgame[]>;
  updateBoardgamesData: (newData: any) => void;
}>("boardgamesData")!;

const displayedBoardgames = computed(() => {
  if (selectedCategory.value === "All") {
    return boardgamesData.value;
  }
  return boardgamesData.value.filter(
    (boardgame) => boardgame.category === selectedCategory.value
  );
});

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
      category: "Abstract",
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
  gap: 2rem;
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
}
.top-bar-image {
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

@media screen and (max-width: 768px) {
  .boardgames-table {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 480px) {
  .boardgames-table {
    grid-template-columns: 1fr;
  }
}
</style>
