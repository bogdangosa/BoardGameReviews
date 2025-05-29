import type { an } from "vitest/dist/chunks/reporters.d.CqBhtcTq.js";
import getApiUrl from "../getApiUrl";

export default async function verifyEmail(userId: number) {
  const url = getApiUrl("/User/sign-up");

  const response = (await $fetch(url, {
    method: "POST",
    body: {
      userId: userId,
    },
  })) as any;
  return response;
}
