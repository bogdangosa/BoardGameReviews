import { mount } from "@vue/test-utils";
import BoardgamePage from "~/pages/boardgame/[id].vue";
import HomePage from "~/pages/index.vue";
import { describe, test, expect } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
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

mockNuxtImport("useRoute", () => () => ({
  params: {
    id: "1",
  },
}));

describe("Boardgame Page", () => {
  test("renders the correct boardgame details", async () => {
    // Mount the component with the mocked router and boardgames data
    const wrapper = await mountSuspended(BoardgamePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });

    expect(wrapper.text()).toContain("Azul Duel");
    expect(wrapper.text()).toContain("A strategy board game.");
  });

  test("opens correctly the delete modal", async () => {
    const wrapper = await mountSuspended(BoardgamePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });

    const deleteButton = wrapper.find('[data-test="delete-button"]');
    await deleteButton.trigger("click");

    await nextTick();

    expect(wrapper.findComponent({ name: "DeleteBoardGame" }).exists()).toBe(
      true
    );
  });

  test("opens correctly the edit modal", async () => {
    const wrapper = await mountSuspended(BoardgamePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });

    const editButton = wrapper.find('[data-test="edit-button"]');
    await editButton.trigger("click");

    await nextTick();

    expect(wrapper.findComponent({ name: "EditBoardGame" }).exists()).toBe(
      true
    );
  });

  test("can delete boardgame", async () => {
    const wrapper = await mountSuspended(BoardgamePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => vi.fn(),
        },
      },
    });
    const deleteButton = wrapper.find('[data-test="delete-button"]');
    await deleteButton.trigger("click");

    await nextTick();
    const confirmButton = wrapper.find('[data-test="confirm-delete-button"]');
    await confirmButton.trigger("click");
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/");
  });
});
