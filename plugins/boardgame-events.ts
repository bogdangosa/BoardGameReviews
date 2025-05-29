export default defineNuxtPlugin((nuxtApp) => {
  if ("$boardgameAdded" in nuxtApp) return;

  const listeners: (() => void)[] = [];

  const boardgameAdded = () => {
    listeners.forEach((fn) => fn());
  };

  const onBoardgameAdded = (callback: () => void) => {
    listeners.push(callback);
  };

  nuxtApp.provide("boardgameAdded", boardgameAdded);
  nuxtApp.provide("onBoardgameAdded", onBoardgameAdded);
});
