export const useUseServerStatus = () => {
  const isServerDown = ref(true);
  const { executeCommands } = useBoardgameCommandsLocalStorrage();

  async function checkServer() {
    try {
      const config = useRuntimeConfig();
      const serverAdress = config.public.serverAdress;
      const result = await $fetch(serverAdress + "/Boardgame/is-available");
      //localStorage.setItem("boardgameList", JSON.stringify(result));
      if (isServerDown) executeCommands();
      isServerDown.value = false;
    } catch {
      isServerDown.value = true;
    }
  }
  setInterval(checkServer, 5000); // ping every 5s
  checkServer(); // initial check
  return {
    isServerDown,
    checkServer,
  };
};
