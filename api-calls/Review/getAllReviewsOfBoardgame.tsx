import getApiUrl from "../getApiUrl";

export default async function getAllReviewsOfBoardgames(
  boardgameId: number
): Promise<IReview[]> {
  const url = getApiUrl("/Reviews/get-by-boardgame?boardgameId=" + boardgameId);

  try {
    const response = await $fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reviewsList = (response as any).map((boardgame: any) => ({
      reviewId: boardgame.reviewId,
      boardgameId: boardgame.boardgameId,
      userId: boardgame.userId,
      rating: boardgame.rating,
      message: boardgame.message,
    }));

    return reviewsList;
  } catch (error) {
    console.log("Error fetching boardgames:", error);
    return [];
  }
}
