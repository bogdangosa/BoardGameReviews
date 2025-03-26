<template>
  <div>
    <div class="top-bar flex justify-center">
      <img src="/root_cover.jpg" class="top-bar-image" />
      <div class="image-overlay"></div>
      <div
        class="container top-bar-content flex flex-col items-start md:items-end md:flex-row md:justify-between z-1 p-8 gap-4"
      >
        <h2 class="home-page-hero-title">Boardgame Stats</h2>
        <Dropdown
          title="Select chart"
          :options="charts"
          v-on:update:selectedOption="updateSelectedChart"
        />
      </div>
    </div>
    <main class="charts-container flex justify-center items-center w-full">
      <div class="container">
        <div class="chart-bar-container">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { boardgamesData, updateBoardgamesData } = inject<{
  boardgamesData: Ref<IBoardgame[]>;
  updateBoardgamesData: (newData: any) => void;
}>("boardgamesData")!;

const categories = ["Abstract", "Strategy", "Party", "Family", "Cooperative"];

const charts = ["Nr of games in category", "Average rating by category"];
const selectedChart = ref("Nr of games in category");
function updateSelectedChart(selectedChartInDropdown: string) {
  console.log(selectedChartInDropdown);
  selectedChart.value = selectedChartInDropdown;
}

const nrOfGamesInCategory = categories.map(
  (category) =>
    boardgamesData.value.filter((game) => game.category === category).length
);

const averageRatingByCategory = categories.map((category) => {
  const gamesInCategory = boardgamesData.value.filter(
    (game) => game.category === category
  );
  const totalRating = gamesInCategory.reduce(
    (acc, game) => acc + game.rating,
    0
  );
  return totalRating / gamesInCategory.length;
});

console.log(nrOfGamesInCategory);

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

// Register
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartDataSet = computed(() => {
  if (selectedChart.value == "Nr of games in category")
    return nrOfGamesInCategory;
  else return averageRatingByCategory;
});

const chartData = computed(() => ({
  labels: categories,
  datasets: [
    {
      label: selectedChart.value,
      backgroundColor: "#67069c",
      data: chartDataSet.value,
    },
  ],
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style>
.image-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.charts-container {
  padding-top: 2rem;
}
.chart-bar-container {
  width: 50%;
  height: 20rem;
}
</style>
