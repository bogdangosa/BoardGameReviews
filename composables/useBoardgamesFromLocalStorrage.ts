export const useUseBoardgamesFromLocalStorrage = () => {
  const boardgames = ref<IBoardgame[]>([]);

  const getBoardgamesFromLocalStorage = () => {
    const boardgameList = localStorage.getItem("boardgameList");
    if (boardgameList) {
      boardgames.value = JSON.parse(boardgameList);
    } else {
      boardgames.value = []; // empty array if no data in local storage
    }
  };
  getBoardgamesFromLocalStorage();

  return { boardgames, getBoardgamesFromLocalStorage };
};
