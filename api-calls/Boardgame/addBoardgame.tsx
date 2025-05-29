import getApiUrl from "../getApiUrl";

export default async function addBoardgame(
  newBoardgame: IBoardgame,
  accessToken: string
) {
  const url = getApiUrl("/Boardgame/add");

  const formData = new FormData();

  formData.append("title", newBoardgame.title);
  formData.append("description", newBoardgame.description);
  formData.append("category", newBoardgame.category);
  formData.append("releaseDate", new Date().toISOString());
  formData.append("imageFile", newBoardgame.image);
  formData.append("nrOfPlayers", "0");
  formData.append("playTime", "0");
  formData.append("weight", "0");
  formData.append("rating", "0");

  const response = await $fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
