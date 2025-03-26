import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "~/app.vue";
import HomePage from "~/pages/index.vue";
import BoardgamePage from "~/pages/boardgame/[id].vue";
import { test, expect, describe, afterEach } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";

// Mocked boardgame data
const mockBoardgamesData = [
  {
    id: 1,
    title: "Azul Duel",
    description: "Decorate a palace ceiling after creating your own pattern.",
    image: "/azul_duel.jpg",
    rating: 8.5,
    category: "Abstract",
    myRating: 8,
  },
  {
    id: 2,
    title: "Calico",
    description: "Sew a quilt, collect buttons, attract cats!",
    image: "/calico.jpg",
    rating: 7.5,
    category: "Abstract",
  },
];

describe("main page test", async () => {
  test("can mount homepage", async () => {
    const wrapper = await mountSuspended(App);
    expect(wrapper.html()).toContain("All Boardgames");
  });

  test("add button click triggers event", async () => {
    const wrapper = await mountSuspended(App);

    // Ensure modal is not initially rendered
    expect(wrapper.findComponent({ name: "AddBoardGame" }).exists()).toBe(
      false
    );

    // Find the button and trigger click
    const addButton = wrapper.find('[data-test="add-boardgame-button"]');
    await addButton.trigger("click");

    await nextTick();

    expect(wrapper.findComponent({ name: "AddBoardGame" }).exists()).toBe(true);
  });

  test("can see boardgames", async () => {
    const wrapper = await mountSuspended(HomePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => {},
        },
      },
    });
    await nextTick();

    expect(wrapper.html()).toContain("Azul Duel");
  });

  test("can add boardgame", async () => {
    const refBoardgamesData = ref(mockBoardgamesData);

    const wrapper = await mountSuspended(HomePage, {
      provide: {
        boardgamesData: {
          boardgamesData: refBoardgamesData,
          updateBoardgamesData: (newData: any) => {
            refBoardgamesData.value = newData;
          },
        },
      },
    });
    console.log("here:", wrapper.vm);
    wrapper.vm.addBoardgame({
      id: 3,
      title: "Teraforming Mars",
      description: "A game about colonizing Mars.",
      image: "/teraforming_mars.jpg",
      rating: 9,
      category: "Strategy",
    });

    await nextTick();

    expect(wrapper.html()).toContain("Teraforming Mars");
  });
});
