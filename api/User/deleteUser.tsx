import getApiUrl from "../getApiUrl";

export default async function signup(userId: number) {
  const url = getApiUrl("/User/delete");

  const response = await $fetch(url, {
    method: "DELETE",
    body: {
      userId: userId,
    },
  });

  return response;
}
