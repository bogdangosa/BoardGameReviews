import getApiUrl from "../getApiUrl";

export default async function getBoardgame(boardgameId: number) {
  const url = getApiUrl("/Boardgame/get-one?boardgameId=" + boardgameId);

  const boardgame = (await $fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })) as any;

  const {
    public: { serverAdress },
  } = useRuntimeConfig();
  boardgame.image = serverAdress + "/resources/" + boardgame.image;

  return boardgame;
}
