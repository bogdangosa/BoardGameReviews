<template>
  <div class="board-game-card">
    <div class="bg-image-container mb-2">
      <div class="image-overlay"></div>
      <img class="board-game-image" :src="image" alt="Board game cover" />
    </div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <div :class="'rating ' + ratingClass">
      <p>{{ rating }}</p>
    </div>
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
    rating: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const ratingClass = computed(() => {
      if (props.rating > 8) return "high";
      if (props.rating > 5) return "medium";
      return "low";
    });
    return { ratingClass };
  },
};
</script>

<style scoped>
.bg-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}
.board-game-card {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
}
.image-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.board-game-image {
  height: 180px;
  width: 100%;
  display: block;
  object-fit: cover;
}
.board-game-card .rating {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0.5rem 0;
  aspect-ratio: 1/1;
  position: absolute;
  left: 0;
  top: 0;
  height: 3.5rem;
  width: 3.5rem;
}
.board-game-card .rating p {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--background-color-1);
}
.board-game-card .rating.high {
  background-color: var(--rating-8-to-10);
}
.board-game-card .rating.medium {
  background-color: var(--rating-5-to-8);
}
.board-game-card .rating.low {
  background-color: var(--red);
}
</style>
