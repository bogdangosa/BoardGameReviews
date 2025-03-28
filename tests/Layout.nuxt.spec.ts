import { describe, expect, test } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Layout from "~/layouts/default.vue";
import BoardGame from "~/components/Card/BoardGame.vue";

describe("Layout", () => {
  test("can add boardgame", async () => {
    const wrapper = await mountSuspended(Layout);
    console.log("here:", wrapper.vm);

    const addedBoardgame = {
      id: 3,
      title: "Teraforming Mars",
      description: "A game about colonizing Mars.",
      image: "/teraforming_mars.jpg",
      rating: 9,
      category: "Strategy",
    };
    wrapper.vm.addBoardgame(addedBoardgame);

    await nextTick();

    expect(
      wrapper.vm.getBoardGames().map((BoardGame) => BoardGame.id)
    ).toContainEqual(3);
  });
});
