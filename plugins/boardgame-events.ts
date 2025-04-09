export default defineNuxtPlugin((nuxtApp) => {
  if ("$boardgameAdded" in nuxtApp) return; // 🛑 Prevent redefinition on HMR

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
