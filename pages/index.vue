<template>
  <main class="home-page">
    <div class="top-bar flex justify-center">
      <img src="/home-hero-image.jpg" class="top-bar-image" />
      <div
        class="container top-bar-content flex flex-col items-start md:items-end md:flex-row md:justify-between z-1 p-8 gap-4"
      >
        <h2 class="home-page-hero-title">All Boardgames</h2>
        <div class="flex gap-2">
          <!--<Button
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
          >-->
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
      <div class="boardgames-table container p-8" ref="boardgamesTable">
        <div v-for="boardgame in displayedBoardgames">
          <NuxtLink
            :to="'/boardgame/' + boardgame.boardgameId"
            :data-test="'boardgame-link-' + boardgame.boardgameId"
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
import { getFilteredBoardgames } from "~/api-calls/Boardgame";

const categories = [
  "All",
  "Abstract",
  "Strategy",
  "Party",
  "Family",
  "Cooperative",
];
const { isServerDown } = await useUseServerStatus();

const pagination = reactive({
  currentPage: 1,
  itemsPerPage: 8,
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
  pagination.currentPage++;
}

function prevPage() {
  if (pagination.currentPage === 1) {
    return;
  }
  pagination.currentPage--;
}

const filterByCategory = (boardgame: IBoardgame, category: string) =>
  category === "All" || boardgame.category === selectedCategory.value;

const displayedBoardgames = ref([] as IBoardgame[]);

const getBoardGamesAsync = async (
  page: number,
  itemsPerPage: number,
  category: string,
  sorting: string,
  isServerDown: boolean
) => {
  console.log(isServerDown);

  if (isServerDown) {
    console.log("Server is down, using local storage");
    const { boardgames } = useUseBoardgamesFromLocalStorrage();
    console.log(boardgames.value);
    const filteredBoardgames = boardgames.value.filter(
      (boardgame: IBoardgame) => filterByCategory(boardgame, category)
    );
    const sortedBoardgames = filteredBoardgames.sort((a, b) => {
      if (sorting === "Alphabetically") {
        return a.title.localeCompare(b.title);
      } else if (sorting === "Rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
    const paginatedBoardgames = sortedBoardgames.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    return paginatedBoardgames;
  }
  return await getFilteredBoardgames(page, itemsPerPage, sorting, category);
};

const { $onBoardgameAdded } = useNuxtApp();

$onBoardgameAdded(async () => {
  pagination.currentPage = 1;
  console.log("boardgameAdded2");
  displayedBoardgames.value = await getBoardGamesAsync(
    pagination.currentPage,
    pagination.itemsPerPage,
    selectedCategory.value,
    selectedSorting.value,
    isServerDown.value
  );
});

watch(
  () => [
    /* pagination.currentPage,
    pagination.itemsPerPage,*/
    selectedCategory.value,
    selectedSorting.value,
    isServerDown.value,
  ],
  async () => {
    pagination.currentPage = 1;

    displayedBoardgames.value = await getBoardGamesAsync(
      pagination.currentPage,
      pagination.itemsPerPage,
      selectedCategory.value,
      selectedSorting.value,
      isServerDown.value
    );
  },
  { immediate: true }
);

const loadMoreBoardgames = async () => {
  nextPage();
  const newBoardgames = await getBoardGamesAsync(
    pagination.currentPage,
    pagination.itemsPerPage,
    selectedCategory.value,
    selectedSorting.value,
    isServerDown.value
  );
  displayedBoardgames.value.push(...newBoardgames);
  console.log("Loaded more boardgames:", newBoardgames);
  console.log("All boardgames:", displayedBoardgames.value);
};

const boardgamesTable = ref<HTMLElement | null>(null);

const handleScroll = (e: Event) => {
  const element = boardgamesTable.value;
  if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMoreBoardgames();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

defineExpose({ updateSelectedCategory, updateSelectedSorting });
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
