<template>
  <div class="stars-rating flex gap-1">
    <img
      class="star"
      :src="`/star-filled.svg`"
      v-for="star in filledStars"
      @click="updateRating(star)"
    />
    <img
      class="star"
      :src="`/star-empty.svg`"
      v-for="star in emptyStars"
      @click="updateRating(star)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ rating: number }>();
const filledStars = Array.from({ length: props.rating }, (_, i) => i + 1);
const emptyStars = Array.from({ length: 10 - props.rating }, (_, i) => i + 1);

const emit = defineEmits(["updateRating"]);

function updateRating(rating: number) {
  console.log("stars-rating", rating);

  emit("updateRating", rating);
}
</script>

<style scoped>
.star {
  cursor: pointer;
}
</style>
