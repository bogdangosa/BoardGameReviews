import getApiUrl from "../getApiUrl";

export default async function login(
  username: string,
  password: string
): Promise<IUser> {
  const url = getApiUrl("/User/login");

  const response = (await $fetch(url, {
    method: "POST",
    body: {
      username: username,
      password: password,
    },
  })) as any;

  const user = {
    userId: response.user.userId,
    username: response.user.username,
    password: response.user.password,
    isAdmin: response.user.isAdmin,
    accessToken: response.token,
  } as IUser;

  return user;
}
