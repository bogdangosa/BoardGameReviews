import { mount } from "@vue/test-utils";
import StatsPage from "~/pages/stats/index.vue";
import { describe, test, expect, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";

// Mocked boardgame data
const mockBoardgamesData = [
  {
    id: 1,
    title: "Azul Duel",
    description: "A strategy board game.",
    image: "/azul_duel.jpg",
    category: "Strategy",
    rating: 8,
    myRating: 4,
  },
  {
    id: 2,
    title: "Catan",
    description: "A classic board game.",
    image: "/catan.jpg",
    category: "Strategy",
    rating: 6,
    myRating: 5,
  },
];

describe("Stats Page", () => {
  test("renders the Page", async () => {
    // Mount the component with the mocked router and boardgames data
    const wrapper = await mountSuspended(StatsPage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });

    expect(wrapper.text()).toContain("Boardgame Stats");
  });

  test("test get Average Rating By Category", async () => {
    const wrapper = await mountSuspended(StatsPage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });
    console.log(wrapper.vm.getAverageRatingByCategory());
    expect(wrapper.vm.getAverageRatingByCategory()).toEqual([0, 7, 0, 0, 0]);
  });

  test("test get number of games in Category", async () => {
    const wrapper = await mountSuspended(StatsPage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });
    console.log(wrapper.vm.getNrOfGamesInCategory());
    expect(wrapper.vm.getNrOfGamesInCategory()).toEqual([0, 2, 0, 0, 0]);
  });
});
