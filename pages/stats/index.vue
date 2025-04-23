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
const categoriesIndex = {
  Abstract: 0,
  Strategy: 1,
  Party: 2,
  Family: 3,
  Cooperative: 4,
};

const charts = [
  "Nr of games in category",
  "Average rating by category",
  "My rating by category",
];
const selectedChart = ref("Nr of games in category");
function updateSelectedChart(selectedChartInDropdown: string) {
  console.log(selectedChartInDropdown);
  selectedChart.value = selectedChartInDropdown;
}

const getMyRatingByCategory = () =>
  categories.map((category) => {
    const gamesInCategory = boardgamesData.value.filter(
      (game) => game.category === category
    );
    const ratedgames = gamesInCategory.filter(
      (game) => game.myRating !== undefined
    );
    if (ratedgames.length === 0) {
      return 0;
    }
    const totalRating = ratedgames.reduce((acc, game) => {
      return acc + (game.myRating ? game.myRating : 0);
    }, 0);
    return totalRating / ratedgames.length;
  });

const getAverageRatingByCategory = () =>
  categories.map((category) => {
    const gamesInCategory = boardgamesData.value.filter(
      (game) => game.category === category
    );
    const totalRating = gamesInCategory.reduce(
      (acc, game) => acc + game.rating,
      0
    );
    return totalRating / gamesInCategory.length
      ? totalRating / gamesInCategory.length
      : 0;
  });

const nrOfGamesInCategory = ref([0, 0, 0, 0, 0]);

const myRatingByCategory = computed(getMyRatingByCategory);

const averageRatingByCategory = computed(getAverageRatingByCategory);

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

const { $signalr } = useNuxtApp();

if (!$signalr) {
  console.error("SignalR is not available");
} else {
  console.log("SignalR:", $signalr);

  $signalr.on("ReceiveCategoryData", (data) => {
    //data is of type {category:string,count:number}

    //nrOfGamesInCategory.value = data.map((item: any) => item.count);

    nrOfGamesInCategory.value = categories.map((category) => {
      const categoryData = data.find((item: any) => item.category === category);
      return categoryData ? categoryData.count : 0;
    });

    console.log("Category Data:", data);
  });
}
const chartDataSet = computed(() => {
  if (selectedChart.value == "Nr of games in category")
    return nrOfGamesInCategory.value;
  else if (selectedChart.value == "My rating by category")
    return myRatingByCategory.value;
  else return averageRatingByCategory.value;
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

defineExpose({
  getAverageRatingByCategory,
  getMyRatingByCategory,
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
