export const useBoardgameCommandsLocalStorrage = () => {
  const addCommandToLocalStorage = (command: any) => {
    const commandsList = localStorage.getItem("commandsList");
    const commands = commandsList ? JSON.parse(commandsList) : [];
    commands.push(command);
    localStorage.setItem("commandsList", JSON.stringify(commands));
  };

  const executeCommands = () => {
    const commandsList = localStorage.getItem("commandsList");
    if (commandsList) {
      const commands = JSON.parse(commandsList);
      commands.forEach((command: string) => {
        // Execute the command
        console.log(`Executing command: ${command}`);
      });
      localStorage.setItem("commandsList", JSON.stringify([])); // Clear commands after execution
    }
  };

  return {
    addCommandToLocalStorage,
    executeCommands,
  };
};
