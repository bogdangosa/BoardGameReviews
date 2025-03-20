<template>
  <div class="board-game-card">
    <img class="board-game-image mb-2" :src="image" alt="Board game cover" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "BoardGameCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/calico.jpg",
    },
  },
};
</script>

<style scoped>
.board-game-image {
  height: 180px;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
