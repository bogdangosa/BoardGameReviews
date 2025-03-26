import { mount } from "@vue/test-utils";
import BoardgamePage from "~/pages/boardgame/[id].vue";
import HomePage from "~/pages/index.vue";
import { describe, test, expect } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { vi } from "vitest";

// Mocked boardgame data
const mockBoardgamesData = [
  {
    id: 1,
    title: "Azul Duel",
    description: "A strategy board game.",
    image: "/azul_duel.jpg",
    category: "Strategy",
    rating: 4.5,
    myRating: 4,
  },
  {
    id: 2,
    title: "Catan",
    description: "A classic board game.",
    image: "/catan.jpg",
    category: "Strategy",
    rating: 4.8,
    myRating: 5,
  },
];

describe("Boardgame Page", () => {
  test("renders the correct boardgame details", async () => {
    const boardgameId = 1; // ID to test

    // Create a mock router with the `id` in the params
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: "/",
          component: HomePage,
        },
        {
          path: "/boardgame/:id",
          component: BoardgamePage,
        },
      ],
    });
    await router.push(`/boardgame/${boardgameId}`);

    await router.isReady();

    // Mount the component with the mocked router and boardgames data
    const wrapper = await mountSuspended(BoardgamePage, {
      global: {
        plugins: [router], // Use the router mock
      },
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });

    // Wait for the page to render
    await router.isReady();

    // Check if the correct boardgame title and description are rendered
    expect(wrapper.text()).toContain("Azul Duel");

    // Check if the image source matches the one for this boardgame
    /*expect(wrapper.find("img.game-image").attributes("src")).toBe(
      "/azul_duel.jpg"
    );*/
  });
});
