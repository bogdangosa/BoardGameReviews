import getApiUrl from "../getApiUrl";

export default async function getReviewOfUser(
  boardgameId: number,
  userId: number
) {
  const url = getApiUrl(
    `/Reviews/get-by-user-and-boardgame?boardgameId=${boardgameId}&userId=${userId}`
  );

  const review = (await $fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })) as any;

  const {
    public: { serverAdress },
  } = useRuntimeConfig();

  return review;
}
