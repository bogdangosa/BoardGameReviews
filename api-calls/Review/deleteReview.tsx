import getApiUrl from "../getApiUrl";

export default async function deleteReview(
  reviewId: number,
  accessToken: string
) {
  const url = getApiUrl(`/Reviews/delete?reviewId=${reviewId}`);

  try {
    const response = await $fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting Review:", error);
  }
}
