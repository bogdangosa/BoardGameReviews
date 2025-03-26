<template>
  <header class="header flex justify-center">
    <div
      class="header-container container flex justify-between align-middle p-6"
    >
      <NuxtLink to="/"><h1 class="logo bold">BG Reviews</h1></NuxtLink>
      <nav class="hidden md:block">
        <ul>
          <li class=""><NuxtLink class="nav-link" to="/">Browse</NuxtLink></li>
          <li><NuxtLink class="nav-link" to="/stats">Stats</NuxtLink></li>
          <li><NuxtLink class="nav-link" to="/account">Account</NuxtLink></li>
          <Button
            data-test="add-boardgame-button"
            @click="openAddBoardgameModal"
            >Add your own</Button
          >
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    openAddBoardgameModal() {
      this.$emit("openAddBoardgameModal");
    },
  },
};
</script>

<style scoped>
.logo {
  position: relative;
  font-size: 1.5rem;
  color: var(--background-color-1);
}
.header {
  background-color: var(--accent-color-1);
}
.header nav ul {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
}
.header .nav-link {
  text-decoration: none;
  outline: none;
  color: var(--background-color-1);
}
</style>
