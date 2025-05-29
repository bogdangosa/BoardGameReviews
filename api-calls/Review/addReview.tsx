import getApiUrl from "../getApiUrl";

export default async function addReview(
  newReview: IReview,
  accessToken: string
) {
  const url = getApiUrl("/Reviews/add");

  const response = await $fetch(url, {
    method: "POST",
    body: {
      reviewId: newReview.reviewId,
      boardgameId: newReview.boardgameId,
      userId: newReview.userId,
      message: newReview.message,
      rating: newReview.rating,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
