declare module "#app" {
  interface NuxtApp {
    $boardgameAdded: () => void;
    $onBoardgameAdded: (callback: () => void) => void;
  }
}

export {};
