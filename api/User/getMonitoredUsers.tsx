import getApiUrl from "../getApiUrl";

export default async function getMonitoredUsers(
  accessToken: string
): Promise<IMonitoredUser[]> {
  const url = getApiUrl("/Admin/get-monitored-users");

  try {
    const response = await $fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const usersList = (response as any).map((user: any) => ({
      userId: user.userId,
      monitoredId: user.monitoredId,
      monitoredSince: user.monitoredSince,
      user: {
        id: user.user.userId,
        username: user.user.username,
      },
    }));

    return usersList;
  } catch (error) {
    console.log("Error fetching logs:", error);
    return [];
  }
}
