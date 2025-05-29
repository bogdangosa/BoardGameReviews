import getApiUrl from "../getApiUrl";

export default async function deleteBoardgame(
  boardgameId: number,
  accessToken: string
) {
  const url = getApiUrl(`/Boardgame/delete?boardgameId=${boardgameId}`);

  try {
    const response = await $fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return "unauthorized";
    }
    console.error("Error deleting boardgame:", error);
    throw error;
  }
}
