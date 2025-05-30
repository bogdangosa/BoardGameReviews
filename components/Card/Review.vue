<template>
  <div class="review-card">
    <div class="text-info">
      <div class="user-data">
        <div class="bg-image-container mb-2">
          <img class="review-user-image" :src="userImage" alt="User avatar" />
        </div>
        <h3>{{ username }}</h3>
      </div>

      <p v-if="message != ''" class="review-message">{{ message }}</p>
    </div>
    <div class="flex gap-2 justify-center items-center">
      <div v-if="isReviewer" class="flex gap-2 justify-center items-center">
        <img
          class="button"
          data-test="edit-button"
          @click="editReview"
          :src="`/edit-black.svg`"
          alt=""
        />
        <img
          class="button"
          data-test="delete-button"
          @click="deleteReview"
          :src="`/delete-red.svg`"
          alt=""
        />
      </div>
      <div class="rating" :class="ratingClass">
        <p>{{ rating }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { tr } from "@nuxt/ui/runtime/locale/index.js";
import { computed } from "vue";

export default {
  name: "ReviewCard",
  props: {
    reviewId: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "No text provided",
    },
    userImage: {
      type: String,
      default: "/default-user.jpg",
    },
    rating: {
      type: Number,
      default: 0,
    },
    isReviewer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const ratingClass = computed(() => {
      if (props.rating > 8) return "high";
      if (props.rating > 5) return "medium";
      return "low";
    });
    const reviewId = props.reviewId;
    return { ratingClass, reviewId };
  },
  methods: {
    deleteReview() {
      this.$emit("deleteReview", this.reviewId);
    },
    editReview() {
      this.$emit("editReview", this.reviewId);
    },
  },
};
</script>

<style scoped>
.review-card {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid var(--background-color-2);
}
.text-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.user-data {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.bg-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
}
.image-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.review-user-image {
  height: 2rem;
  width: 2rem;
  display: block;
  object-fit: cover;
}
.review-card .rating {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  font-weight: bold;
  border-radius: 0.25rem;
}
.review-card .rating.high {
  background-color: var(--rating-8-to-10);
  color: white;
}
.review-card .rating.medium {
  background-color: var(--rating-5-to-8);
  color: white;
}
.review-card .rating.low {
  background-color: var(--red);
  color: white;
}
</style>
