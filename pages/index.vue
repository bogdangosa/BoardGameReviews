<template>
  <main class="home-page">
    <div class="top-bar flex justify-center">
      <img src="/home-hero-image.jpg" class="top-bar-image" />
      <div
        class="container top-bar-content flex flex-col items-start md:items-end md:flex-row md:justify-between z-1 p-8 gap-4"
      >
        <h2 class="home-page-hero-title">All Boardgames</h2>
        <div class="flex gap-2">
          <Button
            data-test="prev-button"
            colorBackground="background1"
            color="text1"
            @click="prevPage"
            >Prev</Button
          >
          <Button
            data-test="next-button"
            colorBackground="background1"
            color="text1"
            @click="nextPage"
            >Next</Button
          >
          <Dropdown
            title="Sort by"
            :options="sortings"
            v-on:update:selectedOption="updateSelectedSorting"
          />
          <Dropdown
            title="Category"
            :options="categories"
            v-on:update:selectedOption="updateSelectedCategory"
          />
        </div>
      </div>
    </div>
    <div class="content flex justify-center">
      <div class="boardgames-table container p-8">
        <div v-for="boardgame in displayedBoardgames">
          <NuxtLink
            :to="'/boardgame/' + boardgame.id"
            :data-test="'boardgame-link-' + boardgame.id"
          >
            <CardBoardGame
              :image="boardgame.image"
              :title="boardgame.title"
              :rating="boardgame.rating"
              :description="boardgame.description"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
const categories = [
  "All",
  "Abstract",
  "Strategy",
  "Party",
  "Family",
  "Cooperative",
];

const pagination = reactive({
  currentPage: 1,
  itemsPerPage: 4,
});

const sortings = ["Default", "Alphabetically", "Rating"];

const selectedCategory = ref("All");
const selectedSorting = ref("Default");

function updateSelectedCategory(newCategory: string) {
  console.log(newCategory);
  selectedCategory.value = newCategory;
}

function updateSelectedSorting(newSorting: string) {
  console.log(newSorting);
  selectedSorting.value = newSorting;
}

function nextPage() {
  if (
    pagination.currentPage * pagination.itemsPerPage >=
    boardgamesData.value.length
  ) {
    return;
  }
  pagination.currentPage++;
}

function prevPage() {
  if (pagination.currentPage === 1) {
    return;
  }
  pagination.currentPage--;
}

const { boardgamesData, updateBoardgamesData } = inject<{
  boardgamesData: Ref<IBoardgame[]>;
  updateBoardgamesData: (newData: any) => void;
}>("boardgamesData")!;

console.log("here in testing", boardgamesData);

const filterByCategory = (boardgame: IBoardgame, category: string) =>
  category === "All" || boardgame.category === selectedCategory.value;

const displayedBoardgames = computed(() => {
  return boardgamesData.value
    .filter((boardgame) => filterByCategory(boardgame, selectedCategory.value))
    .sort((a, b) => {
      if (selectedSorting.value === "Default") {
        return 0;
      }
      if (selectedSorting.value === "Alphabetically") {
        return a.title.localeCompare(b.title);
      }
      if (selectedSorting.value === "Rating") {
        return b.rating - a.rating;
      }
      return 0;
    })
    .slice(
      (pagination.currentPage - 1) * pagination.itemsPerPage,
      pagination.currentPage * pagination.itemsPerPage
    );
});
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
