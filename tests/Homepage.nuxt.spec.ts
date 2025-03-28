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
  {
    id: 3,
    title: "Teraforming Mars",
    description: "A game about colonizing Mars.",
    image: "/teraforming_mars.jpg",
    rating: 9,
    category: "Strategy",
  },
  {
    id: 4,
    title: "Catan",
    description: "A classic board game.",
    image: "/catan.jpg",
    rating: 8.0,
    category: "Strategy",
  },
  {
    id: 5,
    title: "Ticket to Ride",
    description: "A railway-themed board game.",
    image: "/ticket_to_ride.jpg",
    rating: 8.2,
    category: "Strategy",
  },
  {
    id: 6,
    title: "Pandemic",
    description: "A cooperative board game about disease control.",
    image: "/pandemic.jpg",
    rating: 8.7,
    category: "Cooperative",
  },
  {
    id: 7,
    title: "Codenames",
    description: "A word-based party game.",
    image: "/codenames.jpg",
    rating: 8.4,
    category: "Party",
  },
  {
    id: 8,
    title: "7 Wonders",
    description: "A card drafting game set in the ancient world.",
    image: "/7_wonders.jpg",
    rating: 8.6,
    category: "Strategy",
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
    expect(wrapper.html()).toContain("Calico");
  });

  test("can change page forwards and backwards", async () => {
    const wrapper = await mountSuspended(HomePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => {},
        },
      },
    });

    await nextTick();
    // Find the button and trigger click
    wrapper.find('[data-test="next-button"]').trigger("click");
    await nextTick();
    //console.log(wrapper.html());

    expect(wrapper.html()).toContain("Ticket to Ride");

    await nextTick();
    wrapper.find('[data-test="prev-button"]').trigger("click");
    await nextTick();

    expect(wrapper.html()).toContain("Azul Duel");
  });

  test("can filter boardgames", async () => {
    const wrapper = await mountSuspended(HomePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => {},
        },
      },
    });
    await nextTick();

    wrapper.vm.updateSelectedCategory("Abstract");
    await nextTick();

    expect(wrapper.html()).toContain("Azul Duel");
    expect(wrapper.html()).toContain("Calico");
    expect(wrapper.html()).not.toContain("Teraforming Mars");
  });

  test("can order boardgames", async () => {
    const wrapper = await mountSuspended(HomePage, {
      provide: {
        boardgamesData: {
          boardgamesData: ref(mockBoardgamesData),
          updateBoardgamesData: () => {},
        },
      },
    });
    await nextTick();

    wrapper.vm.updateSelectedSorting("Rating");
    await nextTick();

    expect(wrapper.html()).toContain("Teraforming Mars");
    expect(wrapper.html()).toContain("Pandemic");

    wrapper.vm.updateSelectedSorting("Alphabetically");
    await nextTick();

    expect(wrapper.html()).toContain("7 Wonders");
    expect(wrapper.html()).toContain("Catan");
  });
});
