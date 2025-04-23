import getApiUrl from "../getApiUrl";

export default async function getAllBoardgames(): Promise<IBoardgame[]> {
  const url = getApiUrl("/Boardgame/get-all");

  try {
    const response = await $fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const boardgamesList = (response as any).map((boardgame: any) => ({
      boardgameId: boardgame.boardgameId,
      title: boardgame.title,
      description: boardgame.description,
      image: boardgame.image,
      rating: boardgame.rating,
      category: boardgame.category,
      myRating: null,
    }));

    return boardgamesList;
  } catch (error) {
    console.log("Error fetching boardgames:", error);
    return [];
  }
}
