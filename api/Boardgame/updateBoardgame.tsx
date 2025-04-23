import getApiUrl from "../getApiUrl";

export default async function updateBoardgame(updatedBoardgame: IBoardgame) {
  const url = getApiUrl("/Boardgame/update");

  try {
    const response = await $fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: updatedBoardgame,
    });
    return response;
  } catch (error) {
    console.error("Error updating boardgame:", error);
  }
}
