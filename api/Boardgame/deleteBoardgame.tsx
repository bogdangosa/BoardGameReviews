import getApiUrl from "../getApiUrl";

export default async function deleteBoardgame(boardgameId: number) {
  const url = getApiUrl(`/Boardgame/delete?boardgameId=${boardgameId}`);

  try {
    const response = await $fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting boardgame:", error);
  }
}
