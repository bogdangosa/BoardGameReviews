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
    userId: response.userId,
    username: response.username,
    password: response.password,
    isAdmin: response.isAdmin,
  } as IUser;

  return user;
}
