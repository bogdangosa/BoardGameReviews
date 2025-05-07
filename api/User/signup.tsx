import getApiUrl from "../getApiUrl";

export default async function signup(username: string, password: string) {
  const url = getApiUrl("/User/signup");

  const response = await $fetch(url, {
    method: "POST",
    body: {
      username: username,
      password: password,
    },
  });

  return response;
}
