<template>
  <header class="header flex justify-center">
    <div
      class="header-container container flex justify-between align-middle p-8"
    >
      <h1 class="logo bold">Board Game Reviews</h1>
      <nav>
        <ul>
          <li class=""><a class="nav-link" href="/">Browse</a></li>
          <li><a class="nav-link" href="/account">Account</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.logo {
  position: relative;
  top: -4px;
  font-size: 1.5rem;
  color: var(--background-color-1);
}
.header {
  height: 6rem;
  background-color: var(--accent-color-1);
}
.header nav ul {
  display: flex;
  gap: 1rem;
  flex-direction: row;
}
.header .nav-link {
  text-decoration: none;
  outline: none;
  color: var(--background-color-1);
}
</style>
