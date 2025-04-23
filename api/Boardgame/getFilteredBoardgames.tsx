import getApiUrl from "../getApiUrl";

export default async function getFilteredBoardgames(
  page: number,
  itemsPerPage: number,
  sortOrder: string,
  category: string
): Promise<IBoardgame[]> {
  const url = getApiUrl(
    `/Boardgame/get-filtered?page=${page}&itemsPerPage=${itemsPerPage}&sortOrder=${sortOrder}&category=${category}`
  );

  try {
    const response = await $fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const {
      public: { serverAdress },
    } = useRuntimeConfig();

    const boardgamesList = (response as any).map((boardgame: any) => ({
      boardgameId: boardgame.boardgameId,
      title: boardgame.title,
      description: boardgame.description,
      image: serverAdress + "/resources/" + boardgame.image,
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
