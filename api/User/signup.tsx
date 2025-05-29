import type { an } from "vitest/dist/chunks/reporters.d.CqBhtcTq.js";
import getApiUrl from "../getApiUrl";

export default async function signup(
  username: string,
  email: string,
  password: string
) {
  const url = getApiUrl("/User/sign-up");

  const response = (await $fetch(url, {
    method: "POST",
    body: {
      username: username,
      email: email,
      password: password,
    },
  })) as any;

  if (response.wasSignupSuccessfull === false) {
    return response;
  }

  const user = {
    userId: response.user.userId,
    username: response.user.username,
    password: response.user.password,
    isAdmin: response.user.isAdmin,
    accessToken: response.token,
  } as IUser;

  return {
    user: user,
    wasSignupSuccessfull: response.wasSignupSuccessfull,
  };
}
