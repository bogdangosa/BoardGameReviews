<template>
  <div class="game-page">
    <div class="hero-game flex justify-center">
      <img class="cover-image" :src="`/azul_duel_cover.jpg`" />
      <div class="container p-4 sm:p-8 gap-4 flex flex-col items-start">
        <div class="flex flex-col md:flex-row gap-8 h-full">
          <img
            class="game-image"
            :src="thisBoardgameValue?.image"
            alt="Boardgame cover"
          />
          <div class="text-container">
            <div class="score-container flex justify-center items-center">
              <span class="score">{{ thisBoardgameValue?.rating }} </span>
            </div>
            <div class="flex gap-4">
              <h2 class="c-background1 bold">
                {{
                  thisBoardgameValue?.boardgameId +
                  ". " +
                  thisBoardgameValue?.title
                }}
              </h2>
              <img
                class="button"
                data-test="delete-button"
                @click="isDeleteModalOpened = true"
                :src="`/delete.svg`"
                alt=""
              />
              <img
                class="button"
                data-test="edit-button"
                @click="isEditModalOpened = true"
                :src="`/edit.svg`"
                alt=""
              />
            </div>
            <p class="c-background1">{{ thisBoardgameValue?.description }}</p>
          </div>
        </div>
        <div class="rating-container flex gap-2 justify-center items-center">
          <p class="c-background1">my rating:</p>
          <StarsRating
            :rating="userRating ? userRating : 0"
            @updateRating="updateRating"
          />
        </div>
      </div>
    </div>
    <main class="flex justify-center">
      <div class="container p-4 sm:p-8">
        <h2 class="c-text1">Description:</h2>
        <p class="c-text3">
          Decorate the magnificent ceilings of the palace. Will the vaults look
          more beautiful by day or by night? Azul Duel invites you to play with
          light and pit opposites against each other.
        </p>
        <p class="c-text3">
          This competitive strategic game for two players retains the purity and
          elegance of the original Azul while adding an extra tactical dimension
          in which you determine the pattern in which tiles will be placed, in
          addition to drafting tiles to complete that pattern.
        </p>
      </div>
    </main>
    <main class="flex justify-center">
      <div class="container p-4 sm:p-8">
        <h2 class="c-text1">Reviews:</h2>
        <div class="review-cards">
          <div v-for="review in displayedReviews" class="review-card-container">
            <CardReview
              username="User"
              :message="review.message"
              :rating="review.rating"
            />
          </div>
        </div>
      </div>
    </main>
    <ModalDeleteBoardGame
      v-if="isDeleteModalOpened"
      @close="isDeleteModalOpened = false"
      @deleteBoardgame="deleteThisBoardgame"
    />
    <ModalEditBoardGame
      :boardgame="thisBoardgameValue"
      v-if="isEditModalOpened"
      @close="isEditModalOpened = false"
      @editBoardgame="editBoardgame"
    />
  </div>
</template>

<script lang="ts" setup>
import { deleteBoardgame, getBoardgame } from "~/api/Boardgame";
import updateBoardgame from "~/api/Boardgame/updateBoardgame";
import {
  getReviewOfUser,
  addReview,
  getAllReviewsOfBoardgame,
} from "~/api/Review";

interface Boardgame {
  boardgameId: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  myRating: number;
}

const isDeleteModalOpened = ref(false);
const isEditModalOpened = ref(false);
const route = useRoute();
const userId = 1;
const userRating = ref(0);
const userRatingId = ref(0);
const displayedReviews = ref([] as IReview[]);
const boardgameId = Number(route.params.id);

const thisBoardgameValue = ref<Boardgame>({
  boardgameId: boardgameId,
  title: "test",
  description: "test",
  image: "test",
  category: "",
  rating: 0,
  myRating: 0,
});
const { isServerDown } = await useUseServerStatus();
const { addCommandToLocalStorage } = useBoardgameCommandsLocalStorrage();

const getBoardgameData = async () => {
  try {
    const responseBoardgame = await getBoardgame(boardgameId);
    console.log("Server is up");
    if (responseBoardgame) {
      thisBoardgameValue.value = {
        boardgameId: responseBoardgame.boardgameId,
        title: responseBoardgame.title,
        description: responseBoardgame.description,
        image: responseBoardgame.image,
        category: responseBoardgame.category,
        rating: responseBoardgame.rating,
        myRating: 0,
      };
    } else {
      console.log("No boardgame found");
    }
  } catch (error) {
    console.error("Error fetching boardgame data:", error);
    console.log("Server is down");
    const { boardgames } = useUseBoardgamesFromLocalStorrage();
    const boardgame = boardgames.value.find(
      (boardgame) => boardgame.boardgameId === boardgameId
    );
    if (boardgame) {
      thisBoardgameValue.value = {
        boardgameId: boardgame.boardgameId,
        title: boardgame.title,
        description: boardgame.description,
        image: boardgame.image,
        category: boardgame.category,
        rating: boardgame.rating,
        myRating: 0,
      };
    } else {
      console.log("No boardgame found");
    }
  }
};

watch(
  () => [isServerDown],
  async () => {
    getUserRating();
    getBoardgameData();
    getReviewsData();
  }
);
getUserRating();
getBoardgameData();
getReviewsData();

async function getReviewsData() {
  try {
    const reviewsData = await getAllReviewsOfBoardgame(boardgameId);
    if (reviewsData) {
      displayedReviews.value = reviewsData;
    } else {
      console.log("No reviews found");
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

async function getUserRating() {
  try {
    const review = await getReviewOfUser(boardgameId, userId);
    if (review) {
      userRating.value = review.rating;
      userRatingId.value = review.reviewId;
      thisBoardgameValue.value.myRating = review.rating;
    } else {
      console.log("No review found");
    }
  } catch (error) {
    console.error("Error fetching user rating:", error);
  }
}

async function deleteThisBoardgame() {
  if (isServerDown.value) {
    addCommandToLocalStorage({
      command: "delete",
      boardgameId: thisBoardgameValue.value.boardgameId,
    });
  } else {
    await deleteBoardgame(thisBoardgameValue.value.boardgameId);
  }
  navigateTo("/");
}

async function editBoardgame(newBoardgame: any) {
  try {
    await updateBoardgame({
      boardgameId: boardgameId,
      title: newBoardgame.title,
      description: newBoardgame.description,
      category: newBoardgame.category,
      image: newBoardgame.image,
      nrOfPlayers: 0,
      playTime: 0,
      weight: 0,
      rating: thisBoardgameValue.value.rating,
    });

    console.log("Boardgame udapted");
    getBoardgameData();
  } catch (error) {
    console.error("Error updating boardgame:", error);
  }
}

function updateRating(rating: number) {
  console.log("Rating updated:", rating);
  userRating.value = rating;
  addReview({
    reviewId: userRatingId.value,
    boardgameId: thisBoardgameValue.value.boardgameId,
    userId: userId,
    rating: rating,
    message: "",
  });
}

defineExpose({
  deleteBoardgame,
  editBoardgame,
  updateRating,
});
</script>

<style>
.hero-game {
  position: relative;
}
.review-card-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  z-index: -1;
}
.score-container {
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
  background-color: #037b0d;
}
.score {
  color: var(--background-color-1);
  font-size: 1.5rem;
  font-weight: 600;
}

.text-container {
  max-width: 350px;
}
.game-image {
  border-radius: 0.5rem;
  height: 12rem;
  width: 12rem;
}
.button {
  cursor: pointer;
}
.review-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
}
</style>
