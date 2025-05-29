import getApiUrl from "../getApiUrl";

export default async function deleteAllLogs(accessToken: string) {
  const url = getApiUrl("/Admin/delete-all-logs");

  try {
    const response = await $fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error deleting:", error);
    throw error;
  }
}
