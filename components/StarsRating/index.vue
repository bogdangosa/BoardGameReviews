<template>
  <div class="stars-rating flex gap-1">
    <img :src="`/star-filled.svg`" v-for="star in filledStars" />
    <img :src="`/star-empty.svg`" v-for="star in emptyStars" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ rating: number }>();
const filledStars = Array.from({ length: props.rating }, (_, i) => i + 1);
const emptyStars = Array.from({ length: 10 - props.rating }, (_, i) => i + 1);
</script>

<style scoped></style>
