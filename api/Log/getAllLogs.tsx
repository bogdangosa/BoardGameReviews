import getApiUrl from "../getApiUrl";

export default async function getAllLogs(accessToken: string): Promise<ILog[]> {
  const url = getApiUrl("/Admin/get-logs");

  try {
    const response = await $fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const logsList = (response as any).map((log: any) => ({
      logId: log.logId,
      date: log.date,
      action: log.actionPerformed,
      userId: log.userId,
    }));

    return logsList;
  } catch (error) {
    console.log("Error fetching logs:", error);
    return [];
  }
}
