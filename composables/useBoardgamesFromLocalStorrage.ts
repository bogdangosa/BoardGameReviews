export const useUseBoardgamesFromLocalStorrage = () => {
  const boardgames = ref<IBoardgame[]>([]);

  const getBoardgamesFromLocalStorage = () => {
    if (typeof window === "undefined") return; // Check if in a browser environment
    const boardgameList = localStorage.getItem("boardgameList");
    if (boardgameList) {
      boardgames.value = JSON.parse(boardgameList);
    } else {
      boardgames.value = []; // empty array if no data in local storage
    }
  };
  getBoardgamesFromLocalStorage();

  return {
    boardgames,
    getBoardgamesFromLocalStorage,
  };
};
